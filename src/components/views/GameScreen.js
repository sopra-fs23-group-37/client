import { useParams, useHistory } from "react-router-dom";
import "styles/views/GameScreen.scss";
import { useEffect, useState } from "react";
import Game from "models/Game";
import Round from "models/Round";
import EndOfRound from "components/viewElements/endElements/EndOfRound";
import EndOfGame from "components/viewElements/endElements/EndOfGame";
import OpponentLeft from "components/viewElements/endElements/OpponentLeft";
import sockClient from "helpers/sockClient";
import Card from "components/viewElements/inGameElements/Card.js";
import CardDisplay from "../viewElements/inGameElements/CardDisplay";
import loadingGif from "image/loading.gif";
import WaitEndOfRound from "../viewElements/endElements/WaitEndOfRound";
import myImage from "image/Sheet.png";
import noAvatar from "image/noAvatar.png";
import { checkMove } from "helpers/validMoveCheck";

const GameScreen = () => {
  const [rulebookVisible, setRulebookVisible] = useState(false);
  const gameId = useParams().gameId;
  const playerId = parseInt(sessionStorage.getItem("userId"));
  // these datapoints are set through the websocket
  const [game, setGame] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [round, setRound] = useState(new Round());
  // end of round contains points for the round and total points
  const [endOfRound, setEndOfRound] = useState(false);
  // end of game contains total points and winner
  const [endOfGame, setEndOfGame] = useState(false);
  // contains all cards from the player and on the discard
  const [playerCards, setPlayerCards] = useState(null);
  const [playerDiscards, setPlayerDiscardCards] = useState(null);
  // contains number of cards of the opponent
  const [opponentCards, setOpponentCards] = useState(null);
  // contains the cards on the table as array
  const [tableCards, setTableCards] = useState(null);
  // true if the opponent has left
  const [opponentLeft, setOpponentLeft] = useState(false);
  // set reason for why the player has left (e.g. unexpected disconnect, surrender)
  const [opponentLeftReason, setOpponentLeftReason] = useState(null);
  // needed for the waiting overlay after the EndOfRound
  const [waitEndOfRound, setWaitEndOfRound] = useState(false);
  //these datapoints are set by the player when playing to form the move
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedTableCards, setSelectedTableCards] = useState([]);
  const [selectPutOnField, setSelectPutOnField] = useState(false);
  const [oppLastCapture, setOppLastCapture] = useState(null);

  const history = useHistory();

  const updateGame = (data) => {
    // take the game update data and set it in here
    console.log("game data received: ", data);
    setGame(new Game(data));
    if (data.gameSatus === "ONGOING") {
      setGameStarted(true);
    }
    if (data.gameStatus === "FINISHED") {
      console.log("the game has ended!");
      setEndOfGame(true);
    }
    if (
      data.gameStatus === "DISCONNECTED" ||
      data.gameStatus === "SURRENDERED"
    ) {
      setOpponentLeft(true);
      setOpponentLeftReason(data.endGameReason);
      setEndOfRound(false);
      setWaitEndOfRound(false);
    }
  };

  const updateRound = (data) => {
    console.log("round update received:", data);
    setRound(new Round(data));
    setPlayerCards(data.myCardsInHand);
    setTableCards(data.cardsOnTable);
    setOpponentCards(data.oppCards);
    setPlayerDiscardCards(data.myCardsInDiscard);
    console.log();
    setEndOfRound(data.roundStatus === "FINISHED");
    setOppLastCapture(data.oppLastCapture);

    if (data.roundStatus === "ONGOING") {
      setWaitEndOfRound(false);
    }
  };

  const makeMove = () => {
    console.log("Show message");
    console.log(selectedCard);
    console.log(selectedTableCards);
    console.log(tableCards);
    if (round.myTurn) {
      const move = checkMove(selectedCard, tableCards, selectedTableCards);
      let moveNumber = 0;
      switch (move) {
        case "1":
          moveNumber = 1;
          break;
        case "2":
          moveNumber = 2;
          break;
        case "3":
          moveNumber = 3;
          break;
        case "4":
          moveNumber = 4;
          break;
        default:
          alert("Invalid move: " + move);
          unselectCard(selectedCard);
          break;
      }
      if (moveNumber) {
        if (moveNumber === 3) {
          sockClient.sendMove(
            gameId,
            playerId,
            moveNumber,
            selectedCard,
            round.cardsOnTable
          );
        } else {
          sockClient.sendMove(
            gameId,
            playerId,
            moveNumber,
            selectedCard,
            selectedTableCards
          );
        }
      }
      setSelectedTableCards([]);
      setSelectPutOnField(false);
      setSelectedCard(null);
    }
  };

  const selectCardFromField = (card) => {
    if (round.myTurn) {
      // if card is already clicked
      if (selectedTableCards.includes(card)) {
        const filteredArray = selectedTableCards.filter(
          (item) => item !== card
        );
        setSelectedTableCards(filteredArray);
      } else {
        setSelectedTableCards((selectedTableCards) => [
          ...selectedTableCards,
          card,
        ]);
      }
    }
    console.log("selectedCard: ", selectedCard);
  };

  const selectCardFromHand = (card) => {
    if (round.myTurn) {
      const filteredArray = playerCards.filter(
        (item) => item.code !== card.code
      );
      if (selectedCard) {
        filteredArray.push(selectedCard);
      }
      setPlayerCards(filteredArray);
      setSelectedCard(card);
    }
  };
  const unselectCard = (card) => {
    setPlayerCards((playerCards) => [...playerCards, card]);
    setSelectedCard(null);
  };

  const handleError = (error) => {
    console.log(error);
    alert("There was an issue: " + error.message);
    if (error.type === "INVALIDGAME" || error.type === "INVALIDUSER") {
      history.push("/game");
    }
  };

  const checkWebsocket = () => {
    // check that the websocket remains connected and add the updateGame function
    console.log("websocket status:", sockClient.isConnected());
    if (!sockClient.isConnected()) {
      console.log("websocket is not connected! Attempting reconnect");
      if (
        sockClient.addOnMessageFunction("game", updateGame) &&
        sockClient.addOnMessageFunction("round", updateRound) &&
        sockClient.addOnMessageFunction("error", handleError)
      ) {
        sockClient.reconnect(gameId, playerId);
      }
    }
  };
  const toggleSelectPutOnField = () => {
    if (round.myTurn) {
      setSelectPutOnField((current) => !current);
    }
  };

  const startGame = async () => {
    // check that the websocket is still connected
    if (!sockClient.isConnected()) {
      console.log("can't start game until the websocket is connected!");
      return;
    }
    // add subscriptions
    console.log("adding subscriptions");
    if (
      sockClient.addOnMessageFunction("game", updateGame) &&
      sockClient.addOnMessageFunction("round", updateRound) &&
      sockClient.addOnMessageFunction("error", handleError)
    ) {
      // start the game
      console.log("starting the game");
      sockClient.startGame(gameId, playerId);
      setGameStarted(true);
    }
  };

  const surrenderGame = () => {
    sockClient.surrender(gameId, playerId);
    setWaitEndOfRound(false);
    setEndOfRound(false);
  };

  const handleEndRound = () => {
    console.log("user is confirming that the round ended");
    sockClient.confirmEndOfRound(gameId, playerId);
    setEndOfRound(false);
    setWaitEndOfRound(true);
  };

  const handleEndGame = () => {
    history.push("/game");
  };

  const handleLeaveGame = () => {
    history.push("/game");
  };

  useEffect(() => {
    console.log("Use Effect started");
    checkWebsocket();

    // if the game has not started yet, start the game
    if (!gameStarted) {
      startGame();
    }

    console.log("current game data: ", game);
    console.log("current round data:", round);
    console.log("selected card from hand: ", selectedCard);
    console.log("selected table cards: ", selectedTableCards);
    if (selectedCard) {
      makeMove();
    }
    // handle user leaving page
    const unlisten = history.listen(() => {
      console.log("User is leaving the page");
      sockClient.disconnect();
      sockClient.removeMessageFunctions();
      sockClient.removeMessageFunctions();
    });

    return () => {
      console.log("Component is unmounting");
      unlisten();
    };
  });

  let playerHandContainer = (
    <div className="playerHandContainer">
      <div className="playerHand">
        {playerCards ? (
          playerCards.map((card) => (
            <div className="card-container-hand">
              <Card
                key={card.code}
                code={card.code}
                suit={card.suit}
                value={card.value}
                image={card.image}
                fromField={false}
                onClick={() => selectCardFromHand(card)}
              />
            </div>
          ))
        ) : (
          <h1> - </h1>
        )}
      </div>
    </div>
  );

  let opponentHand = (
    <div className="opponent-cards">
      {opponentCards ? (
        [...Array(opponentCards)].map((e, i) => (
          <div className="card-container-opponent">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/54/Card_back_06.svg"
              className="cardback"
              key={i}
              alt="Back of Card"
            />
          </div>
        ))
      ) : (
        <h1> - </h1>
      )}
    </div>
  );
  let opponentDiscardPile = (
    <div className="opponent-discards">
      {oppLastCapture !== null ? (
        oppLastCapture.map((e, i) => (
          <img src={e.image} className="cardback" key={i} alt="e.code" />
        ))
      ) : (
        <h1> - </h1>
      )}
      <h2 className="container-title"> Opponent's last Capture </h2>
    </div>
  );

  let turnInfo = (
    <div className="turn-info-container">
      <div className="turn-info-form">
        <h1>{round && round.myTurn ? "Your turn" : "Opponent's turn"}</h1>
        {!round.myTurn && (
          <img src={loadingGif} alt="Loading..." className="loading-gif" />
        )}
      </div>
    </div>
  );
  let cardsOnTableContainer = (
    <div className="cards-on-table">
      <div className="card-container-field">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/54/Card_back_06.svg"
          className="cardback"
          alt="Back of Card"
        />
      </div>
      {tableCards ? (
        tableCards.map((card) => (
          <div className="card-container-field">
            <Card
              key={card.code}
              code={card.code}
              suit={card.suit}
              value={card.value}
              image={card.image}
              onClick={() => selectCardFromField(card)}
              fromField={true}
            />
          </div>
        ))
      ) : (
        <div className="card-blank"> </div>
      )}
    </div>
  );
  let cardsDiscard = (
    <div className="discard-pile">
      <div className="stack">
        {playerDiscards ? (
          playerDiscards.map((card) => (
            <div className="card-container-discard">
              <Card
                key={card.code}
                code={card.code}
                suit={card.suit}
                value={card.value}
                image={card.image}
                onClick={() => {}}
                fromField={true}
              />
            </div>
          ))
        ) : (
          <div className="card-blank"> </div>
        )}
      </div>
      <div className="stackHeight">
        {playerDiscards ? (
          <h1> Captured cards: {playerDiscards.length} </h1>
        ) : (
          <h1> Captured cards: 0 </h1>
        )}
      </div>
    </div>
  );
  return (
    <div className="gamescreen container">
      <div className="top">
        <div className="left">
          <div className="opponent">
            {opponentDiscardPile}
            {opponentHand}
            {turnInfo}
          </div>
          <div className="table">
            <div className="inner-table">
              <CardDisplay
                // if it works it works
                cards={cardsOnTableContainer}
                onClickSpace={() => toggleSelectPutOnField()}
                selectPutOnField={selectPutOnField}
              />
            </div>
          </div>
        </div>
        <div className="right">
          {game && (
            <div className="statistics">
              <div className="player-names">
                <div class="image">
                  <div class="image-upload">
                    {game && game.guestAvatarUrl && (
                      <img alt="Avatar" src={game.guestAvatarUrl}></img>
                    )}
                    {game && !game.guestAvatarUrl && (
                      <img alt="Avatar" src={noAvatar}></img>
                    )}
                  </div>
                </div>
                <span className="guest-name">{game.guestUsername}</span>
                <span className="points">
                  <span className="guest-points">{game.guestPoints || 0}</span>
                  <span className="points-divider">:</span>
                  <span className="host-points">{game.hostPoints || 0}</span>
                </span>
                <span className="host-name">{game.hostUsername}</span>
                <div class="image">
                  <div class="image-upload">
                    {game && game.hostAvatarUrl && (
                      <img alt="Avatar" src={game.hostAvatarUrl}></img>
                    )}
                    {!game.hostAvatarUrl && (
                      <img alt="Avatar" src={noAvatar}></img>
                    )}
                  </div>
                </div>
              </div>
              <div className="surrender-button-container">
                <button className="surrender-button" onClick={surrenderGame}>
                  Surrender
                </button>
              </div>
              <div className="rulebook-container-gs">
                <button
                  className="round-button"
                  onClick={() => setRulebookVisible(!rulebookVisible)}
                >
                  ?
                </button>
                {rulebookVisible && (
                  <div
                    className="rulebook-overlay"
                    onClick={() => setRulebookVisible(false)}
                  >
                    <img className="rulebook-image" src={myImage} alt="" />
                  </div>
                )}
              </div>
            </div>
          )}
          {cardsDiscard}
        </div>
      </div>
      {playerHandContainer}
      {game && round && endOfRound && (
        <div className="endOfRound">
          <EndOfRound
            game={game}
            round={round}
            playerId={playerId}
            onEndRound={handleEndRound}
          />
        </div>
      )}
      {game && endOfGame && (
        <div className="endOfRound">
          <EndOfGame
            game={game}
            playerId={playerId}
            onEndGame={handleEndGame}
          />
        </div>
      )}
      {game && opponentLeft && (
        <div className="opponentLeft">
          <OpponentLeft
            game={game}
            playerId={playerId}
            onLeaveGame={handleLeaveGame}
            opponentLeftReason={opponentLeftReason}
          />
        </div>
      )}
      {game && waitEndOfRound && (
        <div className="waitEndOfRound">
          <WaitEndOfRound
            game={game}
            playerId={playerId}
            onLeaveGame={surrenderGame}
          />
        </div>
      )}
    </div>
  );
};

export default GameScreen;
