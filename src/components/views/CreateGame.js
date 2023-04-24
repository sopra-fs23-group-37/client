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
      const userId = sessionStorage.getItem("userId");
      const host = new User();
      host.userId = userId;
      const requestBody = JSON.stringify({ host });
      const response = await api.post("/games", requestBody);
      console.log(response);
      const game = new Game(response.data);
      console.log(game.gameId);
      sessionStorage.setItem("currentPage", "Lobby");
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
          <h1 className="createGame title-lobby">Game Settings</h1>
        </div>
        <div className="createGame modus-container">
          <h4>Game: </h4>
          <select value={gameModus} onChange={handleGameModusChange}>
            <option value="Public">Public</option>
            {
              //<option value="Private">Private</option>
            }
          </select>
          Private Games will be available in the future
        </div>
        <div className="createGame modus-container">
          <h4>Mode: </h4>
          <select value={mode} onChange={handleModeChange}>
            <option value="Normal">Normal</option>
            {
              //<option value="Speed">Speed</option>
            }
          </select>
          Speed Mode will be available in the future
        </div>
        <div className="createGame button-container">
          <Button width="100%" onClick={() => homescreen()}>
            Back
          </Button>
          <Button width="100%" onClick={() => createGame()}>
            Create Game
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
