import { Card } from "./Card.js";
import { openPopup } from "./Utils.js";
import { validationConfig, FormValidator } from "./FormValidator.js";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Добавляем начальные карточки

const elementContainer = document.querySelector(".elements__grid"); //ul куда записываем li элементы

// Добавление элемента
const addElement = (item) => {
  elementContainer.prepend(item);
};

// Создание элемента

function createElement(data) {
  // Создадим экземпляр карточки
  const card = new Card(data, "#elements-list");
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  addElement(cardElement);
}

// Cоздаем элементы из начального массива карточек
initialCards.forEach((item) => {
  createElement(item);
});

// Константы попапа профиля

const popupProfileOpenButton = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup-profile");
const popupProfileFormElement = document.forms["profile-form"]; // Находим по "name" среди форм, а не по всему документу
const popupProfileNameInput = popupProfileFormElement.querySelector(
  ".popup__input_type_name"
);
const popupProfileTitleInput = popupProfileFormElement.querySelector(
  ".popup__input_type_job"
);

const profileName = document.querySelector(".profile__title");
const profileTitle = document.querySelector(".profile__subtitle");

// Константы попапа "Новое место"

const popupNewPlace = document.querySelector(".popup-new-place");
const newPlaceButton = document.querySelector(".profile__add-button");
const popupNewPlaceForm = document.forms["place-form"]; // Находим по "name" среди форм, а не по всему документу
const popupPlaceNameInput = document.querySelector(".popup__input_type_place");
const popupPlaceLinkInput = document.querySelector(".popup__input_type_link");
const inputFields = Array.from(popupNewPlace.querySelectorAll(".popup__input"));
const cardSaveButton = popupNewPlace.querySelector(".popup__save-button");

// Функция закрытия всех попапов
function closePopup(item) {
  item.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEscapeButton);
}

const popupCloseButtons = document.querySelectorAll(".popup__close-button");

// Закрытие попапа нажатием на Escape

export function closePopupEscapeButton(evt) {
  // в дальнейшем импортируем в utils.js
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

// Закрытие попапа нажатием на background

const popupBackgrounds = document.querySelectorAll(".popup");

popupBackgrounds.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});

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

popupProfileOpenButton.addEventListener("click", openProfilePopup);
popupProfileFormElement.addEventListener("submit", submitPopupProfileForm);

// Второй попап - места

function openNewPlacePopup(event) {
  openPopup(popupNewPlace);
  popupNewPlaceForm.reset();
}

function addNewElement(evt) {
  evt.preventDefault();

  const elLink = popupPlaceLinkInput.value;
  const elName = popupPlaceNameInput.value;

  createElement({ link: elLink, name: elName });
  closePopup(popupNewPlace);
}

newPlaceButton.addEventListener("click", openNewPlacePopup);
popupNewPlaceForm.addEventListener("submit", addNewElement);

// Валидация первого попапа (профиль)

const popupProfileValidation = new FormValidator(
  validationConfig,
  popupProfile
);
popupProfileValidation.enableValidation();

// Валидация второго попапа (новое место)

const popupNewPlaceValidation = new FormValidator(
  validationConfig,
  popupNewPlace
);
popupNewPlaceValidation.enableValidation();
