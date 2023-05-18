import "styles/viewElements/inGameElements/TutorialPrompt.scss";
import PropTypes from "prop-types";
import React from "react";

const TutorialPrompt = ({
  text,
  index,
  selectionRequired,
  nextPrompt,
  step,
  previousPrompt,
}) => {
  console.log("prompttext is ", text);
  return (
    <div className="prompt-container">
      <div className="prompt-form">
        {text ? <h1>{text[index]}</h1> : <h1> "No Prompt" </h1>}
        {index > 0 || step > 1 ? (
          <button onClick={previousPrompt}>Previous</button>
        ) : (
          <div></div>
        )}
        {!selectionRequired ? (
          <button onClick={nextPrompt}>Next</button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

TutorialPrompt.propTypes = {
  text: PropTypes.any,
  index: PropTypes.any,
  selectionRequired: PropTypes.bool,
  nextPrompt: PropTypes.any,
};

export default TutorialPrompt;
