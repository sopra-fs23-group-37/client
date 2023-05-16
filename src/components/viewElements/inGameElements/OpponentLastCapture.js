import PropTypes from "prop-types";
import "styles/viewElements/inGameElements/OpponentLastCapture.scss";

const OpponentLastCapture = (props) => {
  return (
    <div className="opponent-discards">
      {props.cards ? (
        props.cards.map((e, i) => (
          <img src={e.image} className="cardback" key={e.code} alt="e.code" />
        ))
      ) : (
        <h1> - </h1>
      )}
      <h2 className="container-title"> Opponent's last capture </h2>
    </div>
  );
};

OpponentLastCapture.propTypes = {
  cards: PropTypes.any,
};

export default OpponentLastCapture;
