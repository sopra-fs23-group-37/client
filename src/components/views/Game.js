import { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import { Button } from "components/ui/Button";
import { Link, useHistory } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import Header from "./Header";

const Game = () => {
  const [lobby, setLobby] = useState(0);

  const getLobbies = () => {};

  const createLobby = () => {};

  const lobbyBrowser = () => {};

  const joinLobby = () => {};

  const spectate = () => {};

  return (
    <BaseContainer className="game container">
      <div class="row">
        <button2>
          Matchmaking Lobbies: <br /> {lobby}
        </button2>
        <button2>
          <u>Your Statistics</u>
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
  );
};

export default Game;
