import React from "react";
import PropTypes from "prop-types";
import "styles/views/Card.scss";

const Card = ({ code, image, suit, value, onClick }) => (
  <img
    src={image}
    alt={`${value} of ${suit}`}
    className={`card ${suit.toLowerCase()}`}
    onClick={onClick}
  />
);

Card.propTypes = {
  code: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  suit: PropTypes.oneOf(["DIAMONDS", "HEARTS", "CLUBS", "SPADES"]).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(["JACK", "KING", "QUEEN", "ACE"]),
  ]).isRequired,
  onClick: PropTypes.func,
};

export default Card;
