import React from 'react';
import "styles/views/OpponentLeft.scss";

const OpponentLeft = ({ game, playerId, onLeaveGame, opponentLeftReason}) => {

    const leftReason = opponentLeftReason ? 
    opponentLeftReason : "One of the players left the game";

  let myUsername, oppUsername, myScore, oppScore = 0;
  if (game && game.hostId && game.guestId != null) {
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

  return (
    <div className="opponent-left">
      <h1>{leftReason}</h1>
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
        <div className="opponentLeft-button-container">
        <button className="opponentLeft-button" onClick={onLeaveGame}>
          Leave game
        </button>
      </div>
    </div>
  );
};

export default OpponentLeft;