import { useHistory } from "react-router-dom";
import "styles/views/GameScreen.scss";
import { useEffect, useState } from "react";
import Game from "models/Game";
import Round from "models/Round";
import EndOfRound from "components/viewElements/endElements/EndOfRound";
import EndOfGame from "components/viewElements/endElements/EndOfGame";
import PlayerHand from "components/viewElements/inGameElements/PlayerHand";
import OpponentHand from "components/viewElements/inGameElements/OpponentHand";
import OpponentLastCapture from "components/viewElements/inGameElements/OpponentLastCapture";
import TurnInfo from "components/viewElements/inGameElements/TurnInfo";
import ScoreInfo from "components/viewElements/inGameElements/ScoreInfo";
import CardTable from "components/viewElements/inGameElements/CardTable";
import CapturePile from "components/viewElements/inGameElements/CapturePile";
import { tutorialStepData } from "helpers/tutorialStepData";
import EndOfTutorial from "components/viewElements/endElements/EndOfTutorial";
import TutorialPrompt from "components/viewElements/inGameElements/TutorialPrompt";

const Tutorial = () => {
  // data points for tutorial
  const [step, setStep] = useState(null);
  const [promptText, setPromptText] = useState(null);
  const [selectableCardsTable, setSelectableCardsTable] = useState(null);
  const [selectableCardHand, setSelectableCardHand] = useState(null);
  const [selectionRequired, setSelectionRequired] = useState(null);
  const [promptIndex, setPromptIndex] = useState(0);

  const [endOfTutorial, setEndOfTutorial] = useState(false);
  const playerId = parseInt(sessionStorage.getItem("userId"));

  // these datapoints are set through the websocket
  const [game, setGame] = useState(null);
  const [round, setRound] = useState(new Round());
  // end of round contains points for the round and total points
  const [endOfRound, setEndOfRound] = useState(false);
  // end of game contains total points and winner
  const [endOfGame, setEndOfGame] = useState(false);

  // contains the cards on the table as array
  const [tableCards, setTableCards] = useState(null);

  //these datapoints are set by the player when playing to form the move
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedTableCards, setSelectedTableCards] = useState([]);
  const [selectPutOnField, setSelectPutOnField] = useState(false);
  const[scoreBoardVisbible, setScoreBoardVisbible] = useState(false);

  const history = useHistory();


  const getNextStep = (currentStep, backwards) => {
    let nextstep = currentStep;
    if (backwards) {
      nextstep--;
    } else {
      nextstep++;
    }

    setStep(nextstep);

    console.log("Getting data for step ", nextstep);
    let stepData = tutorialStepData(nextstep);
    
    
  const handleKeyDown = (event) => {
    if (event.key === 'Enter'  && !scoreBoardVisbible && !selectionRequired) {
      nextPrompt();
    }
  };

    if (stepData.finished) {
      setEndOfTutorial(stepData.finished);
      setScoreBoardVisbible(true);
      return;
    }
    if (stepData.game) {
      updateGame(stepData.game);
    }
    updateRound(stepData.round, stepData.selectableCardsTable);
    setPromptText(stepData.prompt);
    if (backwards) {
      setPromptIndex(stepData.prompt.length - 1);
    }
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
      setSelectedTableCards([]);
      setSelectedCard(null);
      return true;
    }

    // check selection from the hand
    if (selectedCard == null) {
      console.log("no card has been selected from the hand yet");
      return false;
    }
    if (selectableCardHand === selectedCard.code) {
      console.log("the correct card from the hand has been selected");
      setSelectedTableCards([]);
      setSelectedCard(null);
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
    }
  };

  const updateRound = (data, selectableCardsTable) => {
    console.log("round update received:", data);
    setRound(new Round(data));
    for (let card of data.cardsOnTable) {
      if (selectableCardsTable?.includes(card.code)) {
        card.blocked = false;
      } else {
        card.blocked = true;
      }
    }
    console.log("Cards on table after blocking: ", data.cardsOnTable);
    setTableCards(data.cardsOnTable);
    setEndOfRound(data.roundStatus === "FINISHED");
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
    if (
      round.myTurn &&
      selectableCardHand != null &&
      card.code === selectableCardHand
    ) {
      const filteredArray = round.myCardsInHand.filter(
        (item) => item.code !== card.code
      );
      if (selectedCard) {
        filteredArray.push(selectedCard);
      }
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
    setEndOfRound(false);
    getNextStep(step);
  };

  const handleEndGame = () => {
    setEndOfGame(false);
    getNextStep(step);
  };

  useEffect(() => {

    window.addEventListener('keydown', handleKeyDown);
    
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

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const nextPrompt = () => {
    if (promptIndex + 1 === promptText.length) {
      setPromptIndex(0);
      getNextStep(step);
    } else {
      setPromptIndex(promptIndex + 1);
    }
  };

  const previousPrompt = () => {
    console.log(promptText, promptText.length);
    if (promptIndex === 0) {
      getNextStep(step, true);
    } else {
      setPromptIndex(promptIndex - 1);
    }
  };

  return (
    <div className="gamescreen container">
      <div className="top">
        <div className="left">
          <div className="opponent">
            {<OpponentLastCapture cards={round?.oppLastCapture} />}
            {<OpponentHand cards={round.oppCards} />}
            {<TurnInfo myTurn={round?.myTurn} />}
          </div>
          {round ? (
            <CardTable
              toggleSelectPutOnField={toggleSelectPutOnField}
              selectPutOnField={selectPutOnField}
              selectCardFromField={selectCardFromField}
              cards={tableCards}
              myTurn={round?.myTurn}
            />
          ) : (
            <div></div>
          )}
        </div>
        <div className="right">
          <TutorialPrompt
            text={promptText}
            index={promptIndex}
            selectionRequired={selectionRequired}
            nextPrompt={nextPrompt}
            previousPrompt={previousPrompt}
            step={step}
          />
          {game && (
            <ScoreInfo
              hostAvatarUrl={game.hostAvatarUrl}
              hostPoints={game.hostPoints}
              hostUsername={game.hostUsername}
              guestAvatarUrl={game.guestAvatarUrl}
              guestPoints={game.guestPoints}
              guestUsername={game.guestUsername}
            />
          )}
          <CapturePile cards={round?.myCardsInDiscard} />
        </div>
      </div>

      <PlayerHand
        cards={round?.myCardsInHand}
        handleClick={selectCardFromHand}
      />

      <div className="exit-button-container">
        <button className="exit-button" onClick={exitTutorial}>
          Exit Tutorial
        </button>
      </div>

      {game && round && endOfRound &&  (
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

      {endOfTutorial && (
        <div className="endOfRound">
          <EndOfTutorial onEndTutorial={exitTutorial} />
        </div>
      )}
    </div>
  );
};

export default Tutorial;
