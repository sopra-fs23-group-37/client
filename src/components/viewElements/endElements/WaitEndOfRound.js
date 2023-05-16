import React from "react";
import "styles/viewElements/endElements/WaitEndOfRound.scss";
import loadingGif from "image/loading.gif";

const WaitEndOfRound = ({ game, playerId, onLeaveGame }) => {
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

  return (
    <div className="wait-end-of-round">
      <h1>Waiting for {oppUsername}</h1>
      <img src={loadingGif} alt="Loading..." className="loading-gif" />
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
      <div className="leave-button-container">
        <button className="leave-button" onClick={onLeaveGame}>
          Leave game
        </button>
      </div>
    </div>
  );
};

export default WaitEndOfRound;
