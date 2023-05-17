import TutorialStep from "models/TutorialStep";
import { welcome } from "./tutorialSteps/welcome";
import { matchOne_1 } from "./tutorialSteps/matchOne_1";
import { matchOne_2 } from "./tutorialSteps/matchOne_2";
import { matchOne_3 } from "./tutorialSteps/matchOne_3";
import { opponent_1 } from "./tutorialSteps/opponent_1";
import { setCard_1 } from "./tutorialSteps/setCard_1";
import { setCard_2 } from "./tutorialSteps/setCard_2";
import { opponent_2 } from "./tutorialSteps/opponent_2";
import { matchTwo_1 } from "./tutorialSteps/matchTwo_1";
import { matchTwo_2 } from "./tutorialSteps/matchTwo_2";
import { matchTwo_3 } from "./tutorialSteps/matchTwo_3";
import { opponent_3 } from "./tutorialSteps/opponent_3";
import { jack_1 } from "./tutorialSteps/jack_1";
import { jack_2 } from "./tutorialSteps/jack_2";
import { deadJack_1 } from "./tutorialSteps/deadJack_1";
import { deadJack_2 } from "./tutorialSteps/deadJack_2";

export const tutorialStepData = (step) => {
  console.log("step to create data for: ", step);
  switch (step) {
    case 1:
      return welcome();

    case 2:
      return matchOne_1();

    case 3:
      return matchOne_2();

    case 4:
      return matchOne_3();

    case 5:
      return opponent_1();

    case 6:
      return setCard_1();

    case 7:
      return setCard_2();

    case 8:
      return opponent_2();

    case 9:
      return matchTwo_1();

    case 10:
      return matchTwo_2();

    case 11:
      return matchTwo_3();

    case 12:
      return opponent_3();

    case 13:
      return jack_1();

    case 14:
      return deadJack_1();

    case 15:
      return deadJack_2();

    case 16:
      return jack_2();

    default:
      console.log("The end of the tutorial has been reached.");
      let stepData = new TutorialStep({
        finished: true,
      });
      return stepData;
  }
};
