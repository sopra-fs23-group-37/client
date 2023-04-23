import React from 'react';
import "styles/components/EndOfRound.scss";

const EndOfRound = ({ scores, players }) => {
  const highestCards = Math.max(...scores);
  const highestClubs = players.reduce((max, player) => {
    if (player.clubs > max) {
      return player.clubs;
    } else {
      return max;
    }
  }, 0);
  const has2OfClubs = players.some(player => player.has2OfClubs);
  const has10OfDiamonds = players.some(player => player.has10OfDiamonds);

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
          {players.map(player => (
            <li key={player.id} className="end-of-round-item">
              {player.name}:
              {player.cards === highestCards && <span className="end-of-round-point">2 (most cards)</span>}
              {player.clubs === highestClubs && <span className="end-of-round-point">1 (most clubs)</span>}
              {player.has2OfClubs && <span className="end-of-round-point">1 (2 of clubs)</span>}
              {player.has10OfDiamonds && <span className="end-of-round-point">1 (10 of diamonds)</span>}
              {player.cards !== highestCards && player.clubs !== highestClubs &&
              !player.has2OfClubs && !player.has10OfDiamonds && <span className="end-of-round-point">0</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EndOfRound;
