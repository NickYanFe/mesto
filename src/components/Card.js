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

    // Добавляем данные
    this._elementImage = this._element.querySelector(".element__image");

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;

    this._element.querySelector(".element__title").textContent = this._name;

    // Кнопка лайк
    this._likeButton = this._element.querySelector(".element__like-button");

    // Кнопка удаления карточки
    this._cardDeleteButton = this._element.querySelector(
      ".element__delete-button"
    );

    // Кнопка открытия попапа картинки на весь экран
    this._fullPicturePopupButton =
      this._element.querySelector(".popup__fp-button");

    this._setEventListeners(); // Активируем слушатели на карточке

    // Возвращаем готовую карточку
    return this._element;
  }

  // Работа Кнопки лайк
  _toggleLike() {
    this._likeButton.classList.toggle("element__like-button_active");
  }

  // Слушатели

  _setEventListeners() {
    // Переключение "лайка" по клику
    this._likeButton.addEventListener("click", () => {
      this._toggleLike();
    });

    // Открытие попапа картинки на весь экран
    this._fullPicturePopupButton.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name); // обработчик открытия попапа на весь экран функции HandleCardClick
    });

    // Удаление карточки
    this._cardDeleteButton.addEventListener("click", () => {
      this._handleRemoveCard();
    });
  }
}
