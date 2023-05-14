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
  const createGame = async () => {
    try {
      const userId = sessionStorage.getItem("userId");
      const host = new User();
      host.userId = userId;
      const isPrivate = true;

      if (gameModus === "Private") {
      const requestBody = JSON.stringify({ host, isPrivate });
      const response = await api.post("/games", requestBody);
      console.log(response);
      const game = new Game(response.data);

      console.log(game.gameId);
      history.push("/game/lobby/" + game.gameId);
      } 
      
      if (gameModus === "Public") {
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

  const handleGameModusChange = (e) => {
    setGameModus(e.target.value);
  };
 

  return (
    <BaseContainer>
      <div className="createGame container">
        <div className="createGame title-container">
          <h1 className="createGame title-lobby">    Game Settings</h1>
        
        </div>
        <div className="createGame modus-container">
          <h4>Game: </h4>
          <select value={gameModus} onChange={handleGameModusChange}>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        
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
