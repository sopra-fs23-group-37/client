import "styles/viewElements/inGameElements/CapturePile.scss";
import Card from "./Card";
import PropTypes from "prop-types";
import React from "react";

const CapturePile = ({ cards }) => {
  return (
    <div className="discard-pile">
      <div className="stack">
        {cards ? (
          cards.map((card) => (
            <div className="card-container-discard">
              <Card
                key={card.code}
                code={card.code}
                suit={card.suit}
                value={card.value}
                image={card.image}
                onClick={() => {}}
                fromField={true}
              />
            </div>
          ))
        ) : (
          <div className="card-blank"> </div>
        )}
      </div>
      <div className="stackHeight">
        {cards ? (
          <h1> Captured cards: {cards.length} </h1>
        ) : (
          <h1> Captured cards: 0 </h1>
        )}
      </div>
    </div>
  );
};

CapturePile.propTypes = {
  cards: PropTypes.any,
};

export default CapturePile;
