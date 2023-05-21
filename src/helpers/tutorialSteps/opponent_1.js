import Round from "models/Round";
import Game from "models/Game";
import TutorialStep from "models/TutorialStep";

export const opponent_1 = () => {
  let gameInfo = new Game({
    gameStatus: "ONGOING",
    hostPoints: 0,
    hostUsername: "Opponent",
    hostId: "X",
    guestPoints: 0,
    guestId: sessionStorage.getItem("userId"),
    guestUsername: sessionStorage.getItem("username"),
  });
  let roundInfo = new Round({
    roundStatus: "ONGOING",
    myPointsTotalCards: 0,
    myPointClubs: 0,
    myTwoOfClubs: 0,
    myTenOfDiamonds: 0,
    myTotalPoints: 0,
    oppPointsTotalCards: 0,
    oppPointClubs: 0,
    oppTwoOfClubs: 0,
    oppTenOfDiamonds: 0,
    oppTotalPoints: 0,
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
    myCardsInDiscard: [
      {
        code: "QH",
        image: "https://deckofcardsapi.com/static/img/QH.png",
        value: "QUEEN",
        suit: "HEARTS",
      },
      {
        code: "QD",
        image: "https://deckofcardsapi.com/static/img/QD.png",
        value: "QUEEN",
        suit: "DIAMONDS",
      },
    ],
    myLastCapture: [
      {
        code: "QH",
        image: "https://deckofcardsapi.com/static/img/QH.png",
        value: "QUEEN",
        suit: "HEARTS",
      },
      {
        code: "QD",
        image: "https://deckofcardsapi.com/static/img/QD.png",
        value: "QUEEN",
        suit: "DIAMONDS",
      },
    ],
    oppCards: 7,
    cardsOnTable: [
      {
        code: "4D",
        image: "https://deckofcardsapi.com/static/img/4D.png",
        value: "4",
        suit: "DIAMONDS",
      },

      {
        code: "8C",
        image: "https://deckofcardsapi.com/static/img/8C.png",
        value: "8",
        suit: "CLUBS",
      },
    ],
    deckCards: true,
    myTurn: true,
    opponentLeft: null,
    opponentLeftReason: null,
    oppLastCapture: [
      {
        code: "6S",
        image: "https://deckofcardsapi.com/static/img/6S.png",
        value: "6",
        suit: "SPADES",
      },
      {
        code: "6H",
        image: "https://deckofcardsapi.com/static/img/6H.png",
        value: "6",
        suit: "HEARTS",
      },
    ],
  });
  let stepData = new TutorialStep({
    game: gameInfo,
    round: roundInfo,
    prompt: [
      "Your opponent just captured the 6 of Spades with the 6 of Hearts.",
      "You can see their capture in the top left corner of the screen.",
    ],
    selectionRequired: false,
    selectableCardsTable: null,
    selectableCardHand: null,
    preSelectedCardsTable: null,
    finished: false,
  });
  console.log("returning step data: ", stepData);
  return stepData;
};
