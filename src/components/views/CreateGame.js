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
  const [privateGame, setPrivateGame] = useState(false);

  const createGame = async () => {
    try {
      const userId = sessionStorage.getItem("userId");
      const host = new User();
      host.userId = userId;
      const isPrivate = true;

      if (privateGame) {
      const requestBody = JSON.stringify({ host, isPrivate });
      const response = await api.post("/games", requestBody);
      console.log(response);
      const game = new Game(response.data);

      console.log(game.gameId);
      history.push("/game/lobby/" + game.gameId);
      } else {
        const isPrivate = false;
        const requestBody = JSON.stringify({ host, isPrivate });
        const response = await api.post("/games", requestBody);
        console.log(response);
        const game = new Game(response.data);
  
        console.log(game.gameId);
        history.push("/game/lobby/" + game.gameId);
      }
      
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

  const togglePrivateGame = () => {
    console.log("Log: ", privateGame);
    setPrivateGame(!privateGame);
  };
 

  return (
    <BaseContainer>
      <div className="createGame container">
        <div className="createGame form">
          <div className="title-container">
            <h1 className="title"> Game Settings </h1>
          
          </div>
          <div className="modus-container">
            <div className="description"> Game Visibility: </div>
            <div className="switch-button">
              <input className="switch-button-checkbox" type="checkbox" onClick={() => togglePrivateGame()}></input>
              <label className="switch-button-label" for=""><span class="switch-button-label-span">Public</span></label>
            </div>
          </div>
          <div className="button-container">
            <Button width="100%" onClick={() => homescreen()}>
              Back
            </Button>
            <Button width="100%" onClick={() => createGame()}>
              Create Game
            </Button>
          </div>
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
