import { useParams, useHistory } from "react-router-dom";
import "styles/views/GameScreen.scss";
import { useEffect, useState } from "react";
import Game from "models/Game";
import Round from "models/Round";
import EndOfRound from "components/viewElements/endElements/EndOfRound";
import EndOfGame from "components/viewElements/endElements/EndOfGame";
import OpponentLeft from "components/viewElements/endElements/OpponentLeft";
import sockClient from "helpers/sockClient";
import PlayerHand from "components/viewElements/inGameElements/PlayerHand";
import OpponentHand from "components/viewElements/inGameElements/OpponentHand";
import OpponentLastCapture from "components/viewElements/inGameElements/OpponentLastCapture";
import TurnInfo from "components/viewElements/inGameElements/TurnInfo";
import WaitEndOfRound from "../viewElements/endElements/WaitEndOfRound";
import CheatSheet from "components/viewElements/inGameElements/CheatSheet";
import { checkMove } from "helpers/validMoveCheck";
import ScoreInfo from "components/viewElements/inGameElements/ScoreInfo";
import CardTable from "components/viewElements/inGameElements/CardTable";

const GameScreen = () => {
  const gameId = useParams().gameId;
  const playerId = parseInt(sessionStorage.getItem("userId"));
  const [gameStarted, setGameStarted] = useState(false);

  // these datapoints are set through the websocket
  const [game, setGame] = useState(null);
  const [round, setRound] = useState(new Round());

  // contains all cards from the player and on the capture
  const [playerCards, setPlayerCards] = useState(null);

  // contains the cards on the table as array
  const [tableCards, setTableCards] = useState([]);
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

  // datapoints used throughout the game
  const [endOfRound, setEndOfRound] = useState(false);
  const [endOfGame, setEndOfGame] = useState(false);

  let containerHeight = "100vh";
  let containerWidth = "100vw";

  let playerCardsHeight = "0px";
  
  //adjusts the width of the gamescreen container, if the oppLastCapture cards size changes
  if (round.oppLastCapture !== null && round.oppLastCapture !== undefined && round.oppLastCapture.length > 16) {
    containerWidth = "170vw";
  } else if (round.oppLastCapture !== null && round.oppLastCapture !== undefined && round.oppLastCapture.length > 8) {
    containerWidth = "111vw";
  }
  //adjusts the width of the gamescreen container, if the myLastCapture cards size changes
  if (round.myLastCapture !== null && round.myLastCapture !== undefined && round.myLastCapture.length > 16) {
    containerWidth = "140vw";
  }
  
  //adjusts the height of the gamescreen container and player cards height, if the tableCards size changes
  if (tableCards.length > 27) {
    containerHeight = "173vh";
    playerCardsHeight = "-550px";
  } else if (tableCards.length > 20) {
    containerHeight = "155vh";
    playerCardsHeight = "-414px";
  } else if (tableCards.length > 13) {
    containerHeight = "132vh";
    playerCardsHeight = "-240px";
  } else if (tableCards.length > 6) {
    containerHeight = "108vh";
    playerCardsHeight = "-60px";
  }

  const history = useHistory();

  const updateGame = (data) => {
    // take the game update data and set it in here
    console.log("game data received: ", data);
    setGame(new Game(data));
    if (data.gameStatus === "ONGOING") {
      setGameStarted(true);
    }
    if (data.gameStatus === "FINISHED") {
      console.log("the game has ended!");
      // setEndOfGame(true);
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
        setSelectedTableCards([]);
        setSelectPutOnField(false);
        setSelectedCard(null);
      }
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

  const startGame = () => {
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
    if (game.gameStatus === "FINISHED") {
      setEndOfGame(true);
    } else {
      sockClient.confirmEndOfRound(gameId, playerId);
      setEndOfRound(false);
      setWaitEndOfRound(true);
    }
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

  return (
    <div className="gamescreen container" style={{ height: containerHeight, width: containerWidth }}>
      <div className="top">
        <div className="opponent">
          {<OpponentLastCapture cards={round?.oppLastCapture} />}
          {<OpponentHand cards={round?.oppCards} />}
        </div>
        {game && (
          <ScoreInfo
            hostPoints={game.hostPoints}
            hostUsername={game.hostUsername}
            guestPoints={game.guestPoints}
            guestUsername={game.guestUsername}
          />
        )}
      </div>
      <div className="bottom">
        {round ? (
          <CardTable
            toggleSelectPutOnField={toggleSelectPutOnField}
            selectPutOnField={selectPutOnField}
            selectCardFromField={selectCardFromField}
            cards={tableCards}
            myTurn={round?.myTurn}
            deck={round?.deckCards}
          />
        ) : (
          <div></div>
        )}
        <div className="bottom-right">
          <div className="menu-container">
            {<TurnInfo myTurn={round?.myTurn} />}
            <div className="button-container">
              <button className="surrender-button" onClick={surrenderGame}>
                Surrender
              </button>
              <CheatSheet />
            </div>
          </div>
        </div>
      </div>
      {
      <PlayerHand
            cards={round?.myCardsInHand}
            discardCards={round?.myCardsInDiscard}
            lastCapCards={round?.myLastCapture}
            handleClick={selectCardFromHand}
            playerCardsHeight={playerCardsHeight}
      />
      }
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
