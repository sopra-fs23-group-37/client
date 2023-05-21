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
              className={activeTab === "player-cards" ? "active" : ""}
              onClick={() => handleTabClick("player-cards")}
              style={{
                marginTop: "15px",
                marginRight: "10px",
              }} // Hier wird der Abstand erhöht
            >
              Overview
            </Button>
            <Button
              className={activeTab === "dealing" ? "active" : ""}
              onClick={() => handleTabClick("dealing")}
              style={{
                marginTop: "15px",
                marginRight: "10px",
              }} // Hier wird der Abstand erhöht
            >
              Round Setup
            </Button>
            <Button
              className={activeTab === "play" ? "active" : ""}
              onClick={() => handleTabClick("play")}
              style={{
                marginTop: "15px",
                marginRight: "10px",
              }} // Hier wird der Abstand erhöht
            >
              Moves
            </Button>
            <Button
              className={activeTab === "example" ? "active" : ""}
              onClick={() => handleTabClick("example")}
              style={{
                marginTop: "15px",
                marginRight: "10px",
              }} // Hier wird der Abstand erhöht
            >
              Example
            </Button>
            <Button
              className={activeTab === "scoring" ? "active" : ""}
              onClick={() => handleTabClick("scoring")}
              style={{
                marginTop: "15px",
                marginRight: "10px",
              }} // Hier wird der Abstand erhöht
            >
              <strong>Scoring</strong>
            </Button>
            <Button
              className={activeTab === "cheat-sheet" ? "active" : ""}
              onClick={() => handleTabClick("cheat-sheet")}
              style={{
                marginTop: "15px",
                marginRight: "10px",
              }} // Hier wird der Abstand erhöht
            >
              Cheat Sheet
            </Button>
            <Button
              className={activeTab === "game-modes" ? "active" : ""}
              onClick={() => handleTabClick("game-modes")}
              style={{
                marginTop: "15px",
                marginRight: "10px",
              }} // Hier wird der Abstand erhöht
            >
              Game Modes
            </Button>
            <Button
              onClick={() => homescreen()}
              style={{
                marginTop: "15px",
              }}
            >
              Back to home
            </Button>
          </div>
          <div className="rulenook-box">
            {activeTab === "cheat-sheet" && (
              <div className="rulebook-section-title">
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
                    <h3> Overview</h3>
                  </strong>
                </div>
                <ul className="rulebook-rules-list">
                  <li>
                    2-and-10 is a two-player online game played over multiple
                    rounds. The player who first reaches 11 points and at least
                    two more than their opponent wins.
                  </li>
                  <li>
                    The primary goal is to capture more cards than your
                    opponent. Capturing certain cards yields extra points - the{" "}
                    <strong>2 of Clubs</strong>, the{" "}
                    <strong> 10 of Diamond</strong>, and more Clubs overall than
                    the opponent.
                  </li>
                  <li>
                    Cards are captured by matching them - see section on moves.
                  </li>
                  <li>
                    2-and-10 is played with a standard 52-Card deck without
                    jokers.
                  </li>
                </ul>
              </div>
            )}
            {activeTab === "dealing" && (
              <div className="rulebook-box">
                <div className="rulebook-titelbox">
                  <strong>
                    <h3>Round Setup</h3>
                  </strong>
                </div>

                <ul className="rulebook-rules-list">
                  <li>
                    At the beginning of each round, each player receives 8
                    cards.
                  </li>
                  <li>4 cards are placed on the table.</li>
                  <li>
                    The starting player is assigned randomly for the first
                    round, and then switches after each round.
                  </li>
                  <li>
                    On the right side of the game screen, you can always see
                    whether it is your turn or your opponent's turn.
                  </li>
                  <li>
                    One round lasts until all cards from the deck are played
                    through.
                  </li>
                </ul>
              </div>
            )}

            {activeTab === "play" && (
              <div className="rulebook-box">
                <div className="rulebook-titelbox">
                  <strong>
                    <h3>Moves</h3>
                  </strong>
                </div>
                <ul className="rulebook-rules-list">
                  <li>
                    There are three different <strong>types of moves</strong>{" "}
                    you can make when it's your turn:
                  </li>
                  <ol>
                    <li>
                      {" "}
                      Capture one or multiple cards on the table with one of
                      your cards by matching them. Valid matches are:
                      <ul>
                        <li>
                          {" "}
                          Matching card values exactly, e.g. Queen with a Queen,
                          or a 4 with a 4.
                        </li>
                        <li>
                          {" "}
                          Matching numerical card values by summing up, e.g.
                          match a 5 and a 2 on the table with a 7 from your
                          hand. This works for cards with numbers 2-10 and the
                          Ace as 1, and you can only use one of your cards to
                          match the cards on the table.
                        </li>
                      </ul>
                    </li>
                    <li>Laying down one card from your hand onto the table.</li>
                    <li>
                      Capturing all cards on the table with a Jack. It is not
                      necessary to select all the table cards, the Jack will
                      automatically take them all. If there are no cards on the
                      table, playing the Jack will put it on the table and it
                      will be "dead".
                    </li>
                  </ol>

                  <li>
                    To make a move, select none, one, or multiple cards from the
                    table first, depending on what type of move you want to
                    make. Then select the card from your hand that you want to
                    play.
                  </li>
                  <li>
                    Be aware that if you select no cards from the table, the
                    card you select from your hand will be placed on the table
                    and you will not capture any cards.
                  </li>
                  <li>
                    Any cards you captured will be added to your captured pile
                    after your move.
                  </li>
                  <li>
                    Once you have played your move, it will be your opponent's
                    turn.
                  </li>
                  <li>
                    If neither you nor your opponent have any cards left to
                    play, you will be dealt 8 new cards each. You keep playing
                    until the 52 cards in the deck have been played through, at
                    which point the round ends.
                  </li>
                  <li>
                    If there are any cards left on the table at the end of the
                    round, the player who last captured cards is awarded those
                    remaining cards.
                  </li>
                </ul>
              </div>
            )}
            {activeTab === "example" && (
              <div className="rulebook-box">
                <div className="rulebook-titelbox">
                  <strong>
                    <h3>Example Moves</h3>
                  </strong>
                </div>
                <ul className="rulebook-rules-list">
                  <div>
                    <p>
                      The cards on the table are{" "}
                      <strong>Ace, 3, 6, 7, 8, Queen</strong>
                    </p>
                    <li>
                      If you play a <strong>6</strong>, you can only capture the
                      6.
                    </li>
                    <li>
                      If you play a <strong>Queen</strong>, you can only capture
                      the Queen.
                    </li>
                    <li>
                      If you play a <strong>9</strong> you can capture 3+6, or
                      Ace+8.
                    </li>
                    <li>
                      If you play a <strong>10</strong> you can capture 7+3.
                    </li>
                    <li>
                      If you play a <strong>5</strong> it captures nothing and
                      is added to the table.
                    </li>
                    <li>
                      If you play a <strong>Jack</strong> it captures all the
                      cards on the table.
                    </li>
                  </div>
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
                    At the end of the round, each player receives points for
                    captured cards as follows:
                  </p>
                  <ul>
                    <li>For higher number of captured cards: 2 points</li>
                    <li>For higher number of captured Clubs: 1 point</li>
                    <li>Captured 2 of Clubs: 1 point</li>
                    <li>Captured 10 of Diamonds: 1 point</li>
                  </ul>
                  <p>
                    If both players capture the same number of cards, neither
                    gets the points for highest number of cards.
                  </p>
                </div>
              </div>
            )}
            {activeTab === "game-modes" && (
              <div className="rulebook-box">
                <div className="rulebook-titelbox">
                  <strong>
                    <h3>Game Modes</h3>
                  </strong>
                </div>

                <div className="rulebook-rules-list">
                  <p>You can play the game in different modes:</p>
                  <ul>
                    <li>
                      Public Mode: Your game will be open to any player to join.
                    </li>
                    <li>
                      Private Mode: You will get a game code to share with a
                      friend so they can join.
                    </li>
                    <li>
                      Full Length: The game will be played over multiple rounds
                      until one player reaches 11 points and 2 more than their
                      opponent (see scoring).
                    </li>
                    <li>
                      Single Round: You will only play a single round (one Round
                      = playing through deck once).
                    </li>
                  </ul>
                  <p>
                    If both players capture the same number of cards, neither
                    gets the points for highest number of cards.
                  </p>
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
