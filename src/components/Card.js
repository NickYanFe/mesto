export class Card {
  constructor(
    data,
    template,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
    userId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._isLike = false;
    this._likes = data.likes;
    this._element = this._getTemplate();
    this._likesCounter = this._element.querySelector(".element__like-counter");
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
  }

  // // Функция удаления карточки
  handleRemoveCard() {
    this._element.remove();
    this._element = null;
  }

  _getTemplate() {
    const elementTemplate = document
      .querySelector(this._template)
      .content.querySelector(".element")
      .cloneNode(true);

    return elementTemplate;
  }

  generateCard() {
    // Добавляем данные
    this._elementImage = this._element.querySelector(".element__image");

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;
    this._likesCounter.textContent = this._likes.length;

    // Кнопка удаления карточки
    this._cardDeleteButton = this._element.querySelector(
      ".element__delete-button"
    );

    // Управление кнопкой даления элемента
    if (this._userId !== this._ownerId) {
      this._cardDeleteButton.remove();
    }

    // Кнопка лайк
    this._likeButton = this._element.querySelector(".element__like-button");

    // Проверка лайка карточки
    if (this._likes.some((item) => item._id === this._userId)) {
      this._likeButton.classList.add("element__like-button_active");
      this._isLike = true;
    }

    // Кнопка открытия попапа картинки на весь экран
    this._fullPicturePopupButton =
      this._element.querySelector(".popup__fp-button");

    this._setEventListeners(); // Активируем слушатели на карточке

    // Возвращаем готовую карточку
    return this._element;
  }

  // связь isLike() из index.js
  get isLike() {
    return this._isLike;
  }

  // Получение и присвоение количества лайков счетчику лайков
  getLikes(likes) {
    this._likes = likes;
    this._likesCounter.textContent = this._likes.length;
  }

  // "Закрашивание" кнопки лайк при нажатии
  toggleLike() {
    this._likeButton.classList.toggle("element__like-button_active");
  }

  // Переключатель "булевых" значений
  toggleIsLike() {
    this._isLike = !this._isLike;
  }

  // Удаление карточки
  handleDeleteElement() {
    this._element.remove();
  }

  // Слушатели

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this, this._id);
    });

    // Открытие попапа картинки на весь экран
    this._fullPicturePopupButton.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name); // обработчик открытия попапа на весь экран функции HandleCardClick
    });

    // Удаление карточки
    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this, this._id);
    });
  }
}

///////////////// Проектная работа 9 ///////////////////////

// Открыть попап удаления карточки

// // Новый класс popupWithForm для удаления элемента (карточки)
// const popupDeleteElement = document.querySelector(".popup-delete-card");

// const popupDeleteCard = new PopupWithForm(popupDeleteElement, {
//   handleFormSubmit: (item) => {
//     elementsList.addItem(createElement(item));
//   },
// });
