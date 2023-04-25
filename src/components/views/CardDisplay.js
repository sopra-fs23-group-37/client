import React, { useState } from 'react';
import 'styles/views/CardDisplay.scss';
import sockClient from "helpers/sockClient";
import Card from "components/views/Card"


function CardDisplay() {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (code) => {
    setSelectedCard(code);
  };

  return (
    <div className='gamescreen-table'>
    <div className="card-display">
      <div className="card-container">
        <div className="card-row">
          
          {/* Placeholder for table cards */}
          <div className={`card ${selectedCard === "JD" ? "selected" : ""}`}>
            <Card
              code="JD"
              suit="DIAMONDS"
              value="JACK"
              image="https://deckofcardsapi.com/static/img/JD.png"
              onClick={() => handleCardClick("JD")}
            />
          </div>
          <div className={`card ${selectedCard === "QS" ? "selected" : ""}`}>
            <Card
              code="QS"
              suit="SPADES"
              value="QUEEN"
              image="https://deckofcardsapi.com/static/img/QS.png"
              onClick={() => handleCardClick("QS")}
            />
          </div>
          <div className={`card ${selectedCard === "KC" ? "selected" : ""}`}>
            <Card
              code="KC"
              suit="CLUBS"
              value="KING"
              image="https://deckofcardsapi.com/static/img/KC.png"
              onClick={() => handleCardClick("KC")}
            />
          </div>
          <div className={`card ${selectedCard === "AH" ? "selected" : ""}`}>
            <Card
              code="AH"
              suit="HEARTS"
              value="ACE"
              image="https://deckofcardsapi.com/static/img/AH.png"
              onClick={() => handleCardClick("AH")}
            />
          </div>
        </div>

        <div className="card-row">
          {/* Placeholder for table cards */}
          <div className={`card ${selectedCard === "JD" ? "selected" : ""}`}>
            <Card
              code="JD"
              suit="DIAMONDS"
              value="JACK"
              image="https://deckofcardsapi.com/static/img/JD.png"
              onClick={() => handleCardClick("JD")}
            />
          </div>
          <div className={`card ${selectedCard === "QS" ? "selected" : ""}`}>
            <Card
              code="QS"
              suit="SPADES"
              value="QUEEN"
              image="https://deckofcardsapi.com/static/img/QS.png"
              onClick={() => handleCardClick("QS")}
            />
          </div>
          <div className={`card ${selectedCard === "KC" ? "selected" : ""}`}>
            <Card
              code="KC"
              suit="CLUBS"
              value="KING"
              image="https://deckofcardsapi.com/static/img/KC.png"
              onClick={() => handleCardClick("KC")}
            />
          </div>
          <div className={`card ${selectedCard === "AH" ? "selected" : ""}`}>
            <Card
              code="AH"
              suit="HEARTS"
              value="ACE"
              image="https://deckofcardsapi.com/static/img/AH.png"
              onClick={() => handleCardClick("AH")}
            />
          </div>

          <div className={`card ${selectedCard === "AH" ? "selected" : ""}`}>
          </div>
          </div>
        
      </div>
    </div>
    </div>
  );
}

export default CardDisplay;