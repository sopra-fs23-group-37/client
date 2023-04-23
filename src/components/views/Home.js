import { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { useHistory } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Home.scss";
import Game from "models/Game";
import Header from "components/views/Header";

const Home = () => {
  const history = useHistory();
  const [waitingLobbies, setWaitingLobbies] = useState(0);

  const createLobby = () => {
    history.push("/game/createGame");
  };

  const lobbyBrowser = () => {};

  const joinLobby = async () => {
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

  const spectate = () => {};

  useEffect(() => {
    async function fetchLobbies() {
      try {
        const response = await api.get("/games/");
        console.log(response);
        setWaitingLobbies(response.data);
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
    fetchLobbies();
  }, []);

  let openLobbies = 0;

  if (waitingLobbies) {
    openLobbies = waitingLobbies.length;
  }

  return (
    <div>
      <Header text="Welcome " />
      <BaseContainer className="home container">
        <div class="row">
          <button2>
            Open Lobbies: <br />
            {openLobbies}
          </button2>
          <button2>
            <u>Your Statistics:</u>
            <br />
            wins: 0
            <br />
            losses: 0
          </button2>
        </div>
        <div class="row">
          {" "}
          <button1 class="with-icon" onClick={() => createLobby()}>
            Create Lobby
          </button1>
          <button1 class="with-icon" onClick={() => lobbyBrowser()}>
            Lobby Browser
          </button1>
        </div>
        <div class="row">
          <button1 class="with-icon" onClick={() => joinLobby()}>
            Join Lobby
          </button1>
          <button1 class="with-icon" onClick={() => spectate()}>
            Spectate
          </button1>
        </div>
      </BaseContainer>
    </div>
  );
};

export default Home;
