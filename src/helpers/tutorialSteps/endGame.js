import Game from "models/Game";
import TutorialStep from "models/TutorialStep";

export const endGame = () => {
  let gameInfo = new Game({
    gameStatus: "FINISHED",
    hostAvatarUrl: null,
    hostPoints: 11,
    hostUsername: "Opponent",
    hostId: "X",
    guestPoints: 9,
    guestId: sessionStorage.getItem("userId"),
    guestUsername: sessionStorage.getItem("username"),
    guestAvatarUrl: sessionStorage.getItem("avatarUrl"),
    winnerUsername: "Opponent",
  });
  let stepData = new TutorialStep({
    game: gameInfo,
    prompt: [
      "The game finishes when one player has at least 11 points, and at least 2 more points than their opponent. Sorry, it looks like you lost this one. Try playing for real and see if you have better luck!",
    ],
    selectionRequired: false,
  });
  console.log("returning step data: ", stepData);
  return stepData;
};
