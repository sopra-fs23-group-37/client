import PropTypes from "prop-types";
import { getAvatar } from "helpers/getAvatar";
import "styles/viewElements/inGameElements/ScoreInfo.scss";

const ScoreInfo = (props) => {
  return (
    <div className="score-info">
      <div className="player-names">
        <div className="image-container">
          <div className="image-upload">
            <img alt="Avatar" src={getAvatar(props.guestUsername)}></img>
          </div>
        </div>
        <span className="guest-name">{props.guestUsername}</span>
        <span className="points">
          <span className="guest-points">{props.guestPoints || 0}</span>
          <span className="points-divider">:</span>
          <span className="host-points">{props.hostPoints || 0}</span>
        </span>
        <span className="host-name">{props.hostUsername}</span>
        <div className="image-container">
          <div className="image-upload">
            <img alt="Avatar" src={getAvatar(props.hostUsername)}></img>
          </div>
        </div>
      </div>
    </div>
  );
};

ScoreInfo.propTypes = {
  guestPoints: PropTypes.any,
  guestUsername: PropTypes.string,
  hostPoints: PropTypes.any,
  hostUsername: PropTypes.string,
};

export default ScoreInfo;
