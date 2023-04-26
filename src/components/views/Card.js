import React, { useState } from "react";
import PropTypes from "prop-types";
import "styles/views/Card.scss";

const Card = ({ code, image, suit, value, onClick }) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
    onClick();
  };

  return (<img
    src={image}
    alt={`${value} of ${suit}`}
    className={`card ${suit.toLowerCase()}`}
    onClick={handleClick}
    clicked={false}
    style={{borderColor: active ? "red" : "black", borderStyle: active ? "dotted" : "none"}}
  />)
};

Card.propTypes = {
  code: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  suit: PropTypes.oneOf(["DIAMONDS", "HEARTS", "CLUBS", "SPADES"]).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf(["JACK", "KING", "QUEEN", "ACE"]),
  ]).isRequired,
  onClick: PropTypes.func,
};

export default Card;
