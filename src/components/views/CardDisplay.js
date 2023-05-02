import "styles/views/CardDisplay.scss";
import PropTypes from "prop-types";
import React from "react";

const CardDisplay = ({ cards, onClickSpace, selectPutOnField }) => {
  return (
      <div className="card-display">
          {cards}
        <div className="card-blank"
            style={{
              borderColor: selectPutOnField ? "red" : "black",
              borderStyle: selectPutOnField ? "dotted" : "none",
            }}
            onClick={onClickSpace}
          >
            {" "}
          </div>
      </div>
  );
};

CardDisplay.propTypes = {
  onClick: PropTypes.func,
  cards: PropTypes.object,
};

export default CardDisplay;
