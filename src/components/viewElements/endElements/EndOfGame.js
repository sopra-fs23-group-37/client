import React from "react";
import "styles/viewElements/endElements/EndOfGame.scss";

const EndOfGame = ({ game, playerId, onEndGame }) => {
  let myUsername,
    oppUsername,
    myScore,
    oppScore = 0;
  if (game?.hostId && game.guestId != null) {
    if (playerId === game.hostId) {
      myUsername = game.hostUsername;
      myScore = game.hostPoints;
      oppUsername = game.guestUsername;
      oppScore = game.guestPoints;
    } else {
      myUsername = game.guestUsername;
      myScore = game.guestPoints;
      oppUsername = game.hostUsername;
      oppScore = game.hostPoints;
    }
  }

  let winnerElement = null;
  if (game?.winnerUsername != null) {
    winnerElement = (
      <div className="winner">
        <h2>{game.winnerUsername} is the winner!</h2>
      </div>
    );
  } else {
    winnerElement = (
      <div className="winner">
        <h2>Nobody is the winner!</h2>
      </div>
    );
  }

  return (
    <div className="end-of-game">
      <h1>Game Over</h1>
      <div className="scoreboard">
        <div className="player1-score">
          <h2>{myUsername}</h2>
          <p>Score: {myScore}</p>
        </div>
        <div className="player2-score">
          <h2>{oppUsername}</h2>
          <p>Score: {oppScore}</p>
        </div>
      </div>
      {winnerElement}
      <div className="endGame-button-container">
        <button className="endGame-button" onClick={onEndGame}>
          Leave game
        </button>
      </div>
    </div>
  );
};

export default EndOfGame;
