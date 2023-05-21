import Round from "models/Round";
import TutorialStep from "models/TutorialStep";

export const jack_2 = () => {
  let roundInfo = new Round({
    myCardsInHand: [
      {
        code: "AC",
        image: "https://deckofcardsapi.com/static/img/AC.png",
        value: "ACE",
        suit: "CLUBS",
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
      {
        code: "4D",
        image: "https://deckofcardsapi.com/static/img/4D.png",
        value: "4",
        suit: "DIAMONDS",
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
        code: "8C",
        image: "https://deckofcardsapi.com/static/img/8C.png",
        value: "8",
        suit: "CLUBS",
      },

      {
        code: "KH",
        image: "https://deckofcardsapi.com/static/img/KH.png",
        value: "KING",
        suit: "HEARTS",
      },
      {
        code: "7S",
        image: "https://deckofcardsapi.com/static/img/7S.png",
        value: "7",
        suit: "SPADES",
      },
      {
        code: "JD",
        image: "https://deckofcardsapi.com/static/img/JD.png",
        value: "JACK",
        suit: "DIAMONDS",
      },
    ],
    myLastCapture: [
      {
        code: "8C",
        image: "https://deckofcardsapi.com/static/img/8C.png",
        value: "8",
        suit: "CLUBS",
      },

      {
        code: "KH",
        image: "https://deckofcardsapi.com/static/img/KH.png",
        value: "KING",
        suit: "HEARTS",
      },
      {
        code: "7S",
        image: "https://deckofcardsapi.com/static/img/7S.png",
        value: "7",
        suit: "SPADES",
      },
      {
        code: "JD",
        image: "https://deckofcardsapi.com/static/img/JD.png",
        value: "JACK",
        suit: "DIAMONDS",
      },
    ],
    oppCards: 5,
    cardsOnTable: [],
    myTurn: true,
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
    round: roundInfo,
    prompt: [
      "Once you and your opponent have played through your 8 cards, you get a refill from the deck.",
      "When the deck is empty, the round ends, and the last player who captured any cards at all sweeps up anything left on the table.",
      "Let's skip ahead to the end of the round to look at points.",
    ],
    selectionRequired: false,
  });
  console.log("returning step data: ", stepData);
  return stepData;
};
