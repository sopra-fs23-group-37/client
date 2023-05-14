import React, { useState } from "react";
import PropTypes from "prop-types";
import "styles/views/Card.scss";

const Card = ({ code, image, suit, value, onClick, fromField }) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    if (fromField) {
      setActive(!active);
    }
      onClick();
  };

  return (
    <img
      src={image}
      alt={`${value} of ${suit}`}
      className={"card"}
      onClick={handleClick}
      active={active}
      style={{ transform: active ? "scale(1.1)" : "scale(1)" }}
    />
  );
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
  fromField: PropTypes.bool,
};

export default Card;
