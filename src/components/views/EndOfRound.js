import React from 'react';
import "styles/views/EndOfRound.scss";

const EndOfRound = ({ onNextRound }) => {
  return (
    <div className="end-of-round">
      <h1>Round 1 End</h1>
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
            <td>Peter</td>
            <td>3</td>
            <td>0</td>
            <td>No</td>
            <td>No</td>
            <td>0</td>
          </tr>
          <tr>
            <td>Steven</td>
            <td>0</td>
            <td>1</td>
            <td>Yes</td>
            <td>No</td>
            <td>2</td>
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