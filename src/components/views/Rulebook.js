import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Rulebook.scss";
import { useState } from "react";
import { Button } from "components/ui/Button";
import { useHistory } from "react-router-dom";
import myImage from "image/Sheet.png";

const Rulebook = () => {
  const [activeTab, setActiveTab] = useState("player-cards");
  const history = useHistory();
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const homescreen = () => {
    history.push("/game/dashboard");
  };

  return (
    <BaseContainer>
      <div className="rulebook-container">
        <h1 className="rulebook-title">Rulebook </h1>
        <div className="rulebook-tabs">
          <div className="rulebook-section">
            <Button 
              className={activeTab === "cheat-sheet" ? "active" : ""}
              onClick={() => handleTabClick("cheat-sheet")}
              style={{ marginRight: "10px",marginTop: "20px", width:"120px", height:"55px" }} // Hier wird der Abstand erhöht
            >
              Sheet
            </Button>
            <Button
              className={activeTab === "player-cards" ? "active" : ""}
              onClick={() => handleTabClick("player-cards")}
              style={{marginRight: "10px", marginTop: "40px", width:"120px", height:"55px"  }} // Hier wird der Abstand erhöht
            >
              Cards
            </Button>
            <Button
              className={activeTab === "dealing" ? "active" : ""}
              onClick={() => handleTabClick("dealing")}
              style={{ marginRight: "10px", marginTop: "20px", width:"120px", height:"55px"  }} // Hier wird der Abstand erhöht
            >
              Dealing
            </Button>
            <Button
              className={activeTab === "play" ? "active" : ""}
              onClick={() => handleTabClick("play")}
              style={{ marginRight: "10px", marginTop: "20px", width:"120px", height:"55px" }} // Hier wird der Abstand erhöht
            >
              Play
            </Button>
            <Button
              className={activeTab === "scoring" ? "active" : ""}
              onClick={() => handleTabClick("scoring")}
              style={{ marginRight: "10px", marginTop: "20px", width:"120px", height:"55px" }} // Hier wird der Abstand erhöht
            >
              <strong>Scoring</strong>
            </Button>

            <Button onClick={() => homescreen()} style={{ marginLeft: "300px", color: "white", backgroundColor: "E76F51",marginTop: "20px", width:"150px", height:"55px" }}>
          Back to home
        </Button >
          </div>
          <div className="rulenook-box">
            {activeTab === "cheat-sheet" && (

              <div className="rulebook-section-title">
                <strong>
                  <h3></h3>
                </strong>
                <img
                  src={myImage}
                  alt=""
                  style={{ height: "500px", width: "1000px", marginLeft: 0 }}
                />
              </div>
            )}
            {activeTab === "player-cards" && (
              <div className="rulebook-box">
                <div className="rulebook-titelbox">
                  <strong>
                    <h3> Cards</h3>
                  </strong>
                </div>
                <ul className="rulebook-rules-list">
                  <li>
                    2-and-10 is played with a standard 52-Card deck without
                    jokers.
                  </li>
                  <li>
                    For the purpose of capture the cards have values: King = 14,
                    Queen = 13, Jack = 12, Ace = 1 or 11 at the choice of the player,
                    other cards face value.
                  </li>

                  <li>
                    The <strong> 10 of Diamond</strong> and <strong>2 of Clubs</strong> are worth extra points in the scoring.
                  </li>
                </ul>
              </div>
            )}
            {activeTab === "dealing" && (
              <div className="rulebook-box">
                <div className="rulebook-titelbox">
                  <strong>
                    <h3>Dealing</h3>
                  </strong>
                </div>

                <ul className="rulebook-rules-list">
                  <li>
                    The dealer distributes 8 cards to each player and places 4
                    cards on the table. The remaining cards are placed aside. Once
                    all players have played all their cards from the hand, the dealer takes the
                    deck of cards and again deals 8 cards to each player. When
                    all the cards are played and the entire deck is
                    used, the game ends.
                  </li>
                </ul>
              </div>
            )}

            {activeTab === "play" && (
              <div className="rulebook-box">
                <div className="rulebook-titelbox">
                  <strong>
                    <h3>Play</h3>
                  </strong>
                </div>
                <ul className="rulebook-rules-list">
                  <li>
                    At your turn you play one card face up on the table. If its
                    value is equal to a card or a set of cards in the layout, you
                    may capture any such cards or sets. No card can belong to more
                    than one captured set at the same time. For example with 2, 3,
                    4, 7 on the table, a 9 can capture 2+3+4 or 2+7 but not both
                    these sets at once, since the 2 can only belong to one of
                    them. You take the captured cards, along with the card you
                    played, and store them face down in your pile of captured
                    cards.
                  </li>

                  <li>
                    If the played card does not match any card or sum of cards, it
                    is simply left face up on the table as an extra card of the
                    layout, which may be captured in a future play. Irrespective
                    of whether the played card captured anything or not, it is
                    then the next player's turn to play.
                  </li>
                  <p></p>
                  <div>
                    <li>Example:</li>
                    <p>
                      The cards on the table are <strong>A, 3, 6, 7, 8, Q</strong>
                    </p>
                    <li>
                      If you play a <strong>6</strong>, you can only capture the 6
                    </li>
                    <li>
                      If you play a <strong>9</strong> you can capture (A+8) +
                      (3+6).
                    </li>
                    <li>
                      If you play a <strong>10</strong> you can capture 7+3.
                    </li>
                    <li>
                      If you play a <strong>King (14)</strong> you could capture
                      A+6+7, or (A+Q) + (6+8), or (A+3) + (6+8) (counting the Ace
                      as 11).
                    </li>
                    <li>
                      If you play a <strong>5</strong> it captures nothing and
                      remains face up on the table.
                    </li>
                  </div>

                  <li>
                    <p>
                      When playing a card, you are not obliged to capture
                      everything that you can. You may capture just some of the
                      matching cards or sets, or nothing at all. For example, in a
                      partnership game your partner plays a 10 and the next player
                      does not take it. On your turn, if you suspect that your
                      partner has a second 10, you can play your 10 and not
                      capture, leaving both tens on the table for your partner.
                    </p>{" "}
                  </li>
                  <p></p>

                  <li>
                    When everyone has played their cards, if there are cards
                    remaining in the deck, the dealer deals more cards as
                    described above, and whatever was on the table remains there
                    to be captured.{" "}
                  </li>
                  <p></p>
                </ul>
              </div>
            )}
            {activeTab === "scoring" && (
              <div className="rulebook-box">
                <div className="rulebook-titelbox">
                  <strong>
                    <h3>Scoring</h3>
                  </strong>
                </div>

                <div className="rulebook-rules-list">
                  <p>
                    At the end of the play, each player or team scores for
                    captured cards as follows:
                  </p>
                  <ul>
                    <li>For highest number of cards: 2 points</li>
                    <li>10 of diamonds: 1 points</li>
                    <li>2 of clubs: 1 point</li>
                    <li>The player with most clubs: 1 points</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Rulebook;

   // <li>Each Ace, King, Queen or Jack: 1 point</li>
   //<li>Other tens: 1 point</li>