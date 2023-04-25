class PlayingCard {
    constructor(data = {}) {
      this.code = null;
      this.image = null;
      this.images = null;
      this.value = null;
      this.suit = null;
      Object.assign(this, data);
    }
  }
  export default PlayingCard;