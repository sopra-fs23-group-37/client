import Round from "models/Round";
import TutorialStep from "models/TutorialStep";

export const endRound = () => {
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
    myCardsInHand: [],
    myCardsInDiscard: [],
    oppCards: 0,
    cardsOnTable: [],
    myTurn: true,
    oppLastCapture: [],
  });
  let stepData = new TutorialStep({
    round: roundInfo,
    prompt: [
      "Here you can see how many point you and your opponent got. You got two points for total cards, because you captured more cards overall. Your opponent captured more spades cards than you, so they get an extra point. Two special cards also give extra points: the 2 of Spades and the 10 of Diamonds. Hence the name, 2-and-10!Normally, you would keep playing rounds now, but let's just skip ahead to the end of the game.",
    ],
    selectionRequired: false,
  });
  console.log("returning step data: ", stepData);
  return stepData;
};
