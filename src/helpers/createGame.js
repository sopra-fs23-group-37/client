import { api, handleError } from "helpers/api";
import User from "models/User";
import Game from "models/Game";

export const createGame = async (isPrivate, isSingleRound) => {
  console.log("creating game in private mode ", isPrivate);

  try {
    const userId = sessionStorage.getItem("userId");
    const host = new User();
    host.userId = userId;
    const requestBody = JSON.stringify({ host, isPrivate, isSingleRound });
    console.log("Create game request body: ", requestBody);
    const response = await api.post("/games", requestBody);
    console.log(response);
    const game = new Game(response.data);

    console.log(game.gameId);
    return game.gameId;
  } catch (error) {
    alert(
      `Something went wrong when trying to create a game: \n${handleError(
        error
      )}`
    );
  }
};
