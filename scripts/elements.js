// Задаем начальный мессив карточек (при открытии сайта)

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const elementContainer = document.querySelector('.elements__grid'); //ul куда записываем li элементы

const defaultElement = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link,
  };
});

const elementTemplate = document
  .querySelector('#elements-list')
  .content.querySelector('.element');

const createElement = (elLink, elName) => {
  const elementItem = elementTemplate.cloneNode(true);
  const elementDeleteButton = elementItem.querySelector(
    '.element__delete-button'
  );
  const elementLikeButton = elementItem.querySelector('.element__like-button');
  const elementImage = elementItem.querySelector('.element__image');
  const elementTitle = elementItem.querySelector('.element__title');
  const fullPicButton = elementItem.querySelector('.popup__fp-button');

  // Константы попапа - картинка во весь экран

  const popupImg = document.querySelector('.popup-img');
  const popupFullPic = popupImg.querySelector('.popup-img__image');
  const popupFigcaption = popupImg.querySelector('.popup-img__figcaption');

  elementImage.src = elLink;
  elementImage.alt = elName;
  elementTitle.textContent = elName;

  // Закрашивание кнопки лайк по клику

  elementLikeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });

  // Удаление карточки

  elementDeleteButton.addEventListener('click', () => {
    elementItem.remove();
  });

  // Попап картинка на весь экран

  fullPicButton.addEventListener('click', () => {
    popupFullPic.src = elLink;
    popupFullPic.alt = elName;
    popupFigcaption.textContent = elName;

    openPopup(popupImg);
  });

  return elementItem;
};

// Добавление нового элемента

const addElement = (newElement) => {
  elementContainer.prepend(newElement);
};

initialCards.forEach((item) => {
  addElement(createElement(item.link, item.name));

});


