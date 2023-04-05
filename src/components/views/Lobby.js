import { useParams } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Game.scss";
import { useEffect, useState } from "react";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import Game from "models/Game";

const Lobby = () => {
  const gameId = useParams().gameId;
  const [hostStatus, setHostStatus] = useState(null);
  const [guestStatus, setGuestStatus] = useState(null);

  let stompClient = null;

  function connect() {
    const playerId = localStorage.getItem("userId");

    var socket = new SockJS("http://localhost:8080/websocket");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      console.log("Connected: " + frame);
      stompClient.subscribe("/topic/game/" + gameId, function (data) {
        updateGame(JSON.parse(data.body));
      });
      stompClient.send(
        "/game/join/" + gameId,
        {},
        JSON.stringify({ playerId })
      );
    });
  }

  const updateGame = (data) => {
    const game = new Game(data);
    setHostStatus(game.hostStatus);
    setGuestStatus(game.guestStatus);
    console.log("game data received: ", game);
  };

  useEffect(() => {
    connect();
  });

  let content = (
    <div className="profile overview">
      <div>Game id: {gameId}</div>
      <div>Host Status: {hostStatus}</div>
      <div>Guest Status: {guestStatus}</div>
    </div>
  );

  return (
    <BaseContainer className="game container">
      <h2>Lobby for Game {gameId} </h2>
      {content}
    </BaseContainer>
  );
};

export default Lobby;
