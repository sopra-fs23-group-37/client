import "styles/views/CardDisplay.scss";
import PropTypes from "prop-types";
import React from "react";

const CardDisplay = ({ cards, onClickSpace, selectPutOnField }) => {
  return (
    <div className="display-table">
      <div className="card-display">
        <div className="card-row">
          {cards}
          <div
            className="card-blank"
            style={{
              borderColor: selectPutOnField ? "red" : "black",
              borderStyle: selectPutOnField ? "dotted" : "none",
            }}
            onClick={onClickSpace}
          >
            {" "}
          </div>
        </div>
        <div className="card-row"></div>
      </div>
    </div>
  );
};

CardDisplay.propTypes = {
  onClick: PropTypes.func,
  cards: PropTypes.object,
};

export default CardDisplay;
