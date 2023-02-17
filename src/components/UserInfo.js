export class UserInfo {
  constructor({ name, hobby }) {
    this._profileName = name;
    this._profileTitle = hobby;
  }

  getUserInfo() {
    const userData = {
      name: this._profileName.textContent,
      hobby: this._profileTitle.textContent,
    };
    return userData;
  }

  setUserInfo(userData) {
    const { name, hobby } = userData;
    this._profileName.textContent = name;
    this._profileTitle.textContent = hobby;
  }
}
