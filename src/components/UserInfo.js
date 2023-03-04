export class UserInfo {
  constructor({ name, about, avatar, _id }) {
    this._profileName = name;
    this._profileTitle = about;
    this._avatarPhoto = avatar;
    this._id = _id;
  }

  getUserInfo() {
    const userData = {
      name: this._profileName.textContent,
      about: this._profileTitle.textContent,
      avatar: this._avatarPhoto.src,
    };
    return userData;
  }

  getUserId() {
    return this._id;
  }

  setUserInfo(userData) {
    this._profileName.textContent = userData.name;
    this._profileTitle.textContent = userData.about;
  }

  setUserInfoAvatar(data) {
    this._avatarPhoto.src = data.avatar;
  }
}
