import React from 'react';
import './PokerCard.css';

const PokerCard = ({ suit, rank }) => {
  const getSuitSymbol = () => {
    switch(suit) {
      case 'spades':
        return '♠';
      case 'hearts':
        return '♥';
      case 'clubs':
        return '♣';
      case 'diamonds':
        return '♦';
      default:
        return '';
    }
  }

  return (
    <div className={`poker-card ${suit}`}>
      <div className="poker-card-inner">
        <div className="poker-card-rank">{rank}</div>
        <div className="poker-card-suit">{getSuitSymbol()}</div>
      </div>
    </div>
  );
};

export default PokerCard;