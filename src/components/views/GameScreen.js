import { useParams, useHistory } from "react-router-dom";
import "styles/views/GameScreen.scss";
import { useEffect, useState } from "react";
import Game from "models/Game";
import Round from "models/Round";
import { ButtonGame } from "components/ui/Button";
import EndOfRound from "components/views/EndOfRound";
import EndOfGame from "components/views/EndOfGame";
import OpponentLeft from "components/views/OpponentLeft";
import sockClient from "helpers/sockClient";
import Card from "components/views/Card.js";
import CardDisplay from "./CardDisplay";
import loadingGif from "image/loading.gif";
import WaitEndOfRound from "./WaitEndOfRound";
import { api } from "helpers/api";
import { checkMove } from "helpers/validMoveCheck";

const GameScreen = () => {
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
  const [opponentDiscard, setOpponentDiscard] = useState([]);
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

  const history = useHistory();

  const PlayGuard = async () => {
    try {
      const response = await api.get("games/" + gameId);
      if (
        response.data.host.userId === playerId ||
        response.data.guest.userId === playerId
      ) {
        return true;
      } else {
        alert("You tried to join a lobby you're not part of!");
        history.push("/game");
        return false;
      }
    } catch (error) {
      window.location.reload();
      console.log("There was an error: ", error.message);
    }
    return false;
  };

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
    setOpponentDiscard(data.oppCardsInDiscard);
    setPlayerDiscardCards(data.myCardsInDiscard);
    console.log();
    setEndOfRound(data.roundStatus === "FINISHED");

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
  const checkButton = () => {
    if (!round.myTurn) {
      return false;
    } else if (selectedCard) {
      return false;
    } else if (selectedTableCards.length > 0 && selectPutOnField) {
      return false;
    }
    return true;
  };
  const selectCardFromField = (card) => {
    if (round.myTurn) {
      // if card is already clicked
      // TODO: implement a way to determine if a card is clicked already
      if (false) {
        const filteredArray = selectedTableCards.filter(
          (item) => item.code !== card.code
        );
        setSelectedTableCards(filteredArray);
      } else {
        setSelectedTableCards((selectedTableCards) => [
          ...selectedTableCards,
          card,
        ]);
      }
    }
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
    console.log("UnselectedCard: ", selectedCard);
  };

  const handleError = (error) => {
    // TODO: do somethind with the error data coming back
    console.log(error);
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
    try {
      await PlayGuard();
    } catch (error) {
      console.log(error.message);
    }
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
      {/*
        <div className="selectedCard">
          {selectedCard ? (
            <div className="card-container-selected">
              <Card
                key={selectedCard.code}
                code={selectedCard.code}
                suit={selectedCard.suit}
                value={selectedCard.value}
                image={selectedCard.image}
                fromField={false}
                onClick={() => unselectCard(selectedCard)}
              />
            </div>
          ) : (
            <div className="card-blank"> </div>
          )}
        </div>
          */}
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
          <h1> Not loaded </h1>
        )}
      </div>

      {/*
        <div className="player-info">
          <ButtonGame
            width="80%"
            background="#FFFFFF"
            onClick={() => makeMove()}
            disable={checkButton()}>
            Play Move
          </ButtonGame>
        </div>
        */}
    </div>
  );
  const countOppPile = () => {
    let diff = sessionStorage.getItem("diff");
    const oldNumber = sessionStorage.getItem("oppCapturedCards");
    const newNumber = opponentDiscard.length;
    const thisRound = parseInt(oldNumber) - newNumber;
    if (round && thisRound < 0) {
      sessionStorage.setItem("diff", thisRound);
      diff = thisRound;
    }
    sessionStorage.setItem("oppCapturedCards", newNumber);
    return diff;
  };

  let opponentHand = (
    <div className="opponent-cards">
      {opponentCards ? (
        [...Array(opponentCards)].map((e, i) => (
          <div className="card-container-opponent">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/54/Card_back_06.svg"
              className="cardback"
              key={i}
            />
          </div>
        ))
      ) : (
        <h1> not loaded </h1>
      )}
    </div>
  );
  let opponentDiscardPile = (
    <div className="opponent-discards">
      {opponentDiscard && parseInt(countOppPile()) !== 0 ? (
        opponentDiscard
          .slice(countOppPile())
          .map((e, i) => <img src={e.image} className="cardback" key={i} />)
      ) : (
        <h1> No cards were captured </h1>
      )}
      <h2 className="container-title"> Opponent's last Capture </h2>
    </div>
  );

  let deck = (
    <div className="card-container">
      {/* Placeholder for deck */}
      <div className="card back"></div>
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
                <span className="guest-name">{game.guestUsername}</span>
                <span className="points">
                  <span className="guest-points">{game.guestPoints || 0}</span>
                  <span className="points-divider">:</span>
                  <span className="host-points">{game.hostPoints || 0}</span>
                </span>
                <span className="host-name">{game.hostUsername}</span>
              </div>
              <div className="surrender-button-container">
                <button className="surrender-button" onClick={surrenderGame}>
                  Surrender
                </button>
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
