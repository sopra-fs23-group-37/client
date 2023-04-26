import React, { useState } from "react";
import "styles/views/CardDisplay.scss";
import sockClient from "helpers/sockClient";
import Card from "components/views/Card";

function CardDisplay() {
  const [selectedCard, setSelectedCard] = useState([]);

  const handleCardClick = (cardCode) => {
    if (selectedCard.includes(cardCode)) {
      setSelectedCard(selectedCard.filter((item) => item !== cardCode));
    } else {
      setSelectedCard([...selectedCard, cardCode]);
    }
  };

  return (
    <div className="gamescreen-table">
      <div className="card-display">
        <div className="card-container">
          <div className="card-row">
            {/* Placeholder for table cards */}
            <div
              className={`card ${
                selectedCard.includes("JD") ? "selected" : ""
              }`}>
              <Card
                code="JD"
                suit="DIAMONDS"
                value="JACK"
                image="https://deckofcardsapi.com/static/img/JD.png"
                onClick={() => handleCardClick("JD")}
              />
            </div>
            <div
              className={`card ${
                selectedCard.includes("QS") ? "selected" : ""
              }`}>
              <Card
                code="QS"
                suit="SPADES"
                value="QUEEN"
                image="https://deckofcardsapi.com/static/img/QS.png"
                onClick={() => handleCardClick("QS")}
              />
            </div>

            <div
              className={`card ${
                selectedCard.includes("KC") ? "selected" : ""
              }`}>
              <Card
                code="KC"
                suit="CLUBS"
                value="KING"
                image="https://deckofcardsapi.com/static/img/KC.png"
                onClick={() => handleCardClick("KC")}
              />
            </div>


            <div
              className={`card ${
                selectedCard.includes("AH") ? "selected" : ""
              }`}>
              <Card
                code="AH"
                suit="HEARTS"
                value="ACE"
                image="https://deckofcardsapi.com/static/img/AH.png"
                onClick={() => handleCardClick("AH")}
              />
            </div>


            <div
              className={`card ${
                selectedCard.includes(Card.code) ? "selected" : ""
              }`}>
      
           
              </div>

            <div
              className={`card ${
                selectedCard.includes(Card.code) ? "selected" : ""
              }`}>
                
              </div>

            <div
              className={`card ${selectedCard === "" ? "selected" : ""}`}>

              </div>
          </div>

          <div className="card-row">
            {/* Placeholder for table cards */}
            <div
              className={`card ${
                selectedCard.includes(Card.code) ? "selected" : ""
              }`}></div>

            <div
              className={`card ${
                selectedCard.includes(Card.code) ? "selected" : ""
              }`}></div>

            <div className={`card ${selectedCard.includes("9D") ? "selected" : ""}`}>
              <Card
                code="9D"
                suit="DIAMONDS"
                value="NINE"
                image="https://deckofcardsapi.com/static/img/9D.png"
                onClick={() => handleCardClick("9D")}
              />
            </div>
            <div className={`card ${selectedCard.includes("AS") ? "selected" : ""}`}>
              <Card
                code="AS"
                suit="SPADES"
                value="ACE"
                image="https://deckofcardsapi.com/static/img/AS.png"
                onClick={() => handleCardClick("AS")}
              />
            </div>

            <div
              className={`card ${
                selectedCard.includes(Card.code) ? "selected" : ""
              }`}></div>

            <div
              className={`card ${
                selectedCard.includes(Card.code) ? "selected" : ""
              }`}></div>

            <div
              className={`card ${
                selectedCard.includes(Card.code) ? "selected" : ""
              }`}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDisplay;
