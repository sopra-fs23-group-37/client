import PropTypes from "prop-types";
import noAvatar from "image/noAvatar.png";
import "styles/viewElements/inGameElements/ScoreInfo.scss";

const ScoreInfo = (props) => {
  return (
    <div className="score-info">
      <div className="player-names">
        <div className="image">
          <div className="image-upload">
            {props.guestAvatarUrl && (
              <img alt="Avatar" src={props.guestAvatarUrl}></img>
            )}
            {!props.guestAvatarUrl && <img alt="Avatar" src={noAvatar}></img>}
          </div>
        </div>
        <span className="guest-name">{props.guestUsername}</span>
        <span className="points">
          <span className="guest-points">{props.guestPoints || 0}</span>
          <span className="points-divider">:</span>
          <span className="host-points">{props.hostPoints || 0}</span>
        </span>
        <span className="host-name">{props.hostUsername}</span>
        <div className="image">
          <div className="image-upload">
            {props.hostAvatarUrl && (
              <img alt="Avatar" src={props.hostAvatarUrl}></img>
            )}
            {!props.hostAvatarUrl && <img alt="Avatar" src={noAvatar}></img>}
          </div>
        </div>
      </div>
    </div>
  );
};

ScoreInfo.propTypes = {
  guestAvatarUrl: PropTypes.string,
  guestPoints: PropTypes.any,
  guestUsername: PropTypes.string,
  hostAvatarUrl: PropTypes.string,
  hostPoints: PropTypes.any,
  hostUsername: PropTypes.string,
};

export default ScoreInfo;
