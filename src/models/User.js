/**
 * User model
 */
class User {
  constructor(data = {}) {
    // this.id = null;
    // this.name = null;
    this.username = null;
    this.password = null;
    this.token = null;
    this.status = null;
    this.birthday = null;
    this.creation_date = null;
    this.userId = null;
    this.avatarUrl = null;
    this.gamesPlayed = null;
    this.gamesWon = null;
    Object.assign(this, data);
  }
}
export default User;
