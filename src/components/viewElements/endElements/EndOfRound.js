import React from "react";
import "styles/views/EndOfRound.scss";

const EndOfRound = ({ game, round, playerId, onEndRound }) => {
  let myUsername,
    oppUsername = 0;
  if (game && game.hostId && game.guestId != null) {
    if (playerId === game.hostId) {
      myUsername = game.hostUsername;
      oppUsername = game.guestUsername;
    } else {
      myUsername = game.guestUsername;
      oppUsername = game.hostUsername;
    }
  }

  return (
    <div className="end-of-round">
      <h1>Round End</h1>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Captured Cards</th>
            <th>Number of Clubs</th>
            <th>2 of Clubs</th>
            <th>10 of Diamonds</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{myUsername}</td>
            <td>{round.myCardsInDiscard?.length ?? 0}</td>
            <td>{round.myPointClubs}</td>
            <td>{round.myTwoOfClubs}</td>
            <td>{round.myTenOfDiamonds}</td>
            <td>{round.myTotalPoints}</td>
          </tr>
          <tr>
            <td>{oppUsername}</td>
            <td>{round.oppCardsInDiscard?.length ?? 0}</td>
            <td>{round.oppPointClubs}</td>
            <td>{round.oppTwoOfClubs}</td>
            <td>{round.oppTenOfDiamonds}</td>
            <td>{round.oppTotalPoints}</td>
          </tr>
        </tbody>
      </table>
      <div className="nextRound-button-container">
        <button className="nextRound-button" onClick={onEndRound}>
          Continue with the game
        </button>
      </div>
    </div>
  );
};

export default EndOfRound;
