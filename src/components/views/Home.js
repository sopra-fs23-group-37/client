import { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { useHistory } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Home.scss";
import Game from "models/Game";
import Header from "components/views/Header";
import User from "models/User";
import { ButtonHome } from "components/ui/Button";
import sockClient from "helpers/sockClient";

const Home = () => {
  const history = useHistory();
  const [openGames, setOpenGames] = useState(0);
  const userId = sessionStorage.getItem("userId");

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

  const updateHome = (data) => {
    setOpenGames(data.numberOpenGames);
  };

  const connectToWS = () => {
    console.log("websocket status:", sockClient.isConnected());
    if (!sockClient.isConnected()) {
      console.log("Starting connection.");
      if (sockClient.addOnMessageFunction("home", updateHome)) {
        sockClient.connectFromHome(userId);
      }
    }
  };

  useEffect(() => {
    connectToWS();

    const unlisten = history.listen(() => {
      console.log("User is leaving the page");
      sockClient.disconnect();
      sockClient.removeMessageFunctions();
    });

    return () => {
      console.log("Component is unmounting");
      unlisten();
    };
  });

  return (
    <div>
      <Header />
      <BaseContainer style={{ "margin-right": "0px" }}>
        <div className="home form">
          <div className="row">
            <ButtonHome className="light">
              Open Games: <br />
              {openGames}
            </ButtonHome>
            {/* <button2>
            <u>Your Statistics:</u>
            <br />
            wins: 0
            <br />
            losses: 0
          </button2> */}
          </div>
          <div className="row" style={{ "margin-top": "20px" }}>
            <ButtonHome
              className="normal with-icon"
              onClick={() => createGame()}
            >
              Create Game
            </ButtonHome>
            {/* <button1 class="with-icon" onClick={() => lobbyBrowser()}>
            Lobby Browser
          </button1> */}
          </div>
          <div className="row" style={{ "margin-top": "20px" }}>
            <ButtonHome className="normal with-icon" onClick={() => joinGame()}>
              Join Game
            </ButtonHome>
            {/* <button1 class="with-icon" onClick={() => spectate()}>
            Spectate
          </button1> */}
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default Home;
