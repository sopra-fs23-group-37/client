class Player {
    constructor(data = {}) {
      this.cardsInDiscard = null;
      this.cardsInHand = null;
      this.discardPileSize = null;
      this.handSize = null;
      this.player = null;
      this.role = null;
      Object.assign(this, data);
    }
  }
  export default Player;