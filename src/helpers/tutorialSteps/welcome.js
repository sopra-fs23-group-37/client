import Round from "models/Round";
import Game from "models/Game";
import TutorialStep from "models/TutorialStep";

export const welcome = () => {
  let gameInfo = new Game({
    hostPoints: 0,
    hostUsername: "Opponent",
    hostId: "X",
    guestPoints: 0,
    guestId: sessionStorage.getItem("userId"),
    guestUsername: sessionStorage.getItem("username"),
  });

  let roundInfo = new Round({
    myCardsInHand: [
      {
        code: "AC",
        image: "https://deckofcardsapi.com/static/img/AC.png",
        value: "ACE",
        suit: "CLUBS",
      },
      {
        code: "JD",
        image: "https://deckofcardsapi.com/static/img/JD.png",
        value: "JACK",
        suit: "DIAMONDS",
      },
      {
        code: "QD",
        image: "https://deckofcardsapi.com/static/img/QD.png",
        value: "QUEEN",
        suit: "DIAMONDS",
      },
      {
        code: "7D",
        image: "https://deckofcardsapi.com/static/img/7D.png",
        value: "7",
        suit: "DIAMONDS",
      },
      {
        code: "0H",
        image: "https://deckofcardsapi.com/static/img/0H.png",
        value: "10",
        suit: "HEARTS",
      },
      {
        code: "2C",
        image: "https://deckofcardsapi.com/static/img/2C.png",
        value: "2",
        suit: "CLUBS",
      },
      {
        code: "6D",
        image: "https://deckofcardsapi.com/static/img/6D.png",
        value: "6",
        suit: "DIAMONDS",
      },
      {
        code: "8S",
        image: "https://deckofcardsapi.com/static/img/8S.png",
        value: "8",
        suit: "SPADES",
      },
    ],
    myCardsInDiscard: [],
    myLastCapture: [],
    oppCards: 8,
    cardsOnTable: [
      {
        code: "QH",
        image: "https://deckofcardsapi.com/static/img/QH.png",
        value: "QUEEN",
        suit: "HEARTS",
      },
      {
        code: "4D",
        image: "https://deckofcardsapi.com/static/img/4D.png",
        value: "4",
        suit: "DIAMONDS",
      },
      {
        code: "6S",
        image: "https://deckofcardsapi.com/static/img/6S.png",
        value: "6",
        suit: "SPADES",
      },
      {
        code: "8C",
        image: "https://deckofcardsapi.com/static/img/8C.png",
        value: "8",
        suit: "CLUBS",
      },
    ],
    myTurn: true,
    oppLastCapture: [],
  });

  let stepData = new TutorialStep({
    game: gameInfo,
    round: roundInfo,
    prompt: [
      "Welcome to the 2-and-10 Tutorial!",
      "Your goal is to capture cards from the table, using the cards in your hand.",
      "Let's try a one-to-one match now!",
    ],
    selectionRequired: false,
    selectableCardsTable: null,
    selectableCardHand: null,
  });
  console.log("returning step data: ", stepData);
  return stepData;
};
