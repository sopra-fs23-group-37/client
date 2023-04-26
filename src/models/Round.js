class Round {
  constructor(data = {}) {
    // status
    this.roundStatus = null;

    // players points
    this.myPointsTotalCards = null;
    this.myPointClubs = null;
    this.myTwoOfClubs = null;
    this.myTenOfDiamonds = null;
    this.myTotalPoints = null;

    // opponent points
    this.oppPointsTotalCards = null;
    this.oppPointClubs = null;
    this.oppTwoOfClubs = null;
    this.oppTenOfDiamonds = null;
    this.oppTotalPoints = null;

    // cards
    this.myCardsInHand = null;
    this.myCardsInDiscard = null;
    this.oppCards = null;
    this.oppCardsInDiscard = null;
    this.cardsOnTable = null;
    this.deckCards = null;

    // turn
    this.myTurn = null;

    // manage player leaving
    this.opponentLeft = null;
    this.opponentLeftReason = null;

    Object.assign(this, data);
  }
}

export default Round;
