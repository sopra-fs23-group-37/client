import TutorialStep from "models/TutorialStep";
import { welcome } from "./tutorialSteps/welcome";
import { matchOne_1 } from "./tutorialSteps/matchOne_1";
import { matchOne_2 } from "./tutorialSteps/matchOne_2";
import { matchOne_3 } from "./tutorialSteps/matchOne_3";
import { opponent } from "./tutorialSteps/opponent";

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
      return opponent();

    default:
      console.log("The end of the tutorial has been reached.");
      let stepData = new TutorialStep({
        finished: true,
      });
      return stepData;
  }
};
