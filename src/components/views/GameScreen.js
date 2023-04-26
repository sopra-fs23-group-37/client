import { useParams, useHistory } from "react-router-dom";
// import BaseContainer from "components/ui/BaseContainer";
import "styles/views/GameScreen.scss";
import { useEffect, useState } from "react";
import Game from "models/Game";
import Round from "models/Round";
import { Button } from "components/ui/Button";
// import EndOfRound from "components/views/EndOfRound";
// import EndOfGame from "components/views/EndOfGame";
import sockClient from "helpers/sockClient";
// import { api, handleError } from "helpers/api";
import Card from "components/views/Card.js";
import EndOfRound from "./EndOfRound";

const GameScreen = () => {
  const gameId = useParams().gameId;
  const playerId = parseInt(sessionStorage.getItem("userId"));

  // these datapoints are set through the websocket
  const [game, setGame] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [round, setRound] = useState(null);
  // end of round contains points for the round and total points
  const [endOfRound, setEndOfRound] = useState(true);
  // end of game contains total points and winner
  const [endOfGame, setEndOfGame] = useState(false);
  // contains all cards from the player and on the discard
  const [playerCards, setPlayerCards] = useState(null);
  const [playerDiscards, setPlayerDiscardCards] = useState(null);
  // contains number of cards of the opponent
  const [opponentCards, setOpponentCards] = useState(null);
  const [opponentDiscard, setOpponentDiscard] = useState(null);
  // contains the cards on the table as array
  const [tableCards, setTableCards] = useState(null);
  // whether or not there are still cards in the deck
  const [deckCards, setDeckCards] = useState(true);
  // contains id of the player who's turn it is
  const [playerTurn, setPlayerTurn] = useState(null);
  // true if the opponent has left
  const [opponentLeft, setOpponentLeft] = useState(false);
  // set reason for why the player has left (e.g. unexpected disconnect, surrender)
  const [opponentLeftReason, setOpponentLeftReason] = useState(null);

  //these datapoints are set by the player when playing to form the move
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedTableCards, setSelectedTableCards] = useState(null);
  const [selectPutOnField, setSelectPutOnField] = useState(false);

  const history = useHistory();

  const updateGame = (data) => {
    // take the game update data and set it in here
    console.log("game data received: ", data);
    setGame(new Game(data));
  };

  const updateRound = (data) => {
    console.log("round update received:", data);
    setRound(new Round(data));
  };

  const printStuff = () => {
    console.log(round);
    setPlayerCards(round.myCardsInHand);
  };

  const makeMove = () => {
    // use this function to build move and send via websocket
    // check type of move
  };

  const selectCardFromField = (card) => {
    // if card is already clicked
    if (card.clicked) {
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
  };

  const selectCardFromHand = (card) => {
    const filteredArray = playerCards.filter((item) => item.code !== card.code);
    if (selectedCard) {
      filteredArray.push(selectedCard);
    }
    setPlayerCards(filteredArray);
    setSelectedCard(card);
  };

  const unselectCard = (card) => {
    setPlayerCards((playerCards) => [...playerCards, card]);
    setSelectedCard(null);
  };

  const checkWebsocket = () => {
    // check that the websocket remains connected and add the updateGame function
    console.log("websocket status:", sockClient.isConnected());
  };

  const startGame = () => {
    // add subscriptions
    console.log("adding subscriptions");
    sockClient.addOnMessageFunction("game", updateGame);
    sockClient.addOnMessageFunction("round", updateRound);

    // start the game
    console.log("starting the game");
    sockClient.startGame(gameId, playerId);
    setGameStarted(true);
  };

  const checkEndOfRound = () => {
    if (game.roundStatus === "FINISHED") {
      setEndOfRound(true);
      setTimeout(() => setEndOfRound(false), 3000);
    }
  };

  const surrenderGame = () => {
    // Code to handle surrender
  };

  const handleNextRound = () => {
    setEndOfRound(false);
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

    // handle user leaving page
    const unlisten = history.listen(() => {
      console.log("User is leaving the page");
      sockClient.disconnect();
      sockClient.removeMessageFunctions();
    });

    if (game) {
      checkEndOfRound();
    }

    return () => {
      console.log("Component is unmounting");
      unlisten();
    };
  });

  let playerHandContainer = (
    <div className="playerHandContainer">
      <div className="selectedCard">
        {selectedCard ? (
          <Card
            key={selectedCard.code}
            code={selectedCard.code}
            suit={selectedCard.suit}
            value={selectedCard.value}
            image={selectedCard.image}
            onClick={() => unselectCard(selectedCard)}
          />
        ) : (
          <h1> No card selected </h1>
        )}
        <h1> selected </h1>
      </div>
      <div className="playerHand">
        {playerCards ? (
          playerCards.map((card) => (
            <Card
              key={card.code}
              code={card.code}
              suit={card.suit}
              value={card.value}
              image={card.image}
              onClick={() => selectCardFromHand(card)}
            />
          ))
        ) : (
          <h1> not loaded </h1>
        )}
        <h1> hand </h1>
      </div>

      <div className="playerInfo">
        <Button width="80%" onClick={() => printStuff()}>
          Play Move
        </Button>
      </div>
    </div>
  );

  let opponentHand = (
    <div className="card-container">
      {/* Placeholder for opponent hand */}
      <div className="card"></div>
      <div className="card"></div>
      <div className="card"></div>
    </div>
  );

  let deck = (
    <div className="card-container">
      {/* Placeholder for deck */}
      <div className="card back"></div>
    </div>
  );

  let turnInfo = (
    <div className="turnInfo">
      <h1> Current player </h1>
      <h1> {round.myTurn ? "my turn" : "op turn"} </h1>
    </div>
  );

  let table = (
    <div className="card-container">
      {/* Placeholder for table cards */}
      <div className="card"></div>
      <div className="card"></div>
      <div className="card"></div>
    </div>
  );

  return (
    <div className="gamescreen container">
      <div className="top">
        <div className="left">
          <div className="opponent">
            <div className="opponent-card">Opponent's Cards</div>
            {turnInfo}
          </div>
          <div className="table">Playing Table</div>
        </div>
        <div className="right">
          {game && (
            <div className="statistics">
              <div className="player-names">
                <span className="guest-name">{game.guest.username}</span>
                <span className="points">
                  <span className="guest-points">{game.guestPoints || 0}</span>
                  <span className="points-divider">:</span>
                  <span className="host-points">{game.hostPoints || 0}</span>
                </span>
                <span className="host-name">{game.host.username}</span>
              </div>
              <div className="surrender-button-container">
                <button className="surrender-button" onClick={surrenderGame}>
                  Surrender
                </button>
              </div>
            </div>
          )}
          <div className="discard-pile">Discard Pile</div>
        </div>
      </div>
      {playerHandContainer}

      {round && endOfRound && (
        <div className="endOfRound">
          <EndOfRound game={game} round={round} onNextRound={handleNextRound} />
        </div>
      )}
    </div>
  );
};

export default GameScreen;
