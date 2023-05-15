import React from "react";
import "styles/viewElements/endElements/EndOfTutorial.scss";

const EndOfTutorial = ({ onEndTutorial }) => {
  return (
    <div className="end-of-tutorial">
      <h1>End of Tutorial</h1>
      <h2>Now you are ready to play a real 1-vs-1 game!</h2>
      <div className="endTutorial-button-container">
        <button className="endTutorial-button" onClick={onEndTutorial}>
          Leave tutorial
        </button>
      </div>
    </div>
  );
};

export default EndOfTutorial;
