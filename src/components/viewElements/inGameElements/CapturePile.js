import "styles/viewElements/inGameElements/CapturePile.scss";
import Card from "./Card";
import { useState } from "react";
import PropTypes from "prop-types";
import React from "react";

const CapturePile = ({ cards }) => {
  const [discardPileVisible, setDiscardPileVisible] = useState(false);

  return (
    <div className="player-discards">
      <div className="card-container-discard">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/54/Card_back_06.svg"
          className="cardback"
          alt="Back of Card"
          onClick={() => setDiscardPileVisible(true)}
        />
        {discardPileVisible && (
        <div
          className="discard-overlay"
          onClick={() => setDiscardPileVisible(false)}
        >
          <div className="cards-container-discard-overlay">
            {cards ? (
              cards.map((card) => (
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
  cards: PropTypes.any,
};

export default CapturePile;
