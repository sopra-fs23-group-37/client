import { useParams, useHistory } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Lobby.scss";
import { useEffect, useState } from "react";
import Game from "models/Game";
import sockClient from "helpers/sockClient";
import { Button } from "components/ui/Button";

const Lobby = () => {
  const gameId = useParams().gameId;
  const [game, setGame] = useState(new Game());
  const history = useHistory();
  const playerId = parseInt(sessionStorage.getItem("userId"));

  const updateLobby = async (data) => {
    console.log("lobby data received:", data);
    setGame(new Game(data));
    console.log("new game: ", game);
    if (data.gameStatus === "CONNECTED") {
      await delay(1500);
      history.push(`/game/play/${gameId}`);
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

  useEffect(() => {
    console.log("Use Effect started");
    connectAndJoin();
    const unlisten = history.listen(() => {
      console.log("User is leaving the page");
      sockClient.disconnect();
    });

    return () => {
      console.log("Component is unmounting");
      unlisten();
    };
  });

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <BaseContainer>
      <div className="createGame container">
        <div className="createGame title-container">
          <h1 className="createGame title">Game Lobby</h1>
        </div>
        <div className="createGame subtitle-spectator-container">
          <h2 className="createGame subtitle">Players</h2>
          {/*<h4 className="createGame spectators">
            Spectators:
            <span className="spectators-number">
              TODO: function to get number of spectators 0
            </span>
          </h4>*/}
        </div>
        <div className="createGame player-container">
          <h4 className="createGame name">
            {sessionStorage.getItem("username")}
          </h4>
          <h4 className="createGame host">host</h4>
        </div>
        <div
          className="createGame player-container"
          style={{ marginBottom: "2em" }}
        >
          <h4 className="createGame name">{game.guestStatus} ...</h4>
          <Button className="createGame kick-player" disabled="true">
            kick player
          </Button>
        </div>
        <div className="createGame subtitle-spectator-container">
          <h2 className="createGame subtitle">Game Informations</h2>
        </div>
        <div className="createGame player-container">
          <h4 className="createGame name">Game ID</h4>
          <h4 className="createGame host">{game.gameId}</h4>
        </div>
        {/* TODO: DELETE THE NEXT PLAYER-CONTAINERS */}
        <div className="createGame player-container">
          <h4 className="createGame name">Host Status</h4>
          <h4 className="createGame host">{game.hostStatus}</h4>
        </div>
        <div className="createGame player-container">
          <h4 className="createGame name">Guest Status</h4>
          <h4 className="createGame host">{game.guestStatus}</h4>
        </div>
        <div className="createGame player-container">
          <h4 className="createGame name">Game Status</h4>
          <h4 className="createGame host">{game.gameStatus}</h4>
        </div>
        <div className="createGame player-container">
          {game.hostStatus === "CONNECTED" &&
            game.guestStatus === "CONNECTED" && (
              <h2 className="createGame subtitle">The game will start soon.</h2>
            )}
          {game.guestStatus === "WAITING" && (
            <h2 className="createGame subtitle">Waiting for an opponent</h2>
          )}
        </div>
      </div>
    </BaseContainer>
  );
};

export default Lobby;
