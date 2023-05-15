import "styles/viewElements/inGameElements/CardTable.scss";

import Card from "./Card";
import CardDisplay from "./CardDisplay";
import PropTypes from "prop-types";
import React from "react";

const CardTable = ({
  cards,
  deck,
  toggleSelectPutOnField,
  selectPutOnField,
  selectCardFromField,
}) => {
  let cardsOnTableContainer = (
    <div className="cards-on-table">
      <div className="card-container-field">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/54/Card_back_06.svg"
          className="cardback"
          alt="Back of Card"
        />
      </div>
      {cards ? (
        cards.map((card) => (
          <div className="card-container-field" key={card.code}>
            <Card
              key={card.code}
              code={card.code}
              suit={card.suit}
              value={card.value}
              image={card.image}
              onClick={() => selectCardFromField(card)}
              fromField={true}
            />
          </div>
        ))
      ) : (
        <div className="card-blank"> </div>
      )}
    </div>
  );

  return (
    <div className="table">
      <div className="inner-table">
        <CardDisplay
          // if it works it works
          cards={cardsOnTableContainer}
          onClickSpace={() => toggleSelectPutOnField()}
          selectPutOnField={selectPutOnField}
        />
      </div>
    </div>
  );
};

CardTable.propTypes = {
  toggleSelectPutOnField: PropTypes.any,
  selectPutOnField: PropTypes.any,
  selectCardFromField: PropTypes.any,
  cards: PropTypes.any,
  deck: PropTypes.bool,
};

export default CardTable;
