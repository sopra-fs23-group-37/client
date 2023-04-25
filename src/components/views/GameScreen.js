import { useParams, useHistory } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/GameScreen.scss";
import { useEffect, useState } from "react";
import Game from "models/Game";
import { Button } from "components/ui/Button";
import EndOfRound from "components/views/EndOfRound";
import EndOfGame from "components/views/EndOfGame";
import sockClient from "helpers/sockClient";
import { api, handleError } from "helpers/api";
import Card from "components/views/Card.js";
import Round from "models/Round";

const GameScreen = () => {
  const gameId = useParams().gameId;
  const playerId = parseInt(sessionStorage.getItem("userId"));

  // these datapoints are set through the websocket
  const [game, setGame] = useState(null);
  const [currentRound, setCurrentRound] = useState(null);
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

  // these datapoints are set by the player when playing to form the move
  const [selectedCard, setSelectedCard] = useState(null);

  const history = useHistory();

  const updateGame = (data) => {
    // json data from server doesn't match class variables on server so be careful when parsing
    // classes for round, player and card exist according to json if smaller objects are needed
    console.log("game data received:", data);
    setGame(new Game(data));

  };

  const printStuff = () => {
    fetchGame();
  };

  const fetchGame = async () => {
    try {
      const response = await api.get("/games/" + gameId);
      console.log("REST Response Current Round:", response.data.currentRound);
      const responseJSON = response.data.currentRound;
      setGame(new Game(response.data));

    } catch (error) {
      console.error(
        `Something went wrong while fetching the game: \n${handleError(error)}`
      );
      console.error("Details:", error);
      alert(
        "Something went wrong while fetching the game! See the console for details."
      );
    }
  };

  const checkWebsocket = () => {
    // check that the websocket remains connected and add the updateGame function
    console.log("websocket status:", sockClient.isConnected());
    sockClient.addOnMessageFunction("Game", updateGame);
  };

  //use this function to change values!
  const setTestingValues = () => {
    setEndOfGame(true);
    //setPlayerCards(test);
    // continue here afterwards.
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

    // fetch the game data if it is not there yet
    if (!game) {
      fetchGame();
    }

    // handle user leaving page
    const unlisten = history.listen(() => {
      console.log("User is leaving the page");
      sockClient.disconnect();
      sockClient.removeMessageFunctions();
    });

    setTestingValues();

    if (game) {
      checkEndOfRound();
    }

    console.log(game);
    return () => {
      console.log("Component is unmounting");
      unlisten();
    };
  });

  let playerHand = (
    <div className="card-container">
      {/* Placeholder for player hand */}
      <div className="card"></div>
      <div className="card"></div>
      <div className="card"></div>
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

  let table = (
    <div className="card-container">
      {/* Placeholder for table cards */}
      <div className="card"></div>
      <div className="card"></div>
      <div className="card"></div>
    </div>
  );

  let content = (
    <div className="game-container">
      <div className="player-hand">{playerHand}</div>
      <div className="opponent-hand">{opponentHand}</div>
      <div className="table-cards">{table}</div>
      <div className="deck">{deck}</div>
    </div>
  );

  /*
  TODO: Timons code gibt Errors und lässt nicht rendern

  { <h2>Game {gameId}</h2>
      <h1>{game.gameId}</h1>
      {game.winner ? (
        <EndOfGame winner={game.winner} />
      ) : (
        <>
          {game.currentRound &&
            game.currentRound.roundStatus === "FINISHED" && <EndOfRound />}
          {content}
          <Button width="100%" onClick={() => printStuff()}>
            Print to console
          </Button>
        </>
      )}
          }*/




  return (
<div className="gamescreen container">
  <div className="top">
    <div className="left">
      <div className="opponent">
        <div className="opponent-card">Opponent's Cards</div>
        <div className="empty">Empty Div</div>
      </div>
      <div className="table">Playing Table</div>
    </div>
    <div className="right">
      <div className="statistics">
        <div className="player-names">
          <span className="guest-name">Peter</span>
          <span className="points">
            <span className="guest-points">2</span>
            <span className="points-divider">:</span>
            <span className="host-points">1</span>
          </span>
          <span className="host-name">Steven</span>
        </div>
        <div className="surrender-button-container">
          <button className="surrender-button" onClick={surrenderGame}>
            Surrender
          </button>
        </div>
  </div>

      <div className="discard-pile">Discard Pile</div>
    </div>
  </div>
      <div className="bottom">
        {
          //Beispiel wie Card-Komponent verwendet wird für eine Karte.
        }
        <Card
          code="JD"
          suit="DIAMONDS"
          value="JACK"
          image="https://deckofcardsapi.com/static/img/JD.png"
          onClick={console.log("I'm clickable")}
        />
      </div>
      {endOfRound && (
        <div className ="endOfRound">
          <EndOfRound 
          onNextRound={handleNextRound}
          />
        </div>

      )}
    </div>
  );
};

export default GameScreen;
