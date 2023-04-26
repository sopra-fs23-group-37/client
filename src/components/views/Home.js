import { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { useHistory } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Home.scss";
import Game from "models/Game";
import Header from "components/views/Header";
import User from "models/User";

const Home = () => {
  const history = useHistory();
  const [waitingGames, setWaitingGames] = useState(0);

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
      history.push("/game/lobby/" + game.gameId);
    } catch (error) {
      alert(
        `Something went wrong when trying to create a game: \n${handleError(
          error
        )}`
      );
    }
  };

  // const lobbyBrowser = () => {};

  const joinGame = async () => {
    try {
      const userId = sessionStorage.getItem("userId");
      const response = await api.put("/games/join/" + userId);
      console.log(response);

      const game = new Game(response.data);
      console.log("gameId is: ", game.gameId);
      history.push("/game/lobby/" + game.gameId);
    } catch (error) {
      alert(
        `Something went wrong when trying to join a game: \n${handleError(
          error
        )}`
      );
    }
  };

  // const spectate = () => {};

  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await api.get("/games/");
        console.log(response);
        setWaitingGames(response.data);
      } catch (error) {
        console.error(
          `Something went wrong while fetching the lobbies: \n${handleError(
            error
          )}`
        );
        console.error("Details:", error);
        alert(
          "Something went wrong while fetching the lobbies! See the console for details."
        );
      }
    }
    fetchGames();
  }, []);

  let openGames = 0;

  if (waitingGames) {
    openGames = waitingGames.length;
  }

  return (
    <div>
      <Header text="Welcome " />
      <BaseContainer className="home container">
        <div class="row">
          <button2>
            Open Games: <br />
            {openGames}
          </button2>
          {/* <button2>
            <u>Your Statistics:</u>
            <br />
            wins: 0
            <br />
            losses: 0
          </button2> */}
        </div>
        <div class="row">
          {" "}
          <button1 class="with-icon" onClick={() => createGame()}>
            Create Game
          </button1>
          {/* <button1 class="with-icon" onClick={() => lobbyBrowser()}>
            Lobby Browser
          </button1> */}
        </div>
        <div class="row">
          <button1 class="with-icon" onClick={() => joinGame()}>
            Join Game
          </button1>
          {/* <button1 class="with-icon" onClick={() => spectate()}>
            Spectate
          </button1> */}
        </div>
      </BaseContainer>
    </div>
  );
};

export default Home;
