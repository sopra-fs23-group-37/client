import { useParams, useHistory } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/GameScreen.scss";
import { useEffect, useState } from "react";
import Game from "models/Game";
import { Button } from "components/ui/Button";
import sockClient from "helpers/sockClient";
import { api, handleError } from "helpers/api";

const GameScreen = () => {
  const gameId = useParams().gameId;
  const [game, setGame] = useState(null);
  const history = useHistory();

  function printStuff() {
    console.log(game);
    // console.log(game.currentRound.cardsOnTable[0].code);
  }

  const updateGame = (data) => {
    // json data from server doesn't match class variables on server so be careful when parsing
    // classes for round, player and card exist according to json if smaller objects are needed
    console.log("game data received:", data);
    setGame(new Game(data));
  };

  const fetchGame = async () => {
    try {
      const response = await api.get("/games/" + gameId);
      console.log("REST Response:", response);
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
    console.log("Use Effect started");
    console.log("websocket status:", sockClient.isConnected);
    sockClient.addOnMessageFunction("Game", updateGame);
  };

  useEffect(() => {
    checkWebsocket();

    // fetch the game data if it is not there yet
    if (!game) {
      fetchGame();
    }

    // handle user leaving page
    const unlisten = history.listen(() => {
      console.log("User is leaving the page");
      sockClient.disconnect();
    });

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

  let tableCards = (
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
      <div className="table-cards">{tableCards}</div>
      <div className="deck">{deck}</div>
    </div>
  );

  return (
    <BaseContainer className="gamescreen container">
      <h2>Game {gameId} </h2>
      <h1> {gameId} </h1>
      {content}
      <Button width="100%" onClick={() => printStuff()}>
        Print to console
      </Button>
    </BaseContainer>
  );
};

export default GameScreen;
