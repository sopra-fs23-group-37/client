import Round from "models/Round";
import Game from "models/Game";
import TutorialStep from "models/TutorialStep";

export const matchOne_1 = () => {
  let gameInfo = new Game({
    gameStatus: "ONGOING",
    guestAvatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/two-and-ten3.appspot.com/o/addAvatar.jpg?alt=media&token=7ca12d3e-ea79-4294-bd86-04c878a68fa3",
    guestPoints: 0,
    guestStatus: "CONNECTED",
    guestUsername: "Opponent",
    hostPoints: 0,
    hostStatus: "CONNECTED",
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
        code: "AD",
        image: "https://deckofcardsapi.com/static/img/aceDiamonds.png",
        value: "ACE",
        suit: "DIAMONDS",
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
        code: "8S",
        image: "https://deckofcardsapi.com/static/img/8S.png",
        value: "8",
        suit: "SPADES",
      },
      {
        code: "2D",
        image: "https://deckofcardsapi.com/static/img/2D.png",
        value: "2",
        suit: "DIAMONDS",
      },
      {
        code: "4C",
        image: "https://deckofcardsapi.com/static/img/4C.png",
        value: "4",
        suit: "CLUBS",
      },
    ],
    myCardsInDiscard: [],
    oppCards: 7,
    oppCardsInDiscard: [],
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
    deckCards: true,
    myTurn: true,
    opponentLeft: null,
    opponentLeftReason: null,
    oppLastCapture: [],
  });
  let stepData = new TutorialStep({
    game: gameInfo,
    round: roundInfo,
    prompt: ["First, select the 8 of Clubs from the table."],
    selectionRequired: true,
    selectableCardsTable: ["8C"],
    selectableCardHand: null,
    selectedCardsTable: null,
  });
  console.log("returning step data: ", stepData);
  return stepData;
};
