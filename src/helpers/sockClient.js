import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { getDomain } from "helpers/getDomain";

class SockClient {
  constructor() {
    this._connected = false;
    this._onMessageFunctions = {};
  }

  isConnected() {
    return this._connected;
  }

  async connectAndJoin(gameId, playerId) {
    // close the existing connection if there already is one

    try {
      this.sock.close();
    } catch {}

    // set up new sock to the current domain
    this.sock = new SockJS(`${getDomain()}/websocket`);
    this.stompClient = Stomp.over(this.sock);

    // connect and subscribe
    this.stompClient.connect({}, (frame) => {
      console.log("Connected: " + frame);
      this.stompClient.subscribe("/topic/game/" + gameId + "/*", (response) => {
        this.topicHandleResponseByChannel(response);
      });
      this.stompClient.subscribe(
        "/queue/user/" + playerId + "/*",
        (response) => {
          this.queueHandleResponseByChannel(response);
        }
      );
      this.stompClient.send(
        "/game/join/" + gameId,
        {},
        JSON.stringify({ playerId })
      );
    });
    this._connected = true;
  }

  startGame(gameId, playerId) {
    this.stompClient.send(
      "/game/start/" + gameId,
      {},
      JSON.stringify({ playerId })
    );
  }

  addOnMessageFunction(page, onMessagefunction) {
    if (!this._onMessageFunctions.hasOwnProperty(page)) {
      this._onMessageFunctions[page] = [];
      this._onMessageFunctions[page].push(onMessagefunction);
      console.log("added message function", this._onMessageFunctions);
    }
    return "succesfull";
  }

  checkOnMessageFunction(page) {
    if (this.onMessagefunction.hasOwnProperty(page)) {
      return true;
    } else return false;
  }

  topicHandleResponseByChannel(response) {
    let data = JSON.parse(response.body);
    console.log("data received: ", data);

    let channel = response.headers.destination.replace(/.+\/game\/.+\//i, "");
    console.log("on channel: ", channel);

    if (!this._onMessageFunctions.hasOwnProperty(channel)) {
      console.log("no onMessage function defined for this channel");
    }

    for (let messageFunction of this._onMessageFunctions[channel]) {
      console.log("invoking message function for channel ", channel);
      messageFunction(data);
    }
  }

  queueHandleResponseByChannel(response) {
    let data = JSON.parse(response.body);
    console.log("data received: ", data);

    let channel = response.headers.destination.replace(/.+\/user\/.+\//i, "");
    console.log("on channel: ", channel);

    if (!this._onMessageFunctions.hasOwnProperty(channel)) {
      console.log("no onMessage function defined for this channel");
    }

    for (let messageFunction of this._onMessageFunctions[channel]) {
      console.log("invoking message function for channel ", channel);
      messageFunction(data);
    }
  }

  disconnect() {
    this.stompClient.disconnect();
    this._connected = false;
    console.log("websocket disconnected, websocket status:", this._connected);
  }

  removeMessageFunctions() {
    this._onMessageFunctions = {};
    console.log("All message functions removed.");
  }

  sendMove(gameId, playerMoveMessage) {
    this.stompClient.send(
      "/game/move/" + gameId,
      {},
      JSON.stringify({ playerMoveMessage })
    );
  }
}

export default new SockClient();