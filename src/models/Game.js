class Game {
  constructor(data = {}) {
    this.gameId = null;
    this.gameStatus = null;
    this.guestId = null;
    this.guestPoints = null;
    this.guestStatus = null;
    this.guestUsername = null;
    this.guestAvatarUrl = null;
    this.hostId = null;
    this.hostPoints = null;
    this.hostStatus = null;
    this.hostUsername = null;
    this.hostAvatarUrl = null;
    this.winnerId = null;
    this.winnerUsername = null;
    this.isPrivate = null;
    this.isSingleRound = null;
    Object.assign(this, data);
  }
}
export default Game;
