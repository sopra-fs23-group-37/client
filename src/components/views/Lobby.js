import { useParams, useHistory } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Lobby.scss";
import { useEffect, useState } from "react";
import Game from "models/Game";
import sockClient from "helpers/sockClient";
import loadingGif from "image/loading.gif";
import { Button } from "components/ui/Button";

const Lobby = () => {
  const gameId = useParams().gameId;
  const [game, setGame] = useState(new Game());
  const history = useHistory();
  const playerId = parseInt(sessionStorage.getItem("userId"));
  const [goingToGame, setGoingToGame] = useState(false);
  // true if the opponent has left
  const [opponentLeft, setOpponentLeft] = useState(false);
  // set reason for why the player has left (e.g. unexpected disconnect, surrender)
  const [opponentLeftReason, setOpponentLeftReason] = useState(null);
  // true if the game is finished
  const [isGameFinished, setIsGameFinished] = useState(false);

  const updateLobby = (data) => {
    setGame(new Game(data));
    if (
      data.gameStatus === "DISCONNECTED" ||
      data.gameStatus === "SURRENDERED"
    ) {
      setOpponentLeftReason(data.endGameReason);
      setOpponentLeft(true);
    }

    if (data.gameStatus === "FINISHED") {
      setIsGameFinished(true);
    }
  };

  // check if the game is finished already. If it is, display a message accordinlgy
  const gameOverAlert = () => {
    if (isGameFinished) {
      alert(
        "The game has finished, you cannot join it anymore. Please create a new game or join an existing one using the buttons on the home screen. "
      );
      history.push("/game");
    }
    if (opponentLeft) {
      alert(
        "This game can no longer be played. " +
          (opponentLeftReason != null ? opponentLeftReason : "")
      );
      history.push("/game");
    }
  };

  const homescreen = () => {
    history.push("/game/dashboard");
  };

  // check if the player is the host or the guest. If not, alert them that they are in the wrong lobby.
  const invalidPlayerAlert = () => {
    if (
      sockClient.isConnected() &&
      game.gameId != null &&
      !(
        playerId === parseInt(game.guestId) ||
        playerId === parseInt(game.hostId)
      )
    ) {
      alert(
        "You cannot join this game. Please create a new game or join an existing one using the buttons on the home screen."
      );
      history.push("/game");
      window.location.reload();
    }
  };

  const connectAndJoin = () => {
    console.log("websocket status:", sockClient.isConnected());
    if (!sockClient.isConnected()) {
      console.log("Starting connection.");
      if (sockClient.addOnMessageFunction("lobby", updateLobby)) {
        sockClient.connectAndJoin(gameId, playerId);
      }
    }
  };

  const checkGoToGame = () => {
    if (game.gameStatus === "CONNECTED" || game.gameStatus === "ONGOING") {
      setGoingToGame(true);
    }
  };

  const goToGame = async () => {
    await delay(1000);
    history.push(`/game/play/${gameId}`);
  };

  useEffect(() => {
    console.log("Use Effect started");
    // start by connecting to the websocket (if not already connected)
    connectAndJoin();

    // log to console for debugging support
    console.log("Current Lobby data: ", game);

    // check if the player should be there and the game is in the right status
    invalidPlayerAlert();
    gameOverAlert();

    // once the game has reached the right status, go to the game
    checkGoToGame();
    if (goingToGame) {
      goToGame();
    }

    // handle disconnects
    const unlisten = history.listen(() => {
      console.log("is the user going to the game? ", goingToGame);
      if (!goingToGame) {
        console.log("User left the lobby");
        sockClient.disconnect();
        sockClient.removeMessageFunctions();
        sockClient.disconnect();
      }
    });

    // handle disconnects
    return () => {
      console.log("Component is unmounting");
      unlisten();
    };
  });

  // delay, so that the user sees the page loading
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <BaseContainer>
      <div className="lobby container">
        <div className="lobby form">
          <div className="title-container">
            {game.guestStatus === "WAITING" ? (
              <h1 className="title"> {game.hostUsername}'s Lobby </h1>
            ) : (
              <h1 className="title">
                {" "}
                Starting the game{" "}
                <img
                  src={loadingGif}
                  alt="Loading..."
                  className="loading-gif"
                />{" "}
              </h1>
            )}
          </div>
          <div className="listings-container">
            <div className="subtitle-spectator-container">
              <h2 className="subtitle">Players</h2>
              <h2 className="game-code">
                {" "}
                {game.gameCode ? "Code: " + game.gameCode : ""}{" "}
              </h2>
            </div>
            <div className="row-container">
              <h4 className="name">{game.hostUsername}</h4>
              <h4 className="host">Host</h4>
            </div>
            <div className="row-container">
              <h4 className="name">
                {" "}
                {game.guestStatus === "WAITING"
                  ? game.guestStatus + "..."
                  : game.guestUsername}{" "}
              </h4>
              {game.guestStatus === "WAITING" ? (
                <img
                  src={loadingGif}
                  alt="Loading..."
                  className="loading-gif"
                />
              ) : null}
              <h4 className="host">Guest</h4>
            </div>
          </div>
          <div className="listings-container">
            <div className="subtitle-spectator-container">
              <h2 className="subtitle">Game Information</h2>
            </div>
            <div className="row-container">
              <h4 className="name">Game Id</h4>
              <h4 className="host">{game.gameId}</h4>
            </div>
            <div className="row-container">
              <h4 className="name">Game Status</h4>
              <h4 className="host">{game.gameStatus}</h4>
            </div>

            <div className="row-container"></div>
            <div className="row-container">
              <Button width="100%" onClick={() => homescreen()}>
                Cancel Game
              </Button>
            </div>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Lobby;
