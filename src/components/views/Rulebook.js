import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "styles/views/Rulebook.scss";
import PokerCard from "./PokerCards";
import BaseContainer from "components/ui/BaseContainer";
const Rulebook = () => {
  const [showPlayersAndCards, setShowPlayersAndCards] = useState(false);
  const [showDealing, setDealing] = useState(false);
  const [showPlaying, setPlaying] = useState(false);
  const [showScoring, setScoring] = useState(false);

  const togglePlayersAndCards = () => {
    setShowPlayersAndCards(!showPlayersAndCards);
  };

  const toggleDealing = () => {
    setDealing(!showDealing);
  };

  const togglePlaying = () => {
    setPlaying(!showPlaying);
  };

  const toggleScoring = () => {
    setScoring(!showScoring);
  }; 

  return (
    <BaseContainer>
   <div className="rulebook-container" style={{ padding: "40px" }}>
      <h1 className="rulebook-title">Rulebook</h1>

      <div className="rulebook-section">
        <button
          className="rulebook-section-title"
          onClick={togglePlayersAndCards}
          style={{ fontSize: "14px", background: "black", color: "white", borderRadius: "4px", padding: "8px", cursor: "pointer", transition: "background 0.3s ease-in-out", fontFamily: "Arial" }} // Ändere die Schriftart hier
        >
          Players and Cards
        </button>
        {showPlayersAndCards && (
          <ul className="rulebook-rules-list">
            <li className="rulebook-rule-item">
              2-and-10 is played with a standard 52-card deck without jokers.
            </li>
            <p></p>
            <li className="rulebook-rule-item">
              For the purpose of capture the cards have values: king=14, queen=13,
              jack=12, ace=1 or 11 at the choice of the player, other cards face
              value.
            </li>
            <p></p>
            <li className="rulebook-rule-item">
              The suits have no significance in this game, except that the
              diamond10 and club2 are worth extra points in the scoring.
            </li>
          </ul>
        )}
      </div>

      <div className="rulebook-section">
        <button
          className="rulebook-section-title"
          onClick={toggleDealing}
          style={{ fontSize: "14px", background: "black", color: "white", borderRadius: "10px", padding: "9px", cursor: "pointer", transition: "background 0.5s ease-in-out", fontFamily: "Chunky" }} // Ändere die Schriftart hier
        >
          Dealing
        </button>
        {showDealing && (
          <ul className="rulebook-rules-list">
            <li className="rulebook-rule-item">
              The dealer distributes 6 cards to each player and places four cards
              on the table. The remaining cards are placed aside. Once all players
              have played all their cards, the dealer takes the deck of cards and
              again deals six cards to each player. When all the cards have been
              played and the entire deck has been used, the game ends.
            </li>
          </ul>
        )}
      </div>


      <div className="rulebook-section">
        <button
          className="rulebook-section-title"
          onClick={togglePlaying}
          style={{ fontSize: "14px", background: "black", color: "white", borderRadius: "4px", padding: "8px", cursor: "pointer", transition: "background 0.3s ease-in-out", fontFamily: "Arial" }} // Ändere die Schriftart hier
        >
          Play
        </button>
        {showPlaying && (
          <ul className="rulebook-rules-list">
            <li className="rulebook-rule-item">
              At your turn you play one card face up on the table. If its value is equal to a card or a set of cards in the layout, you may capture any such cards or sets. No card can belong to more than one captured set at the same time. For example with 2, 3, 4, 7 on the table, a 9 can capture 2+3+4 or 2+7 but not both these sets at once, since the 2 can only belong to one of them. You take the captured cards, along with the card you played, and store them face down in your pile of captured cards.
            </li>
            <p></p>
            <li className="rulebook-rule-item">
              If the played card does not match any card or sum of cards, it is simply left face up on the table as an extra card of the layout, which may be captured in a future play. Irrespective of whether the played card captured anything or not, it is then the next player's turn to play.
            </li>
            <p></p>
            <li className="rulebook-rule-item">
              Example:
              <p>The cards on the table are <strong>A, 3, 6, 7, 8, Q</strong></p>
              <p>If you play a <strong>6</strong>, you can only capture the 6</p>
              <p>If you play a <strong>9</strong> you can capture (A+8) + (3+6).</p>
              <p>If you play a <strong>10</strong> you can capture 7+3.</p>
              <p>If you play a <strong>King (14)</strong> you could capture A+6+7, or (A+Q) + (6+8), or (A+3) + (6+8) (counting the Ace as 11).</p>
              <p>If you play a <strong>5</strong> it captures nothing and remains face up on the table.</p>
            </li>

            <li className="rulebook-rule-item">
              When playing a card, you are not obliged to capture everything that you can. You may capture just some of the matching cards or sets, or nothing at all. For example, in a partnership game your partner plays a 10 and the next player does not take it. On your turn, if you suspect that your partner has a second 10, you can play your 10 and not capture, leaving both tens on the table for your partner.            </li>
            <p></p>

            <li className="rulebook-rule-item">
              When everyone has played their cards, if there are cards remaining in the deck, the dealer deals more cards as described above, and whatever was on the table remains there to be captured.        </li>
            <p></p>



          </ul>
        )}
      </div>


      <div className="rulebook-section">
        <button
          className="rulebook-section-title"
          onClick={toggleScoring}
          style={{ fontSize: "14px", background: "black", color: "white", borderRadius: "10px", padding: "9px", cursor: "pointer", transition: "background 0.5s ease-in-out", fontFamily: "Chunky" }} // Ändere die Schriftart hier
        >
          Dealing
        </button>
        {showScoring && (
          <ul className="rulebook-rules-list">
          <li className="rulebook-rule-item">
            <p><strong>At the end of the play, each player or team scores for captured cards as follows:</strong></p>
            <p>Each Ace, King, Queen or Jack: 1 point</p>
            <p>10 of diamonds: 2 points</p>
            <p>Other tens: 1 point</p>
            <p>2 of clubs: 1 point</p>
            <p>The player or team with most cards: 3 points</p>
            <p>That makes a total of 25 points.</p>
          </li>
        </ul>
        )}
      </div>

    </div>

    </BaseContainer>
  );
};

export default Rulebook;

