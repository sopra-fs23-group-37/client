import PropTypes from "prop-types";
import "styles/viewElements/inGameElements/OpponentLastCapture.scss";

const OpponentLastCapture = (props) => {
  return (
    <div className="opponent-discards">
      <div className="cards">
        {props.cards ? (
          props.cards.map((e, i) => (
            <div className="card-container-opponent-discard" key={e.code}>
              <img src={e.image} className="cardo" alt="e.code" />
            </div>
          ))
        ) : (
          <h1> - </h1>
        )}
      </div>
      {props.cards?.length > 0 ? (
        <h2 className="container-title"> Opponent's last capture </h2>
      ) : (
        <h1></h1>
      )}
    </div>
  );
};

OpponentLastCapture.propTypes = {
  cards: PropTypes.any,
};

export default OpponentLastCapture;
