import React from 'react';
import "styles/views/EndOfGame.scss";

const EndOfGame = ({ onEndGame }) => {

  return (
    <div className="end-of-game">
      <h1>Game Over</h1>
      <div className="scoreboard">
        <div className="player1-score">
          <h2>Peter</h2>
          <p>Score: 2</p>
        </div>
        <div className="player2-score">
          <h2>Roger</h2>
          <p>Score: 3</p>
        </div>
      </div>
        <div className="winner">
          <h2>Steven is the winner!</h2>
        </div>
        <div className="draw">
          <h2>It's a draw!</h2>
        </div>
      <div className="leave-game-button-container">
        <button className="leave-game-button" onClick={onEndGame}>
          Leave game
        </button>
      </div>
    </div>
  );
};

export default EndOfGame;

