import PropTypes from "prop-types";
import loadingGif from "image/loading.gif";
import "styles/viewElements/inGameElements/TurnInfo.scss";

const TurnInfo = (props) => {
  return (
    <div className="turn-info-container">
      <div className="turn-info-form">
        <h1>{props.myTurn ? "Your turn" : "Opponent's turn"}</h1>
        {!props.myTurn && (
          <img src={loadingGif} alt="Loading..." className="loading-gif" />
        )}
      </div>
    </div>
  );
};

TurnInfo.propTypes = {
  myTurn: PropTypes.bool,
};

export default TurnInfo;
