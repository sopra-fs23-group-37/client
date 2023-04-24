import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { getDomain } from "helpers/getDomain";

class SockClient {
  constructor() {
    this._connected = false;
  }

  isConnected() {
    return this._connected;
  }

  connect(gameId, callback) {
    // close the existing connection if there already is one
    try {
      this.sock.close();
    } catch {}

    // set up new sock to the current domain
    this.sock = new SockJS(`${getDomain()}/websocket`);
    this.stompClient = Stomp.over(this.sock);

    // connect
    this.stompClient.connect({}, () => {
      this._connected = true;
      this.stompClient.subscribe("/topic/game/" + gameId, function (data) {
        callback(JSON.parse(data.body));
      });
    });
  }

  joinGame(gameId, playerId) {
    this.stompClient.send(
      "/game/join/" + gameId,
      {},
      JSON.stringify({ playerId })
    );
  }

  startGame(gameId) {
    this.stompClient.send("/game/start/" + gameId, {});
  }
}

export default new SockClient();
