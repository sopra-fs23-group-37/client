import { useParams } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/GameScreen.scss";
import { useEffect, useState } from "react";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import Game from "models/Game";
import { Button } from "components/ui/Button";
import EndOfRound from "components/views/EndOfRound";
import EndOfGame from "components/views/EndOfGame";


const GameScreen = () => {
  const gameId = useParams().gameId;
  const [game, setGame] = useState(new Game());
  const [connected, setConnected] = useState(false);
  const socket = new SockJS("http://localhost:8080/websocket");
  const stompClient = Stomp.over(socket);

  function connect() {
    // const playerId = parseInt(sessionStorage.getItem("userId")); (will be used in the future)

    stompClient.connect({}, function (frame) {
      console.log("Connected: " + frame);
      stompClient.subscribe("/topic/game/" + gameId, function (data) {
        updateGame(JSON.parse(data.body));
      });
    });
    setConnected(true);
  }

  const updateGame = (data) => {
    // json data from server doesn't match class variables on server so be careful when parsing
    // classes for round, player and card exist according to json if smaller objects are needed
    console.log("game data received:", data);
    setGame(new Game(data));
  };


  useEffect(() => {
    if (!connected) {
      console.log("Use Effect starting connection.");
      connect();
    }
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
      <h2>Game {gameId}</h2>
      <h1>{game.gameId}</h1>
      {game.winner ? (
        <EndOfGame winner={game.winner} />
      ) : (
        <>
          {game.currentRound && game.currentRound.roundStatus === "FINISHED" && (
            <EndOfRound />
          )}
          {content}
          <Button width="100%" onClick={() => printStuff()}>
            Print to console
          </Button>
        </>
      )}
    </BaseContainer>
  );
  
  
}

export default GameScreen;
