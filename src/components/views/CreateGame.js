import { api, handleError } from "helpers/api";
import { Button } from "components/ui/Button";
import { useHistory } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/CreateGame.scss";
import User from "models/User";
import Game from "models/Game";
import { useState } from "react";

const CreateGame = () => {
  const history = useHistory();
  const [gameModus, setGameModus] = useState("Private");
  const [mode, setMode] = useState("Normal");

  const createGame = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const host = new User();
      host.userId = userId;
      const requestBody = JSON.stringify({ host });
      const response = await api.post("/games", requestBody);
      console.log(response);
      const game = new Game(response.data);
      console.log(game.gameId);
      history.push("/game/lobby/" + game.gameId);
    } catch (error) {
      alert(
        `Something went wrong when trying to create a game: \n${handleError(
          error
        )}`
      );
    }
  };

  const homescreen = () => {
    history.push("/game/dashboard");
  };

  const handleGameModusChange = (e) => {
    setGameModus(e.target.value);
  };
  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  return (
    <BaseContainer>
      <div className="createGame container">
        <div className="createGame title-container">
          <h1 className="createGame title">User's Lobby</h1>
          <h4 className="createGame lobby-code">
            Code: {/*TODO: function to get lobby code*/} X123
          </h4>
        </div>

        <div className="createGame subtitle-spectator-container">
          <h2 className="createGame subtitle">Players</h2>
          <h4 className="createGame spectators">
            Spectators:
            <span className="spectators-number">
              {/*TODO: function to get number of spectators*/} 0
            </span>
          </h4>
        </div>
        <div className="createGame player-container">
          <h4 className="createGame name">
            {/*TODO: display hosts username*/} My Name
          </h4>
          <h4 className="createGame host">host</h4>
        </div>
        <div className="createGame player-container">
          <h4 className="createGame name">waiting ...</h4>
          <Button className="createGame kick-player">kick player</Button>
        </div>
        <div className="createGame modus-container">
          <h4>Game: </h4>
          <select value={gameModus} onChange={handleGameModusChange}>
            <option value="Private">Private</option>
            <option value="Public">Public</option>
          </select>
        </div>
        <div className="createGame modus-container">
          <h4>Mode: </h4>
          <select value={mode} onChange={handleModeChange}>
            <option value="Private">Normal</option>
            <option value="Public">Speed</option>
          </select>
        </div>
        <div className="createGame button-container">
          <Button width="100%" onClick={() => homescreen()}>
            homepage
          </Button>
          <Button width="100%" onClick={() => createGame()}>
            Start Game
          </Button>
        </div>
      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default CreateGame;
