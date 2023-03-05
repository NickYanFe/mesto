import { PopupDeleteCard } from "../components/PopupDeleteCard.js";
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
import { Api } from "../components/Api.js";

const config = {
  baseURL: "https://mesto.nomoreparties.co/v1/cohort-60/",
  headers: {
    authorization: "d2dcd824-54c6-405c-a2b8-915a4a5b4711",
    "Content-Type": "application/json",
  },
};

// Добавляем начальные карточки

const elementContainer = document.querySelector(".elements__grid"); //ul куда записываем li элементы

const api = new Api(config);

let userId;

Promise.all([api.getUserInfo(), api.handleGetCards()]).then((responses) => {
  const userData = responses[0];
  const cardList = responses[1];

  userInfo.setUserInfo(userData);
  userInfo.setUserInfoAvatar(userData);
  // userInfo.getUserId(userData._id);

  userId = userData._id;
  elementsList.renderItems(cardList);
});

const elementsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      elementsList.addItem(createElement(item));
    },
  },
  elementContainer
);

// Константы попапа - картинка во весь экран

const popupImg = document.querySelector(".popup-img");
const popupFullPic = popupImg.querySelector(".popup-img__image");
const popupFigcaption = popupImg.querySelector(".popup-img__figcaption");

// Попап картинки на весь экран

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
    item,
    "#elements-list",
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
    userId
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
  handleFormSubmit: (name, link) => {
    popupAddNewCard.changeButtonText("Сохранение...");

    api
      .handleCreateCard(name, link)
      .then((res) => {
        const newCard = createElement(res);
        elementsList.addItem(newCard);
        popupAddNewCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAddNewCard.changeButtonText("Создать");
      });
  },
});

popupAddNewCard.setEventListeners();

// Новый класс PopupDeleteCard для удаления элемента (карточки)

const popupDeleteElement = document.querySelector(".popup-delete-card");
const confirmDeleteElementButton = popupDeleteElement.querySelector(
  ".popup-delete-button"
);
const popupDeleteCard = new PopupDeleteCard(popupDeleteElement, (card) => {
  popupDeleteCard.changeButtonText("Удаление...");
  api
    .handleRemoveCard(card._id)
    .then(() => {
      card.handleRemoveCard();
      popupDeleteCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupDeleteCard.changeButtonText("Да");
    });
});

popupDeleteCard.setEventListeners();

// Открытие попапа подтверждения удаления элемента (карточки)

function handleDeleteClick(card, id) {
  popupDeleteCard.open(card, id);
}

// Функция упправления лайками

function handleLikeClick(card) {
  if (card.isLike) {
    api
      .handleLikeRemove(card._id)
      .then((res) => {
        card.postLikes(res.likes);
        card.toggleIsLike();
        card.toggleLike();
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .handleLikeAdd(card._id)
      .then((res) => {
        card.postLikes(res.likes);
        card.toggleIsLike();
        card.toggleLike();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

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

const avatarPhoto = document.querySelector(".profile__logo");

// Новый класс userInfo с данными пользователя

const userInfo = new UserInfo({
  name: profileName,
  about: profileTitle,
  avatar: avatarPhoto,
});

// Новый класс popupWithForm для редактирования профиля

const popupEditProfile = new PopupWithForm(popupProfile, {
  handleFormSubmit: (data) => {
    popupEditProfile.changeButtonText("Сохранение...");
    api
      .setUserInfo(data)
      .then((res) => {
        userInfo.setUserInfo(res, {
          name: popupProfileNameInput,
          about: popupProfileTitleInput,
        });
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditProfile.changeButtonText("Сохранить");
      });
  },
});
popupEditProfile.setEventListeners();

// Слушатель кнопки открытия попапа редактирования профиля

popupProfileOpenButton.addEventListener("click", () => {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
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

// Новый класс PopupWithForm для обновления аватара

// Константы попапа аватара

const popupEditAvatar = document.querySelector(".popup-avatar");
const popupAvatarOpenButton = document.querySelector(
  ".profile__logo-edit-button"
);
const popupAvatarFormElement = document.forms["#avatar-form"]; // Находим по "name" среди форм, а не по всему документу
const popupAvatarLinkInput = popupEditAvatar.querySelector(
  ".popup-avatar__link-input"
);
const saveNewAvatarButton = popupEditAvatar.querySelector(
  ".popup-update-avatar"
);
const avatarLink = document.querySelector(".popup-avatar__form");

const popupUpdateAvatar = new PopupWithForm(popupEditAvatar, {
  handleFormSubmit: (data) => {
    popupUpdateAvatar.changeButtonText("Сохранение...");
    api
      .setUserAvatar(data)
      .then((res) => {
        userInfo.setUserInfoAvatar(res, { avatar: popupAvatarLinkInput });
        popupUpdateAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupUpdateAvatar.changeButtonText("Сохранить");
      });
  },
});

popupUpdateAvatar.setEventListeners();

// Валидация попапа смены аватара

const popupAvatarValidation = new FormValidator(
  validationConfig,
  popupEditAvatar
);
popupAvatarValidation.enableValidation();

// Слушатель кнопки открытия попапа редактирования аватара

popupAvatarOpenButton.addEventListener("click", () => {
  popupUpdateAvatar.open();
});
