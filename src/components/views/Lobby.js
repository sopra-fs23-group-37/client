import { useParams, useHistory } from "react-router-dom";
import { ButtonLight } from "components/ui/Button";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Lobby.scss";
import { useEffect, useState } from "react";
import Game from "models/Game";
import sockClient from "helpers/sockClient";

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

  const updateLobby = (data) => {
    setGame(new Game(data));
    if (
      data.gameStatus === "DISCONNECTED" ||
      data.gameStatus === "SURRENDERED"
    ) {
      setOpponentLeft(true);
      setOpponentLeftReason(data.endGameReason);
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
    connectAndJoin();

    console.log("Current Lobby data: ", game);

    checkGoToGame();

    if (goingToGame) {
      goToGame();
    }

    const unlisten = history.listen(() => {
      console.log("is the user going to the game? ", goingToGame);
      if (!goingToGame) {
        console.log("User left the lobby");
        sockClient.disconnect();
      }
    });

    return () => {
      console.log("Component is unmounting");
      unlisten();
    };
  });

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <BaseContainer>
      <div className="lobby container">
        <div className="lobby form">
          <div className="title-container">
            <h1 className="title"> {game.hostUsername}'s Lobby </h1>
          </div>
          <div className="listings-container">
            <div className="subtitle-spectator-container">
              <h2 className="subtitle">Players</h2>
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
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Lobby;
