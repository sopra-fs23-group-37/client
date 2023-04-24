import React, { useState, useEffect } from 'react';
import './CardDisplay.scss';
import sockClient from "helpers/sockClient";

function CardDisplay() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Connect to the backend API using SockClient
    const client = sockClient; // TODO: Connect with deck
    client.connect({}, () => {
      // Subscribe to the card data topic and update the cards state
      client.subscribe('/topic/cards', message => {
        const data = JSON.parse(message.body);
        setCards(data);
      });
    });

    return () => {
      // Disconnect from the backend API when the component unmounts
      client.disconnect();
    };
  }, []);

  return (
    <div className="card-display">
      <div className="card-row">
        {cards.slice(0, 4).map(card => (
          <div className="card-placeholder" key={card.id}>
            <img src={card.image} alt={card.name} />
          </div>
        ))}
      </div>
      <div className="card-row">
        {cards.slice(4, 8).map(card => (
          <div className="card-placeholder" key={card.id}>
            <img src={card.image} alt={card.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardDisplay;