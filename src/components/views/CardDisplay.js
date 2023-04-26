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

          <div className={`card ${selectedCard === "" ? "selected" : ""}`}>
           
            
           </div>
        </div>

        <div className="card-row">
          {/* Placeholder for table cards */}
          <div className={`card ${selectedCard === "AD" ? "selected" : ""}`}>
            <Card
              code="AD"
              suit="DIAMONDS"
              value="ACE"
              image="https://deckofcardsapi.com/static/img/AD.png"
              onClick={() => handleCardClick("AD")}
            />
          </div>
          <div className={`card ${selectedCard === "2S" ? "selected" : ""}`}>
            <Card
              code="2S"
              suit="SPADES"
              value="TWO"
              image="https://deckofcardsapi.com/static/img/2S.png"
              onClick={() => handleCardClick("2S")}
            />
          </div>
          <div className={`card ${selectedCard === "9D" ? "selected" : ""}`}>
            <Card
              code="9D"
              suit="DIAMONDS"
              value="NINE"
              image="https://deckofcardsapi.com/static/img/9D.png"
              onClick={() => handleCardClick("9D")}
            />
          </div>
          <div className={`card ${selectedCard === "AS" ? "selected" : ""}`}>
            <Card
              code="AS"
              suit="SPADES"
              value="ACE"
              image="https://deckofcardsapi.com/static/img/AS.png"
              onClick={() => handleCardClick("AS")}
            />
          </div>

          <div className={`card ${selectedCard === Card.code ? "selected" : ""}`}>
        
          </div>
          
          
          
          </div>
          <div className="card-row">
          {/* Placeholder for table cards Row 3 */}
          <div className={`card ${selectedCard === "" ? "selected" : ""}`}>
           
            
           </div>
          <div className={`card ${selectedCard === "" ? "selected" : ""}`}>
           
            
          </div>
          <div className={`card ${selectedCard === "" ? "selected" : ""}`}>
           
            
           </div>
          <div className={`card ${selectedCard === "" ? "selected" : ""}`}>
           
            
          </div>

          <div className={`card ${selectedCard === Card.code ? "selected" : ""}`}>
        
          </div>
          
          
          
          </div>
        
      </div>
    </div>
    </div>
  );
}

export default CardDisplay;