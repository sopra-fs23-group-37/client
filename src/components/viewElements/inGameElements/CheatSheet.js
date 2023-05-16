import "styles/viewElements/inGameElements/CheatSheet.scss";
import { useState } from "react";
import PropTypes from "prop-types";
import cheatSheet from "image/Sheet.png";

const CheatSheet = () => {
  const [rulebookVisible, setRulebookVisible] = useState(false);
  return (
    <div className="rulebook-container-gs">
      <button
        className="round-button"
        onClick={() => setRulebookVisible(!rulebookVisible)}
      >
        ?
      </button>
      {rulebookVisible && (
        <div
          className="rulebook-overlay"
          onClick={() => setRulebookVisible(false)}
        >
          <img className="rulebook-image" src={cheatSheet} alt="" />
        </div>
      )}
    </div>
  );
};

CheatSheet.propTypes = {
  setRulebookVisible: PropTypes.func,
  rulebookVisible: PropTypes.bool,
};

export default CheatSheet;
