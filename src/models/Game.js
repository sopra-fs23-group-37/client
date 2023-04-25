class Game {
  constructor(data = {}) {
    this.gameId = null;
    this.hostId = null;
    this.guestId = null;
    this.hostUsername = null;
    this.guestUsername = null;
    this.hostStatus = null;
    this.guestStatus = null;
    this.winnerId = null;
    this.winnerUsername = null;
    this.gameStatus = null;
    Object.assign(this, data);
  }
}
export default Game;
