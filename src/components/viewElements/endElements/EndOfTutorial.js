import React from "react";
import "styles/viewElements/endElements/EndOfTutorial.scss";

const EndOfTutorial = ({ onEndTutorial }) => {
  return (
    <div className="end-of-tutorial">
      <h1>Scoring</h1>
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
            <td>{sessionStorage.getItem("username")}</td>
            <td>2</td>
            <td>0</td>
            <td>0</td>
            <td>1</td>
            <td>3</td>
          </tr>
          <tr>
            <td>Opponent</td>
            <td>0</td>
            <td>1</td>
            <td>1</td>
            <td>0</td>
            <td>2</td>
          </tr>
        </tbody>
      </table>
      <h2>You get points after every round based on the cards you captured</h2>
      <ul className="scoring-list">
        <li className="score-item">For higher number of cards: 2 points</li>
        <li className="score-item">For higher number of Clubs: 1 points</li>
        <li className="score-item">10 of Diamonds: 1 points</li>
        <li className="score-item">2 of Clubs: 1 point</li>
      </ul>

      <h2>
        The player who first reaches 11 points and 2 more than their opponent
        wins!
      </h2>
      <h2>Now you are ready to play a real 1-vs-1 game!</h2>
      <div className="endTutorial-button-container">
        <button className="endTutorial-button" onClick={onEndTutorial}>
          Leave tutorial
        </button>
      </div>
    </div>
  );
};

export default EndOfTutorial;
