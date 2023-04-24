class Round {
  constructor(data = {}) {
    this.cardDeck = null;
    this.currentTurnPlayer = null;
    this.guest = null;
    this.guestPoints = null;
    this.host = null;
    this.hostPoints = null;
    this.lastCardGrab = null;
    this.roundId = null;
    this.roundStatus = null;
    this.cardsOnTable = null;
    Object.assign(this, data);
  }
}
export default Round;
