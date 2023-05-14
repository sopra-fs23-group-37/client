import { useParams, useHistory } from "react-router-dom";
import "styles/views/GameScreen.scss";
import { useEffect, useState } from "react";
import Game from "models/Game";
import Round from "models/Round";
import EndOfRound from "components/views/EndOfRound";
import EndOfGame from "components/views/EndOfGame";
import OpponentLeft from "components/views/OpponentLeft";
import sockClient from "helpers/sockClient";
import Card from "components/views/Card.js";
import CardDisplay from "./CardDisplay";
import loadingGif from "image/loading.gif";
import WaitEndOfRound from "./WaitEndOfRound";
import myImage from "image/Sheet.png";
import noAvatar from "image/noAvatar.png";
import { tutorialStepData } from "helpers/tutorialStepData";
import EndOfTutorial from "components/views/EndOfTutorial";

const Tutorial = () => {
  // data points for tutorial
  const [step, setStep] = useState(null);
  const [promptText, setPromptText] = useState(null);
  const [selectableCardsTable, setSelectableCardsTable] = useState(null);
  const [selectableCardHand, setSelectableCardHand] = useState(null);
  const [selectionRequired, setSelectionRequired] = useState(null);
  const [promptIndex, setPromptIndex] = useState(0);

  const [rulebookVisible, setRulebookVisible] = useState(false);
  const [endOfTutorial, setEndOfTutorial] = useState(false);
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);


  const gameId = useParams().gameId;
  const playerId = parseInt(sessionStorage.getItem("userId"));
  // these datapoints are set through the websocket
  const [game, setGame] = useState(null);
  const [round, setRound] = useState(new Round());
  // end of round contains points for the round and total points
  const [endOfRound, setEndOfRound] = useState(false);
  // end of game contains total points and winner
  const [endOfGame, setEndOfGame] = useState(false);
  // contains all cards from the player and on the discard
  const [playerCards, setPlayerCards] = useState(null);
  const [playerDiscards, setPlayerDiscardCards] = useState(null);
  // contains number of cards of the opponent
  const [opponentCards, setOpponentCards] = useState(null);

  // contains the cards on the table as array
  const [tableCards, setTableCards] = useState(null);
  // true if the opponent has left
  const [opponentLeft, setOpponentLeft] = useState(false);
  // set reason for why the player has left (e.g. unexpected disconnect, surrender)
  const [opponentLeftReason, setOpponentLeftReason] = useState(null);
  // needed for the waiting overlay after the EndOfRound
  const [waitEndOfRound, setWaitEndOfRound] = useState(false);
  //these datapoints are set by the player when playing to form the move
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedTableCards, setSelectedTableCards] = useState([]);
  const [selectPutOnField, setSelectPutOnField] = useState(false);
  const [oppLastCapture, setOppLastCapture] = useState(null);

  const history = useHistory();

  const getNextStep = (currentStep) => {
    setStep(step + 1);
    console.log("Getting data for step ", currentStep + 1);
    let stepData = tutorialStepData(currentStep + 1);

    if(currentStep == 0) {
      setTime(0);
      setTimerRunning(true);
    } 

    if (stepData.finished) {
      setEndOfTutorial(stepData.finished);
      setTimerRunning(false);
      return;
    }
    updateGame(stepData.game);
    updateRound(stepData.round);
    setPromptText(stepData.prompt);
    console.log(
      "Current and new selecatable cards from table: ",
      selectableCardsTable,
      stepData.selectableCardsTable
    );
    setSelectionRequired(stepData.selectionRequired);
    setSelectableCardsTable(stepData.selectableCardsTable);
    console.log(
      "Current and new selecatable cards from hand: ",
      selectableCardHand,
      stepData.selectableCardHand
    );
    setSelectableCardHand(stepData.selectableCardHand);
    return true;
  };

  useEffect (() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const startTutorial = () => {
    console.log("tutorial starting");
    getNextStep(0);
  };


  const checkStepComplete = () => {
    console.log("Checking if the tutorial step has been completed");

    console.log("Selectable card from hand: ", selectableCardHand);
    console.log("Selected card from hand: ", selectedCard);
    console.log("Selectable cards from Table: ", selectableCardsTable);
    console.log("Selected cards from Table: ", selectedTableCards);

    let selectedCardCodes = [];

    // step is not just text and check if the selectable cards have been set
    if (
      !selectionRequired ||
      (selectableCardHand == null && selectableCardsTable == null)
    ) {
      console.log("No required cards set for this step.");
      return false;
    }
    // if cards from the table need to be selected and none have been selected yet, return false
    else if (selectableCardsTable != null && selectedTableCards.length === 0) {
      console.log("Table cards need to be selected");
      return false;
    }

    // if cards from the table need to be selected, check them
    if (selectableCardsTable != null) {
      console.log("checking selection from table");
      for (let i = 0; i < selectedTableCards.length; i++) {
        let code = selectedTableCards[i].code;
        selectedCardCodes.push(code);
        if (!selectableCardsTable.includes(code)) {
          // return false if a card has been selected that was not supposed to be selected
          console.log("A wrong card has been selected from the table");
          return false;
        }
      }
      console.log("No wrong cards have been selected");
      console.log("Selected Card codes include: ", selectedCardCodes);

      for (let i = 0; i < selectableCardsTable.length; i++) {
        if (!selectedCardCodes.includes(selectableCardsTable[i])) {
          // return false if not all cards that should be selected have been selected
          console.log(
            "Not all required cards have been selected from the table yet. Missing card: ",
            selectableCardsTable[i]
          );
          return false;
        }
      }
      console.log("All required table cards have been correctly selected");
      return true;
    }

    // check selection from the hand
    if (selectedCard == null) {
      console.log("no card has been selected from the hand yet");
      return false;
    }
    if (selectableCardHand === selectedCard.code) {
      console.log("the correct card from the hand has been selected");
      return true;
    } else {
      console.log(
        "the right card from the hand has not yet been selected. The selected cards code is ",
        selectedCard.code,
        "and the expected code is ",
        selectableCardHand
      );
      return false;
    }
  };

  const updateGame = (data) => {

    if (!endOfTutorial) {
        // take the game update data and set it in here
        console.log("game data received: ", data);
        setGame(new Game(data));
        if (data.gameStatus === "FINISHED") {
          console.log("the game has ended!");
          setEndOfGame(true);
        }
        if (
          data.gameStatus === "DISCONNECTED" ||
          data.gameStatus === "SURRENDERED"
        ) {
          setOpponentLeft(true);
          setOpponentLeftReason(data.endGameReason);
          setEndOfRound(false);
          setWaitEndOfRound(false);
        }
      };
    }

  const updateRound = (data) => {
    console.log("round update received:", data);
    setRound(new Round(data));
    setPlayerCards(data.myCardsInHand);
    setTableCards(data.cardsOnTable);
    setOpponentCards(data.oppCards);
    setPlayerDiscardCards(data.myCardsInDiscard);
    console.log();
    setEndOfRound(data.roundStatus === "FINISHED");
    setOppLastCapture(data.oppLastCapture);

    if (data.roundStatus === "ONGOING") {
      setWaitEndOfRound(false);
    }
  };

  const selectCardFromField = (card) => {
    if (round.myTurn) {
      // if card is already clicked
      if (selectedTableCards.includes(card)) {
        const filteredArray = selectedTableCards.filter(
          (item) => item !== card
        );
        setSelectedTableCards(filteredArray);
      } else {
        setSelectedTableCards((selectedTableCards) => [
          ...selectedTableCards,
          card,
        ]);
      }
    }
    console.log("selectedCard: ", selectedCard);
  };
  const selectCardFromHand = (card) => {
    if (round.myTurn && selectableCardHand != null) {
      const filteredArray = playerCards.filter(
        (item) => item.code !== card.code
      );
      if (selectedCard) {
        filteredArray.push(selectedCard);
      }
      setPlayerCards(filteredArray);
      setSelectedCard(card);
    }
  };

  const toggleSelectPutOnField = () => {
    if (round.myTurn) {
      setSelectPutOnField((current) => !current);
    }
  };

  const exitTutorial = () => {
    history.push("/game");
  };

  const handleEndRound = () => {
    console.log("user is confirming that the round ended");
    sockClient.confirmEndOfRound(gameId, playerId);
    setEndOfRound(false);
    setWaitEndOfRound(true);
  };

  const handleEndGame = () => {
    history.push("/game");
  };

  const handleLeaveGame = () => {
    history.push("/game");
  };

  useEffect(() => {
    if (!endOfTutorial) {
    console.log("Use Effect started");
    console.log("current game data: ", game);
    console.log("current round data:", round);

    if (!step) {
      console.log("No step set yet, starting tutorial");
      startTutorial();
    }

    if (checkStepComplete()) {
      console.log("Step completed: ", step);
      let completed = getNextStep(step);
      console.log(
        completed ? "The new step has been successfully loaded." : ""
      );
    }
    }
  });

  let playerHandContainer = (
    <div className="playerHandContainer">
      <div className="playerHand">
        {playerCards ? (
          playerCards.map((card) => (
            <div className="card-container-hand">
              <Card
                key={card.code}
                code={card.code}
                suit={card.suit}
                value={card.value}
                image={card.image}
                fromField={false}
                onClick={() => selectCardFromHand(card)}
              />
            </div>
          ))
        ) : (
          <h1> Not loaded </h1>
        )}
      </div>

      <div className="exit-button-container">
        <button className="exit-button" onClick={exitTutorial}>
          Exit Tutorial
        </button>
      </div>

      {/* <div className="player-info">
        <ButtonGame
          width="80%"
          background="#FFFFFF"
          onClick={() => makeMove()}
          disable={checkButton()}
        >
          Play Move
        </ButtonGame>
      </div> */}
    </div>
  );

  let opponentHand = (
    <div className="opponent-cards">
      {opponentCards ? (
        [...Array(opponentCards)].map((e, i) => (
          <div className="card-container-opponent">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/54/Card_back_06.svg"
              className="cardback"
              key={i}
              alt="Back of Card"
            />
          </div>
        ))
      ) : (
        <h1> not loaded </h1>
      )}
    </div>
  );
  let opponentDiscardPile = (
    <div className="opponent-discards">
      {oppLastCapture !== null ? (
        oppLastCapture.map((e, i) => (
          <img src={e.image} className="cardback" key={i} alt="e.code" />
        ))
      ) : (
        <h1> No cards were captured </h1>
      )}
      <h2 className="container-title"> Opponent's last Capture </h2>
    </div>
  );

  let turnInfo = (
    <div className="turn-info-container">
      <div className="turn-info-form">
        <h1>{round && round.myTurn ? "Your turn" : "Opponent's turn"}</h1>
        {!round.myTurn && (
          <img src={loadingGif} alt="Loading..." className="loading-gif" />
        )}
      </div>
    </div>
  );
  let cardsOnTableContainer = (
    <div className="cards-on-table">
      <div className="card-container-field">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/54/Card_back_06.svg"
          className="cardback"
          alt="Back of Card"
        />
      </div>
      {tableCards ? (
        tableCards.map((card) => (
          <div className="card-container-field">
            <Card
              key={card.code}
              code={card.code}
              suit={card.suit}
              value={card.value}
              image={card.image}
              onClick={() => selectCardFromField(card)}
              fromField={true}
            />
          </div>
        ))
      ) : (
        <div className="card-blank"> </div>
      )}
    </div>
  );
  let cardsDiscard = (
    <div className="discard-pile">
      <div className="stack">
        {playerDiscards ? (
          playerDiscards.map((card) => (
            <div className="card-container-discard">
              <Card
                key={card.code}
                code={card.code}
                suit={card.suit}
                value={card.value}
                image={card.image}
                onClick={() => {}}
                fromField={true}
              />
            </div>
          ))
        ) : (
          <div className="card-blank"> </div>
        )}
      </div>
      <div className="stackHeight">
        {playerDiscards ? (
          <h1> Captured cards: {playerDiscards.length} </h1>
        ) : (
          <h1> Captured cards: 0 </h1>
        )}
      </div>
    </div>
  );

  const nextPrompt = () => {
    console.log(promptText, promptText.length);
    if (promptIndex + 1 === promptText.length) {
      setPromptIndex(0);
      getNextStep(step);
    } else {
      setPromptIndex(promptIndex + 1);
    }
  };


  return (
    <div className="gamescreen container">
      <div className="top">
        <div className="left">
          <div className="opponent">
            {opponentDiscardPile}
            {opponentHand}
            {turnInfo}
          </div>
          <div className="table">
            <div className="inner-table">
              <CardDisplay
                // if it works it works
                cards={cardsOnTableContainer}
                onClickSpace={() => toggleSelectPutOnField()}
                selectPutOnField={selectPutOnField}
              />
            </div>
          </div>
        </div>
        <div className="right">
          {game && (
            <div className="statistics">
              <div className="prompt-container">
                <div className="prompt-form">
                  {promptText ? (
                    <h1>{promptText[promptIndex]}</h1>
                  ) : (
                    <h1> "No Prompt" </h1>
                  )}
                  {!selectionRequired ? (
                    <button onClick={nextPrompt}>Continue</button>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
              <div className="player-names">
                <div className="image">
                  <div className="image-upload">
                    {game && game.guestAvatarUrl && (
                      <img alt="Avatar" src={game.guestAvatarUrl}></img>
                    )}
                    {game && !game.guestAvatarUrl && (
                      <img alt="Avatar" src={noAvatar}></img>
                    )}
                  </div>
                </div>
                <span className="guest-name">{game.guestUsername}</span>
                <span className="points">
                  <span className="guest-points">{game.guestPoints || 0}</span>
                  <span className="points-divider">:</span>
                  <span className="host-points">{game.hostPoints || 0}</span>
                </span>
                <span className="host-name">{game.hostUsername}</span>
                <div className="image">
                  <div className="image-upload">
                    {game && game.hostAvatarUrl && (
                      <img alt="Avatar" src={game.hostAvatarUrl}></img>
                    )}
                    {!game.hostAvatarUrl && (
                      <img alt="Avatar" src={noAvatar}></img>
                    )}
                  </div>
                </div>
              </div>

              {/* <div className="surrender-button-container">
                <button className="surrender-button" onClick={exitTutorial}>
                  Exit Tutorial
                </button>
              </div> */}

              <div className="rulebook-container">
                <button
                  className="round-button"
                  onClick={() => setRulebookVisible(!rulebookVisible)}
                >
                  ?
                </button>
                {rulebookVisible && (
                  <div
                    className="rulebook-overlay"
                    onClick={() => setRulebookVisible(false)}
                  >
                    <img src={myImage} alt="" />
                  </div>
                )}
              </div>
            </div>
          )}
          {cardsDiscard}
        </div>
      </div>

      {playerHandContainer}

      {game && round && endOfRound && (
        <div className="endOfRound">
          <EndOfRound
            game={game}
            round={round}
            playerId={playerId}
            onEndRound={handleEndRound}
          />
        </div>
      )}

      {game && endOfGame && (
        <div className="endOfRound">
          <EndOfGame
            game={game}
            playerId={playerId}
            onEndGame={handleEndGame}
          />
        </div>
      )}

      {game && opponentLeft && (
        <div className="opponentLeft">
          <OpponentLeft
            game={game}
            playerId={playerId}
            onLeaveGame={handleLeaveGame}
            opponentLeftReason={opponentLeftReason}
          />
        </div>
      )}

      {game && waitEndOfRound && (
        <div className="waitEndOfRound">
          <WaitEndOfRound
            game={game}
            playerId={playerId}
            onLeaveGame={exitTutorial}
          />
        </div>
      )}

      {endOfTutorial && (
        <div className="endOfRound">
          <EndOfTutorial
            time={time}
            onEndTutorial={exitTutorial}
          />
        </div>
      )}
    </div>
  );
};

export default Tutorial;
