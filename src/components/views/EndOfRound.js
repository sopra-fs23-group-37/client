import React from 'react';
import "styles/views/EndOfRound.scss";

const EndOfRound = ({ scores, players, onNextRound }) => {
  const highestCards = Math.max(...scores);
  const highestClubs = players.reduce((max, player) => {
    if (player.clubs > max) {
      return player.clubs;
    } else {
      return max;
    }
  }, 0);
  //const has2OfClubs = players.some(player => player.has2OfClubs); will be used in the future
  //const has10OfDiamonds = players.some(player => player.has10OfDiamonds);

  return (
    <div className="end-of-round-overlay">
      <div className="end-of-round-container">
        <h1 className="end-of-round-title">End of Round</h1>
        <h2 className="end-of-round-subtitle">Scores</h2>
        <ul className="end-of-round-list">
          {players.map((player, index) => (
            <li key={player.id} className="end-of-round-item">
              {player.name}: {scores[index]}
            </li>
          ))}
        </ul>
        <h2 className="end-of-round-subtitle">Points</h2>
        <ul className="end-of-round-list">
          {players.map(player => {
            let points = 0;
            if (player.cards === highestCards) {
              points += 2;
            }
            if (player.clubs === highestClubs) {
              points += 1;
            }
            if (player.has2OfClubs) {
              points += 1;
            }
            if (player.has10OfDiamonds) {
              points += 1;
            }
            return (
              <li key={player.id} className="end-of-round-item">
                {player.name}: <span className="end-of-round-point">{points}</span>
                {points > 0 &&
                  <span className="end-of-round-reason">
                    ({player.cards === highestCards && "most cards, "}
                    {player.clubs === highestClubs && "most clubs, "}
                    {player.has2OfClubs && "2 of clubs, "}
                    {player.has10OfDiamonds && "10 of diamonds, "}
                    {points === 3 && "sweep"})
                  </span>
                }
              </li>
            );
          })}
        </ul>
        <button className="end-of-round-button" onClick={onNextRound}>Next Round</button>
      </div>
    </div>
  );
};

export default EndOfRound;
