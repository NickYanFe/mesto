import { Card } from "./Card.js";
import { openPopup, closePopup } from "./Utils.js";
import { validationConfig, FormValidator } from "./FormValidator.js";
import { initialCards } from "./InitialCards.js";

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
// const inputFields = Array.from(popupNewPlace.querySelectorAll(".popup__input"));
// const cardSaveButton = popupNewPlace.querySelector(".popup__save-button");

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
