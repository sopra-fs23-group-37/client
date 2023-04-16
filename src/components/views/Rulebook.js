import React, { useState } from "react";
import "styles/views/Rulebook.scss";
import PokerCard from "./PokerCards";

const Rulebook = () => {
  const [showCards1, setShowCards1] = useState(false); // State für Regel 1
  const [showCards2, setShowCards2] = useState(false); // State für Regel 2
 
  const handleButtonClick1 = () => {
    setShowCards1(!showCards1); // Klick-Handler für Regel 1
  };

  const handleButtonClick2 = () => {
    setShowCards2(!showCards2); // Klick-Handler für Regel 2
  };



  return (
    <div className="rulebook container">
      <h1 className="rulebook title">Rulebook</h1>
      <div className="rulebook cards">
        <div className="rulebook buttons-container">
          {/* Regel-1-Button zum Anzeigen/Ausblenden der Pokerkarten und Regelbeschreibung */}
          <button className="rulebook button" onClick={handleButtonClick1}>
            Regel 1
          </button>
          <div style={{ margin: "40px" }}></div>
          {/* Regel-2-Button zum Anzeigen/Ausblenden der Pokerkarten und Regelbeschreibung */}
          <button className="rulebook button" onClick={handleButtonClick2}>
            Regel 2
          </button>
          <div style={{ margin: "40px" }}></div>

          <button className="rulebook button" onClick={handleButtonClick3}>
            Regel 3
          </button>
          <div style={{ margin: "40px" }}></div>
          {/* Regel-2-Button zum Anzeigen/Ausblenden der Pokerkarten und Regelbeschreibung */}
          <button className="rulebook button" onClick={handleButtonClick4}>
            Regel 4
          </button>
        </div>
        <div className="rulebook section">
          <h2 className="rulebook section-title"></h2>
          {/* Zeige Pokerkarten für Regel 1 nur wenn showCards1 true ist */}
          {showCards1 && (
            <div className="rulebook card-group">
              <PokerCard rank="2" suit="spades" />
              <PokerCard rank="3" suit="spades" />
              <PokerCard rank="4" suit="spades" />
              <PokerCard rank="5" suit="spades" />
              {/* Hier können weitere PokerCards hinzugefügt werden */}
            </div>
          )}
          {/* Zeige Pokerkarten für Regel 2 nur wenn showCards2 true ist */}
          {showCards2 && (
            <div className="rulebook card-group">
              <PokerCard rank="6" suit="hearts" />
              <PokerCard rank="7" suit="hearts" />
              <PokerCard rank="8" suit="hearts" />
              <PokerCard rank="9" suit="hearts" />
              {/* Hier können weitere PokerCards hinzugefügt werden */}
            </div>
          )}
        </div>
        <div className="rulebook section">
          <h2 className="rulebook section-title"></h2>
          <ul className="rulebook rules-list">
            {/* li className="rulebook rule-item">Regel 1: Beschreibung der Regel 1</li>*/}
            {/* li className="rulebook rule-item">Regel 2: Beschreibung der Regel 2</li>*/}
            {/* Hier können weitere Regeln hinzugefügt werden */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Rulebook;
