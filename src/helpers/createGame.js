import { api, handleError } from "helpers/api";
import User from "models/User";
import Game from "models/Game";

export const createGame = async (gameMode) => {
  console.log("creating game in mode ", gameMode);
  try {
    const userId = sessionStorage.getItem("userId");
    const host = new User();
    host.userId = userId;
    const isPrivate = true;

    if (gameMode === "Private") {
      const requestBody = JSON.stringify({ host, isPrivate });
      const response = await api.post("/games", requestBody);
      console.log(response);
      const game = new Game(response.data);

      console.log(game.gameId);
      return game.gameId;
    }

    if (gameMode === "Public") {
      const isPrivate = false;
      const requestBody = JSON.stringify({ host, isPrivate });
      const response = await api.post("/games", requestBody);
      console.log(response);
      const game = new Game(response.data);

      console.log(game.gameId);
      return game.gameId;
    }
  } catch (error) {
    alert(
      `Something went wrong when trying to create a game: \n${handleError(
        error
      )}`
    );
  }
};
