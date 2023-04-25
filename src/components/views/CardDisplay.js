

import React, { useState, useEffect } from 'react';
import 'styles/views/CardDisplay.scss';
import sockClient from "helpers/sockClient";
import Card from "components/views/Card"

function CardDisplay() {
  

  //useEffect(() => {
    // Connect to the backend API using SockClient
   // const client = sockClient; // TODO: Connect with deck
   // client.connect({}, () => {
   //   // Subscribe to the card data topic and update the cards state
   //   client.subscribe('/topic/cards', message => {
  //      const data = JSON.parse(message.body);
   //     setCards(data);
   //   });
  //  });

  //  return () => {
      // Disconnect from the backend API when the component unmounts
   //   client.disconnect();
  //  };
  //}, []);
  
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (code) => {
    setSelectedCard(code);
  };

  return (
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
            
          </div>

          <div className={`card ${selectedCard === Card.code ? "selected" : ""}`}>

            </div>

            <div className={`card ${selectedCard === Card.code ? "selected" : ""}`}>

            </div>
        </div>

        <div className="card-row">
        <div className={`card ${selectedCard === Card.code ? "selected" : ""}`}>

        </div>
        <div className={`card ${selectedCard === Card.code ? "selected" : ""}`}>
          
        </div>
        <div className={`card ${selectedCard === Card.code ? "selected" : ""}`}>
          
        </div>
        <div className={`card ${selectedCard === Card.code ? "selected" : ""}`}>
          
        </div>
        <div className={`card ${selectedCard === Card.code ? "selected" : ""}`}>
          
        </div>
        <div className={`card ${selectedCard === Card.code ? "selected" : ""}`}>
          
        </div>
        
        </div>
        
      </div>
      </div>
    
    

    

  );
}

export default CardDisplay;