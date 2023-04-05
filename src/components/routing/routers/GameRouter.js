import { Redirect, Route } from "react-router-dom";
import Game from "components/views/Game";
import PropTypes from "prop-types";
import Profile from "../../views/Profile";
import ProfileEdit from "../../views/ProfileEdit";
import CreateGame from "components/views/CreateGame";
import Lobby from "components/views/Lobby";

const GameRouter = (props) => {
  /**
   * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
   */
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Route exact path={`${props.base}/dashboard`}>
        <Game />
      </Route>
      <Route exact path={`${props.base}`}>
        <Redirect to={`${props.base}/dashboard`} />
      </Route>
      <Route path={`${props.base}/profile/:profileId`}>
        <Profile />
      </Route>
      <Route path={`${props.base}/profile-edit/:profileId`}>
        <ProfileEdit />
      </Route>
      <Route path={`${props.base}/creategame`}>
        <CreateGame />
      </Route>
      <Route path={`${props.base}/lobby/:gameId`}>
        <Lobby />
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
