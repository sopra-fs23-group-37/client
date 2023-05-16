import { Redirect, Route } from "react-router-dom";
import Home from "components/views/Home";
import PropTypes from "prop-types";
import Lobby from "components/views/Lobby";
import GameScreen from "components/views/GameScreen";
import Tutorial from "components/views/Tutorial";

const GameRouter = (props) => {
  /**
   * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
   */
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Route exact path={`${props.base}/dashboard`}>
        <Home />
      </Route>
      <Route exact path={`${props.base}`}>
        <Redirect to={`${props.base}/dashboard`} />
      </Route>
      <Route path={`${props.base}/lobby/:gameId`}>
        <Lobby />
      </Route>
      <Route path={`${props.base}/play/:gameId`}>
        <GameScreen />
      </Route>
      <Route path={`${props.base}/tutorial`}>
        <Tutorial />
      </Route>
    </div>
  );
};
/*
 * Don't forget to export your component!
 */

GameRouter.propTypes = {
  base: PropTypes.string,
};

export default GameRouter;
