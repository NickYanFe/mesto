import { Popup } from "./Popup.js";

export class PopupDeleteCard extends Popup {
  constructor(popup, handleDeleteFormSubmit) {
    super(popup);
    this._handleDeleteFormSubmit = handleDeleteFormSubmit.bind(this);
    this._popupDeleteElement = document.querySelector(".popup-delete-card");
    this._confirmDeleteElementButton = this._popupDeleteElement.querySelector(
      ".popup-delete-button"
    );
    this._button = popup.querySelector(".popup__save-button"); //находим кнопку сохранения popup
  }

  // Задаем новый текст кнопке "Сохранить"
  changeButtonText(text) {
    this._button.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleDeleteFormSubmit(this._card);
    });
  }

  open(card, id) {
    super.open();
    this._card = card;
    this._id = id;
  }
}
