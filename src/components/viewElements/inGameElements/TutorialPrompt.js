import "styles/viewElements/inGameElements/TutorialPrompt.scss";
import PropTypes from "prop-types";
import React from "react";

const TutorialPrompt = ({ text, index, selectionRequired, nextPrompt }) => {
  console.log("prompttext is ", text);
  return (
    <div className="prompt-container">
      <div className="prompt-form">
        {text ? <h1>{text[index]}</h1> : <h1> "No Prompt" </h1>}
        {!selectionRequired ? (
          <button onClick={nextPrompt}>Continue</button>
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
