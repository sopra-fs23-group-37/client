class Player {
    constructor(data = {}) {
      this.playerId = null;
      this.player = null;
      this.cardsInHand = null;
      this.cardsInDiscard = null;
      this.role = null;
      this.pointsTotalCards = null;
      this.pointClubs = null;
      this.twoOfClubs = null;
      this.tenOfDiamonds = null;
      this.totalPoints = null;
      Object.assign(this, data);
    }
  }
  export default Player;