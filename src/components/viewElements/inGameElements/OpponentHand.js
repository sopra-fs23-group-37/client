import PropTypes from "prop-types";
import "styles/viewElements/inGameElements/OpponentHand.scss";

const OpponentHand = (props) => {
  return (
    <div className="opponent-cards">
      {props.cards ? (
        [...Array(props.cards)].map((e, i) => (
          <div className="card-container-opponent" >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/54/Card_back_06.svg"
              className="cardback"
              key={i}
              alt="Back of Card"
            />
          </div>
        ))
      ) : (
        <h1> - </h1>
      )}
    </div>
  );
};

OpponentHand.propTypes = {
  cards: PropTypes.any,
};

export default OpponentHand;
