import "styles/viewElements/inGameElements/CapturePile.scss";
import Card from "./Card";
import PropTypes from "prop-types";
import React from "react";

const CapturePile = ({ cards }) => {
  return (
    <div className="player-discards">
      <div className="cards">
      {cards ? (
          cards.map((e, i) => (
            <div className="card-container-player-discard" key={e.code}>
              <img src={e.image} className="cardo" alt="e.code" />
            </div>
          ))
        ) : (
          <h1> - </h1>
        )}
      </div>
      {cards ? (
        <h2 className="stackHeight"> Captured cards: {cards.length} </h2>
      ) : (
        <h2 className="stackHeight"> Captured cards: 0 </h2>
      )}
    </div>
  );
};

CapturePile.propTypes = {
  cards: PropTypes.any,
};

export default CapturePile;
