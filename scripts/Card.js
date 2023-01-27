// Импортируем функцию открытия попапа

import { openPopup } from "./Utils.js";

// создаем и сразу экспортируем класс Card

export class Card {
  constructor(data, template) {
    this._name = data.name;
    this._link = data.link;
    this._template = template;
  }

  // Функция открытия попапа "Картинка во весь экран"

  _handleOpenPopup() {
    // Константы попапа - картинка во весь экран
    const popupImg = document.querySelector(".popup-img");
    const popupFullPic = popupImg.querySelector(".popup-img__image");
    const popupFigcaption = popupImg.querySelector(".popup-img__figcaption");

    openPopup(popupImg);

    popupFullPic.src = this._link;
    popupFullPic.alt = this._alt;
    popupFigcaption.textContent = this._name;
    popupImg.classList.add("popup_opened");
  }

  // Функция удаления карточки
  _handleRemoveCard() {
    this._element.remove();
  }

  _getTemplate() {
    const elementTemplate = document
      .querySelector(this._template)
      .content.querySelector(".element")
      .cloneNode(true);

    return elementTemplate;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._setEventListeners(); // Активируем слушатели на карточке

    // Добавляем данные
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__title").textContent = this._name;
    this._element.querySelector(".element__image").alt = this._alt;

    // Возвращаем готовую карточку
    return this._element;
  }

  // Кнопка лайк
  _likeButtonClick() {
    this._element
      .querySelector(".element__like-button")
      .classList.toggle("element__like-button_active");
  }

  // Слушатели

  _setEventListeners() {
    // Кнопка лайк
    this._element
      .querySelector(".element__like-button")
      .addEventListener("click", () => {
        this._likeButtonClick();
      });

    // Открытие попапа картинки на весь экран
    this._element
      .querySelector(".popup__fp-button")
      .addEventListener("click", () => {
        this._handleOpenPopup(); // обработчик открытия попапа на весь экран
      });

    // Удаление карточки
    this._element
      .querySelector(".element__delete-button")
      .addEventListener("click", () => {
        this._handleRemoveCard();
      });
  }
}
