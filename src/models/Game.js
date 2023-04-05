class Game {
  constructor(data = {}) {
    this.gameId = null;
    this.host = null;
    this.guest = null;
    this.hostStatus = null;
    this.guestStatus = null;
    this.winner = null;
    this.createdDate = null;
    this.gameStatus = null;
    Object.assign(this, data);
  }
}
export default Game;
