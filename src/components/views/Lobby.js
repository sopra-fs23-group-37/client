import { useParams, useHistory } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Home.scss";
import { useEffect, useState } from "react";
import Game from "models/Game";
import sockClient from "helpers/sockClient";

const Lobby = () => {
  const gameId = useParams().gameId;
  const [game, setGame] = useState(new Game());
  const history = useHistory();
  const playerId = parseInt(sessionStorage.getItem("userId"));

  const updateGame = (data) => {
    console.log("game data received:", data);
    setGame(new Game(data));
    if (data.gameStatus === "CONNECTED" && data.host.userId === playerId) {
      sockClient.startGame(gameId);
    }
    if (data.gameStatus === "ONGOING") {
      sessionStorage.setItem("currentPage", "Game");
      history.push(`/game/play/${gameId}`);
    }
  };

  const connectAndJoin = () => {
    console.log("websocket status:", sockClient.isConnected());
    if (!sockClient.isConnected()) {
      console.log("Starting connection.");
      if (sockClient.addOnMessageFunction("Lobby", updateGame)) {
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

  let content = (
    <div className="profile overview">
      <div>Game id: {gameId}</div>
      <div>Host Status: {game.hostStatus}</div>
      <div>Guest Status: {game.guestStatus}</div>
      <div>Game Status: {game.gameStatus}</div>
      {game.hostStatus === "CONNECTED" && game.guestStatus === "CONNECTED" && (
        <div>Both players are in the lobby. The game will start soon.</div>
      )}
    </div>
  );

  return (
    <BaseContainer className="home container">
      <h2>Lobby for Game {gameId} </h2>
      {content}
      {/* <div className="login container">
        <div className="login button-container">
          <Button width="100%" onClick={() => startGame(stompClient)}>
            Start Game
          </Button>
        </div>
      </div> */}
    </BaseContainer>
  );
};

export default Lobby;
