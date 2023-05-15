import Card from "./Card";
import PropTypes from "prop-types";
import "styles/viewElements/inGameElements/PlayerHand.scss";

const PlayerHand = (props) => {
  let playerCards = props.cards;
  console.log("Player cards are: ", props.cards);

  return (
    <div className="playerHandContainer">
      <div className="playerHand">
        {playerCards ? (
          playerCards.map((card) => (
            <div className="card-container-hand">
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
    </div>
  );
};

PlayerHand.propTypes = {
  playerCards: PropTypes.any,
  handleClick: PropTypes.func,
};

export default PlayerHand;
