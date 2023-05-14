import Round from "models/Round";
import Game from "models/Game";
import TutorialStep from "models/TutorialStep";

export const endRound = () => {
  let gameInfo = new Game({
    gameStatus: "ONGOING",
    guestAvatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/two-and-ten3.appspot.com/o/addAvatar.jpg?alt=media&token=7ca12d3e-ea79-4294-bd86-04c878a68fa3",
    guestPoints: 2,
    guestStatus: "CONNECTED",
    guestUsername: "Opponent",
    hostPoints: 3,
    hostStatus: "CONNECTED",
  });
  let roundInfo = new Round({
    roundStatus: "FINISHED",
    myPointsTotalCards: 2,
    myPointClubs: 0,
    myTwoOfClubs: 0,
    myTenOfDiamonds: 1,
    myTotalPoints: 0,
    oppPointsTotalCards: 0,
    oppPointClubs: 1,
    oppTwoOfClubs: 1,
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
    myCardsInDiscard: [
      {
        code: "8S",
        image: "https://deckofcardsapi.com/static/img/8S.png",
        value: "8",
        suit: "SPADES",
      },
      {
        code: "8C",
        image: "https://deckofcardsapi.com/static/img/8C.png",
        value: "8",
        suit: "CLUBS",
      },
    ],
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
      "Here you can see how many point you and your opponent got. You got two points for total cards, because you captured more cards overall. Your opponent captured more spades cards than you, so they get an extra point. Two special cards also give extra points: the 2 of Spades and the 10 of Diamonds. Hence the name, 2-and-10!Normally, you would keep playing rounds now, but let's just skip ahead to the end of the game.",
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