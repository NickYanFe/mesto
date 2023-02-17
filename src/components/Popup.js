export class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  // Открытие попапа
  open() {
    this._popup.classList.add("popup_opened"); //добавляем переданному попапу класс popup_opened
    document.addEventListener("keydown", this._handleEscClose);
  }

  // Закрытие попапа
  close() {
    this._popup.classList.remove("popup_opened"); //удаляем у переданного попапа класс popup_opened
    document.removeEventListener("keydown", this._handleEscClose);
  }

  // Закрытие попапа нажатием на Escape
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  // Слушатели

  setEventListeners() {
    // Закрытие попапа нажатием на крестик
    this._popupCloseButton = this._popup.querySelector(".popup__close-button");
    this._popupCloseButton.addEventListener("click", () => this.close());

    // Закрытие попапа нажатием на background
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }
    });
  }
}
