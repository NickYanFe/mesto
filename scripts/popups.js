const popupProfileOpenButton = document.querySelector(".profile__edit-button");

const popupProfile = document.querySelector(".popup-profile");
const popupProfileFormElement = popupProfile.querySelector(".popup__form");

const popupProfileNameInput = popupProfileFormElement.querySelector(
  ".popup__input_type_name"
);
const popupProfileTitleInput = popupProfileFormElement.querySelector(
  ".popup__input_type_job"
);

const profileName = document.querySelector(".profile__title");
const profileTitle = document.querySelector(".profile__subtitle");

// Функция открытия всех попапов

function openPopup(item) {
  item.classList.add("popup_opened"); //добавляем переданному попапу класс popup_opened
  document.addEventListener("keydown", closePopupEscapeButton);
}

// Функция закрытия всех попапов
function closePopup(item) {
  item.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEscapeButton);
}

const popupCloseButtons = document.querySelectorAll(".popup__close-button");

//закрытие попапа через поиск и нажатие ближайшей кнопки X

popupCloseButtons.forEach((xbutton) =>
  xbutton.addEventListener("click", () => {
    const popupXButton = xbutton.closest(".popup");
    closePopup(popupXButton);
  })
);

// Закрытие попапа нажатием на Escape

function closePopupEscapeButton(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

// Закрытие попапа нажатием на background

const popupBackground = document.querySelectorAll(".popup");

popupBackground.forEach((popup) => {
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

const popupNewPlace = document.querySelector(".popup-new-place");
const newPlaceButton = document.querySelector(".profile__add-button");
const popupNewPlaceForm = document.querySelector(".popup-new-place__form");
const popupPlaceNameInput = document.querySelector(".popup__input_type_place");
const popupPlaceLinkInput = document.querySelector(".popup__input_type_link");

const inputFields = Array.from(popupNewPlace.querySelectorAll(".popup__input"));
const popupSaveButton = popupNewPlace.querySelector(".popup__save-button");

function openNewPlacePopup(event) {
  openPopup(popupNewPlace);
  popupNewPlaceForm.reset();

  toggleButtonState(inputFields, popupSaveButton, validationConfig);
}

function addNewElement(evt) {
  evt.preventDefault();

  const elLink = popupPlaceLinkInput.value;
  const elName = popupPlaceNameInput.value;

  addElement(createElement(elLink, elName));
  closePopup(popupNewPlace);
}

newPlaceButton.addEventListener("click", openNewPlacePopup);
popupNewPlaceForm.addEventListener("submit", addNewElement);
