import { Card } from "../components/Card.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  validationConfig,
  FormValidator,
} from "../components/FormValidator.js";
import { initialCards } from "../utils/InitialCards.js";
import "./index.css"; // импортируем CSS файлы перед сп=боркой вебпаком

// Добавляем начальные карточки

const elementContainer = document.querySelector(".elements__grid"); //ul куда записываем li элементы

const elementsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      elementsList.addItem(createElement({ name: item.name, link: item.link }));
    },
  },
  elementContainer
);

elementsList.renderItems();

// Константы попапа - картинка во весь экран

const popupImg = document.querySelector(".popup-img");
const popupFullPic = popupImg.querySelector(".popup-img__image");
const popupFigcaption = popupImg.querySelector(".popup-img__figcaption");
const popupWithImage = new PopupWithImage(popupImg);

// Функция открытия попапа картинки при клике на карточку

function handleCardClick(link, name) {
  popupWithImage.open(link, name);
}

popupWithImage.setEventListeners();

// Создание элемента

function createElement(item) {
  // Создадим экземпляр карточки
  const card = new Card(
    { name: item.name, link: item.link },
    "#elements-list",
    handleCardClick
  );
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();
  return cardElement;
}

// Константы попапа "Новое место"

const popupNewPlace = document.querySelector(".popup-new-place");
const newPlaceButton = document.querySelector(".profile__add-button");
const popupNewPlaceForm = document.forms["place-form"]; // Находим по "name" среди форм, а не по всему документу
const popupPlaceNameInput = document.querySelector(".popup__input_type_place");
const popupPlaceLinkInput = document.querySelector(".popup__input_type_link");

// Новый класс popupWithForm для добавления нового элемента (карточки)
const popupAddNewCard = new PopupWithForm(popupNewPlace, {
  handleFormSubmit: (item) => {
    elementsList.addItem(createElement(item));
  },
});

popupAddNewCard.setEventListeners();

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

// Новый класс userInfo с данными пользователя
const userInfo = new UserInfo({ name: profileName, hobby: profileTitle });

// Новый класс popupWithForm для редактирования профиля
const popupEditProfile = new PopupWithForm(popupProfile, {
  handleFormSubmit: (userData) => {
    userInfo.setUserInfo(userData);
  },
});
popupEditProfile.setEventListeners();

// Слушатель кнопки открытия попапа редактирования профиля

popupProfileOpenButton.addEventListener("click", () => {
  const { name, hobby } = userInfo.getUserInfo();

  popupProfileNameInput.value = name;
  popupProfileTitleInput.value = hobby;

  popupEditProfile.open();
});

// Слушатель кнопки открытия попапа добавления нового элемента (карточки)

newPlaceButton.addEventListener("click", function () {
  popupAddNewCard.open();
});

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
