import React from "react";
import PropTypes from "prop-types";
import "styles/views/PokerCards.scss";

const PokerCard = (props) => {
  return (
    <div className={`poker-card ${props.suit}`}>
      <div className="poker-card-inner">
        <div className="poker-card-rank">{props.rank}</div>
        <div className="poker-card-suit">{getSuitIcon(props.suit)}</div>
      </div>
    </div>
  );
};

PokerCard.propTypes = {
  rank: PropTypes.string.isRequired,
  suit: PropTypes.string.isRequired,
};

const getSuitIcon = (suit) => {
  switch (suit) {
    case "spades":
      return <span>&#9824;</span>; // ♠
    case "hearts":
      return <span>&#9829;</span>; // ♥
    case "diamonds":
      return <span>&#9830;</span>; // ♦
    case "clubs":
      return <span>&#9827;</span>; // ♣
    default:
      return null;
  }
};

export default PokerCard;
