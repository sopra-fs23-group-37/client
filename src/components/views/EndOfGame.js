import React from 'react';
import { useHistory } from 'react-router-dom';
import "styles/views/EndOfGame.scss";

const EndOfGame = ({ players }) => {
  const history = useHistory();

  const scores = players.map(player => player.score);
  const highestScore = Math.max(...scores);
  const winningPlayers = players.filter(player => player.score === highestScore);

  const handleEndGame = () => {
    history.push('/game/dashboard');
  };

  return (
    <div className="end-of-game-overlay">
      <div className="end-of-game-container">
        <h1 className="end-of-game-title">End of Game</h1>
        <h2 className="end-of-game-subtitle">Winner{winningPlayers.length > 1 ? "s" : ""}</h2>
        <ul className="end-of-game-list">
          {winningPlayers.map(player => (
            <li key={player.id} className="end-of-game-item">
              {player.name} ({player.score})
            </li>
          ))}
        </ul>
        <h2 className="end-of-game-subtitle">Final Scores</h2>
        <ul className="end-of-game-list">
          {players.map(player => (
            <li key={player.id} className="end-of-game-item">
              {player.name}: {player.score}
            </li>
          ))}
        </ul>
        <button className="end-of-game-button" onClick={handleEndGame}>End Game</button>
      </div>
    </div>
  );
};

export default EndOfGame;
