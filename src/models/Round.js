class Round {
    constructor(data = {}) {
      this.roundId = null;
      this.currentTurnPlayer = null;
      this.currentCardsOnTable = null;
      this.host = null;
      this.guest = null;
      this.cardDeck = null;
      this.roundStatus = null;
      this.hostPoints = null;
      this.guestPoints = null;
      this.lastCardGrab = null;
      Object.assign(this, data);
    }
  }
  export default Round;