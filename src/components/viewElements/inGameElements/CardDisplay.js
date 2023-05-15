import "styles/views/CardDisplay.scss";
import PropTypes from "prop-types";
import React from "react";

const CardDisplay = ({ cards, onClickSpace, selectPutOnField }) => {
  return (
      <div className="card-display">
          {cards}
      </div>
  );
};

CardDisplay.propTypes = {
  onClick: PropTypes.func,
  cards: PropTypes.object,
};

export default CardDisplay;
