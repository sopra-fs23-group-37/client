import PropTypes from "prop-types";
import loadingGif from "image/loading.gif";
import "styles/viewElements/inGameElements/TurnInfo.scss";

const TurnInfo = (props) => {
  return (
    <div className="turn-info-container">
      {props.myTurn && (
        <div className="turn-info-form-myTurn">
          <div className="description"> Your turn </div>
        </div>
      )}
      {!props.myTurn && (
        <div className="turn-info-form-oppTurn">
          <div className="description"> Opponent's turn </div>
          <img src={loadingGif} alt="Loading..." className="loading-gif" />
        </div>
      )}
    </div>
  );
};

TurnInfo.propTypes = {
  myTurn: PropTypes.bool,
};

export default TurnInfo;
