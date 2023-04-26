import "styles/views/CardDisplay.scss";
import Card from "components/views/Card";
import PropTypes from "prop-types";
import React from "react";

const CardDisplay = ({onClickCard, cards, onClickSpace, selectPutOnField}) => {
  return (
    <div className="display-table">
      <div className="card-display">
        <div className="card-row">
          {cards ? (
          cards.map((card) => (
            <Card
              key={card.code}
              code={card.code}
              suit={card.suit}
              value={card.value}
              image={card.image}
              onClick={onClickCard}
              fromField={true}
            />
          ))
        ) : (
          <div className="card-blank" > </div>
        )}
          <div className="card-blank" style={{borderColor: selectPutOnField ? "red" : "black", borderStyle: selectPutOnField ? "dotted" : "none"}} onClick={onClickSpace}> </div>
          </div>
          <div className="card-row">
            
        </div>
      </div>
    </div>
  );
};

CardDisplay.propTypes = {
  onClick: PropTypes.func,
  cards: PropTypes.array,
};

export default CardDisplay;
