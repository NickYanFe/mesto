import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popup, { handleFormSubmit }) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._form = popup.querySelector(".popup__form");
    this._inputList = popup.querySelectorAll(".popup__input");
    this._button = popup.querySelector(".popup__save-button"); 
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

 // Задаем новый текст кнопке "Сохранить"
  changeButtonText(text) {
    this._button.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
  
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
