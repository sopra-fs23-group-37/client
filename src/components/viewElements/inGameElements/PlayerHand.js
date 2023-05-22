import Card from "./Card";
import PropTypes from "prop-types";
import "styles/viewElements/inGameElements/PlayerHand.scss";
import CapturePile from "components/viewElements/inGameElements/CapturePile";

const PlayerHand = (props) => {
  return (
    <div className="playerHandContainer" style={{ bottom: props.playerCardsHeight }}>
      <div className="playerHand">
        {props.cards ? (
          props.cards.map((card) => (
            <div className="card-container-hand" key={card.code}>
              <Card
                key={card.code}
                code={card.code}
                suit={card.suit}
                value={card.value}
                image={card.image}
                fromField={false}
                onClick={() => props.handleClick(card)}
              />
            </div>
          ))
        ) : (
          <h1> - </h1>
        )}
      </div>
      <CapturePile discardCards={props.discardCards} lastCapCards={props.lastCapCards} />
    </div>
  );
};

PlayerHand.propTypes = {
  cards: PropTypes.any,
  discardCards: PropTypes.any,
  lastCapCards: PropTypes.any,
  handleClick: PropTypes.func,
};

export default PlayerHand;
