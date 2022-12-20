const popupProfileOpenButton = document.querySelector('.profile__edit-button');

const popupProfile = document.querySelector('.popup-profile');
const formElement = popupProfile.querySelector('.popup__form');

const popupProfileNameInput = formElement.querySelector(
  '.popup__input_type_name'
);
const popupProfileTitleInput = formElement.querySelector(
  '.popup__input_type_job'
);

const profileName = document.querySelector('.profile__title');
const profileTitle = document.querySelector('.profile__subtitle');

// Функция открытия всех попапов

function openPopup(item) {
  item.classList.add('popup_opened'); //добавляем всем попапам класс popup_opened
}

// Функция закрытия всех попапов
function closePopup(item) {
  item.classList.remove('popup_opened');
}

const popupCloseButtons = document.querySelectorAll('.popup__close-button');

//закрытие попапа через поиск и нажатие ближайшей кнопки X

popupCloseButtons.forEach((xbutton) =>
  xbutton.addEventListener('click', () => {
    const popupXButton = xbutton.closest('.popup');
    closePopup(popupXButton);
  })
);

// Первый попап - Имя/занятия

function openProfilePopup() {
  openPopup(popupProfile);

  popupProfileNameInput.value = profileName.textContent;
  popupProfileTitleInput.value = profileTitle.textContent;
}

function submitPopupProfileForm(evt) {
  evt.preventDefault();

  profileName.textContent = popupProfileNameInput.value;
  profileTitle.textContent = popupProfileTitleInput.value;

  closePopup(popupProfile);
}

popupProfileOpenButton.addEventListener('click', openProfilePopup);
formElement.addEventListener('submit', submitPopupProfileForm);

// Второй попап - места

const popupNewPlace = document.querySelector('.popup-new-place');
const newPlaceButton = document.querySelector('.profile__add-button');
const popupElementForm = document.querySelector('.popup-new-place__form');
const popupPlaceNameInput = document.querySelector('.popup__input_type_place');
const popupPlaceLinkInput = document.querySelector('.popup__input_type_link');

function openNewPlacePopup(event) {
  openPopup(popupNewPlace);

  popupElementForm.reset();
}

function addNewElement(evt) {
  evt.preventDefault();

  const elLink = popupPlaceLinkInput.value;
  const elName = popupPlaceNameInput.value;

  addElement(createElement(elLink, elName));
  closePopup(popupNewPlace);
}

newPlaceButton.addEventListener('click', openNewPlacePopup);
popupElementForm.addEventListener('submit', addNewElement);
