class TutorialStep {
  constructor(data = {}) {
    this.game = null;
    this.round = null;
    this.prompt = null;
    this.selectionRequired = null;
    this.selectableCardsTable = null;
    this.selectedCardsTable = null;
    this.selectableCardHand = null;
    this.finished = null;
    Object.assign(this, data);
  }
}
export default TutorialStep;
