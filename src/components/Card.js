export class Card {
  constructor(data, template, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._template = template;
    this._handleCardClick = handleCardClick;
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
    this._elementImage = this._element.querySelector(".element__image");

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;

    this._element.querySelector(".element__title").textContent = this._name;

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
        this._handleCardClick(); // обработчик открытия попапа на весь экран функции HandleCardClick
      });

    // Удаление карточки
    this._element
      .querySelector(".element__delete-button")
      .addEventListener("click", () => {
        this._handleRemoveCard();
      });
  }
}
