import { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import { Button } from "components/ui/Button";
import { Link, useHistory } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";

const Game = () => {
  // use react-router-dom's hook to access the history

  return (
    <BaseContainer className="game container">
      <div class="row">
        <button>Matchmaking Lobbies: </button>
        <p>Your Statistics</p>
      </div>
      <div class="row">
        {" "}
        <button class="with-icon">Create Lobby</button>
        <button class="with-icon">Lobby Browser</button>
      </div>
      <div class="row">
        <button class="with-icon">Join Lobby</button>
        <button class="with-icon">Spectate</button>
      </div>
    </BaseContainer>
  );
};

export default Game;
