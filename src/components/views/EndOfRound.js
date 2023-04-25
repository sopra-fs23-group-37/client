import React from 'react';
import "styles/views/EndOfRound.scss";

const EndOfRound = ({ game, round, onNextRound }) => {
  const player1 = round.host
  const player2 = round.guest

  return (
    <div className="end-of-round">
      <h1>Round {round} End</h1>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Discarded Cards</th>
            <th>Number of Clubs</th>
            <th>2 of Clubs</th>
            <th>10 of Diamonds</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{game.host.name}</td>
            <td>{player1.cardsInDiscard.length}</td>
            <td>{player1.pointClubs}</td>
            <td>{player1.twoOfClubs === 1 ? 'Yes' : 'No'}</td>
            <td>{player1.tenOfDiamonds === 1 ? 'Yes' : 'No'}</td>
            <td>{player1.totalPoints}</td>
          </tr>
          <tr>
            <td>{game.guest.name}</td>
            <td>{player2.cardsInDiscard.length}</td>
            <td>{player2.pointClubs}</td>
            <td>{player2.twoOfClubs === 1 ? 'Yes' : 'No'}</td>
            <td>{player2.tenOfDiamonds === 1 ? 'Yes' : 'No'}</td>
            <td>{player2.totalPoints}</td>
          </tr>
        </tbody>
      </table>
      <div className="nextRound-button-container">
        <button className="nextRound-button" onClick={onNextRound}>
          Continue with the game
        </button>
      </div>
    </div>
  );
};

export default EndOfRound;
