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
import CardDisplay from "./CardDisplay";

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
  const [selectedTableCards, setSelectedTableCards] = useState([]);
  const [selectPutOnField, setSelectPutOnField] = useState(false);

  const history = useHistory();

  const updateGame = (data) => {
    // take the game update data and set it in here
    console.log("game data received: ", data);
    setGame(new Game(data));
    if (data.gameSatus === "ONGOING") {
      setGameStarted(true);
    }
    if (
      data.gameStatus === "DISCONNECTED" ||
      data.gameStatus === "SURRENDERED"
    ) {
      setOpponentLeft(true);
      setOpponentLeftReason(data.endGameReason);
    }
  };

  const updateRound = (data) => {
    console.log("round update received:", data);
    setRound(new Round(data));
    setPlayerCards(data.myCardsInHand);
    setTableCards(data.cardsOnTable);
  };

  const makeMove = () => {
    console.log("Show message");
    console.log(selectedCard);
    console.log(selectedTableCards);
    console.log(selectPutOnField);
    if (round.myTurn) {
      // 3: JACK
      if (selectedCard.value === "JACK") {
        console.log("3")
        sockClient.sendMove(gameId, playerId, 3, selectedCard, round.cardsOnTable);
      }
      // 2: x-1 move
      else if (selectedTableCards.length > 1) {
        console.log("2")
        sockClient.sendMove(gameId, playerId, 2, selectedCard, selectedTableCards);
      }
      // 1: 1-1 move
      else if (selectedTableCards.length === 1) {
        console.log("1")
        sockClient.sendMove(gameId, playerId, 1, selectedCard, selectedTableCards);
      }
      // 4: to field
      else {
        console.log("4")
        sockClient.sendMove(gameId, playerId, 4, selectedCard, selectedTableCards);
      }
      setSelectedTableCards([]);
      setSelectPutOnField(false);
      setSelectedCard(null);
    }
    // use this function to build move and send via websocket
    // check type of move
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
  };

  const checkWebsocket = () => {
    // check that the websocket remains connected and add the updateGame function
    console.log("websocket status:", sockClient.isConnected());
    if (!sockClient.isConnected()) {
      console.log("websocket is not connected! Attempting reconnect");
      if (
        sockClient.addOnMessageFunction("game", updateGame) &&
        sockClient.addOnMessageFunction("round", updateRound)
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
      sockClient.addOnMessageFunction("round", updateRound)
    ) {
      // start the game
      console.log("starting the game");
      sockClient.startGame(gameId, playerId);
      setGameStarted(true);
    }
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
            fromField={false}
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
              fromField={false}
              onClick={() => selectCardFromHand(card)}
            />
          ))
        ) : (
          <h1> not loaded </h1>
        )}
        <h1> hand </h1>
      </div>

      <div className="playerInfo">
        <Button width="80%" onClick={() => makeMove()} disable={checkButton()}>
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
    <div className="turn-info-container">
      <div className="turn-info-form">
        <h1> {round && round.myTurn ? "Your turn" : "Opponents turn"} </h1>
      </div>
    </div>
  );

  let cardsOnTableContainer = (
    <div> 
      {tableCards ? (
        tableCards.map((card) => (
          <Card
            key={card.code}
            code={card.code}
            suit={card.suit}
            value={card.value}
            image={card.image}
            onClick={() => selectCardFromField(card)}
            fromField={true}
          />
        ))
      ) : (
        <div className="card-blank" > </div>
      )}
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
          <div className="table">
            <CardDisplay
            // if it works it works
              cards={cardsOnTableContainer}
              onClickSpace={() => toggleSelectPutOnField()}
              selectPutOnField={selectPutOnField}
            />
          </div>
        </div>
        <div className="right">
          <div className="statistics">Statistics</div>
          <div className="discard-pile">Discard Pile</div>
        </div>
      </div>
      {playerHandContainer}
    </div>
  );
};

export default GameScreen;