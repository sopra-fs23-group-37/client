import "styles/viewElements/inGameElements/CapturePile.scss";
import Card from "./Card";
import { useState } from "react";
import PropTypes from "prop-types";
import React from "react";

const CapturePile = (props) => {
  const [discardPileVisible, setDiscardPileVisible] = useState(false);

  return (
    <div className="player-discards">
      <div className="player-discards-cards">
        {props.lastCapCards ? (<div className="card-container-discard"> 
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/54/Card_back_06.svg"
              className="cardback"
              alt="Back of Card"
              onClick={() => setDiscardPileVisible(true)}
            />
          </div> ) : (
            <h1> </h1>
          ) }
        {props.lastCapCards ? (
          props.lastCapCards.map((card) => (
            <div className="card-container-discard" key={card.code}>
              <Card
                key={card.code}
                code={card.code}
                suit={card.suit}
                value={card.value}
                image={card.image}
                fromField={false}
                onClick={() => setDiscardPileVisible(true)}
              />
            </div>
          ))
        ) : (
          <h1> </h1>
        )}
        {discardPileVisible && (
        <div
          className="discard-overlay"
          onClick={() => setDiscardPileVisible(false)}
        >
          <div className="cards-container-discard-overlay">
            {props.discardCards ? (
              props.discardCards.map((card) => (
              <div className="card-container-discard-overlay" key={card.code}>
                <Card
                  key={card.code}
                  code={card.code}
                  suit={card.suit}
                  value={card.value}
                  image={card.image}
                  blocked={true}
                />
              </div>
            ))
          ) : (
            <div className="card-blank"> </div>
          )}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

CapturePile.propTypes = {
  discardCards: PropTypes.any,
  lastCapCards: PropTypes.any,
};

export default CapturePile;
