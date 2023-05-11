import { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { useHistory } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Home.scss";
import Game from "models/Game";
import Header from "components/views/Header";
import User from "models/User";
import { ButtonHome, ButtonLight } from "components/ui/Button";
import sockClient from "helpers/sockClient";
import PropTypes from "prop-types";

const FormField = (props) => {
  return (
      <input
        className="home input"
        placeholder="enter code..."
        maxLength="6"
        onChange={(e) => props.onChange(e.target.value)}
      />
  );
};

FormField.propTypes = {
  onChange: PropTypes.func,
};

const Home = () => {
  const history = useHistory();
  const [openGames, setOpenGames] = useState(0);
  const [userGamesWon, setUserGamesWon] = useState(0);
  const [userGamesPlayed, setUserGamesPlayed] = useState(0);
  const userId = sessionStorage.getItem("userId");
  const [showModal, setShowModal] = useState(false);
  const username = sessionStorage.getItem("username");
  const [gameCode, setGameCode] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);

  const createGame = async () => {
    try {
      const userId = sessionStorage.getItem("userId");
      const host = new User();
      host.userId = userId;
      const isPrivate = true;
      const requestBody = JSON.stringify({ host, isPrivate });
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

  const showPrompt = () => {
    const newUser = sessionStorage.getItem("newUser");

    if (newUser === "true") {
      setShowModal(true);
    }
  };

  const handleConfirm = () => {
    history.push("/rulebook");
    sessionStorage.setItem("newUser", "false");
    setShowModal(false);
  };

  const handleCancel = () => {
    sessionStorage.setItem("newUser", "false");
    setShowModal(false);
  };
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

  const joinGameByCode = async () => {
    try {
      const userId = sessionStorage.getItem("userId");
      const response = await api.put("/games/" + gameCode + "/join/" + userId);
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

  const updateHome = (data) => {
    setOpenGames(data.numberOpenGames);
  };

  const connectToWS = () => {
    console.log("websocket status:", sockClient.isConnected());
    if (!sockClient.isConnected()) {
      console.log("Starting connection.");
      if (
        sockClient.addOnMessageFunction("home", updateHome) &&
        sockClient.addOnMessageFunction("statistics", updateUserStatistics)
      ) {
        sockClient.connectFromHome(userId);
      }
    }
  };

  const updateUserStatistics = (data) => {
    console.log("Received user statistics: ", data);
    setUserGamesPlayed(data.gamesPlayed);
    setUserGamesWon(data.gamesWon);
  };

  const showCodeInputToggle = event => {
    if (event.target === event.currentTarget) {
      setShowCodeInput(false);
    }
  }

  useEffect(() => {
    connectToWS();
    showPrompt();
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
          {showModal && (
            <div className="modal">
              <div className="modal-content">
              <h1 className="modal-title">Welcome {username} to 2-and-10!</h1>
              <p>Would you like some guidance on how to play this game?</p>
              <p>You can also access the rulebook from the Home page at any time.</p>
              <button onClick={handleConfirm}>Yes</button>
              <button onClick={handleCancel}>No</button>
            </div>
          </div>
        )}
        {showCodeInput && (
          <div className="code-input" onClick={showCodeInputToggle}>
            <div className="code-input-form">
              <FormField className="code-input-form-field"
                onChange={(n) => setGameCode(n)}>
              </FormField>
              <ButtonLight className="code-input-button"
                disabled={gameCode.length != 6}
                onClick={() => joinGameByCode()}>
                Enter
              </ButtonLight>
            </div>
          </div>
        )}
          <div className="row">
            <ButtonHome className="light">
              Open Games: <br />
              {openGames}
            </ButtonHome>
            {
              <ButtonHome className="light">
                <div className="text-layout">
                  Games played: {userGamesPlayed} <br />
                  Games won: {userGamesWon}
                </div>
              </ButtonHome>
            }
          </div>
          <div className="row" style={{ "margin-top": "20px" }}>
            <ButtonHome
              className="normal with-icon"
              onClick={() => createGame()}
            >
              Create Game
            </ButtonHome>
            <ButtonHome
              className="normal with-icon"
              onClick={() => setShowCodeInput(true)}
            >
              Enter Code
            </ButtonHome>
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
