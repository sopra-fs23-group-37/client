import React from 'react';
import "styles/views/EndOfTutorial.scss";

const EndOfTutorial = ({ time, onEndTutorial }) => {

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
      
        const minuteText = minutes > 0 ? `${minutes} Minute${minutes > 1 ? 's' : ''} and` : '';
        const secondText = seconds > 0 ? ` ${seconds} Second${seconds > 1 ? 's' : ''}` : '';
      
        return `${minuteText}${secondText}`;
      };

  return (
    <div className="end-of-tutorial">
      <h1>End of Tutorial</h1>
      <h2>The tutorial took you <p>{formatTime(time)}</p></h2>
        <div className="endTutorial-button-container">
        <button className="endTutorial-button" onClick={ onEndTutorial}>
          Leave tutorial
        </button>
      </div>
    </div>
  );
};

export default EndOfTutorial;