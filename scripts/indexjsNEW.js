const popupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector(".popup");


let popupName = document.querySelector('.popup__input_type_name');
let popupTitle = document.querySelector('.popup__input_type_job');

let profileName = document.querySelector('.profile__title');
let profileTitle = document.querySelector('.profile__subtitle');

let formElement = document.querySelector('.popup__form'); 



// Функция открытия всех попапов

function openPopup(item) {
    item.classList.add('popup_opened'); //добавляем всем попапам класс popup_opened
}

// Функция закрытия всех попапов
function closePopupWindow(item) {
    item.classList.remove('popup_opened'); //удаляем у всех попапов класс popup_opened
};

const popupCloseButtons = document.querySelectorAll('.popup__close-button');

//закрытие попапа через поиск и нажатие ближайшей кнопки X

popupCloseButtons.forEach(xbutton => xbutton.addEventListener('click', () => {
    const popupXButton = xbutton.closest('.popup');
    closePopupWindow(popupXButton);
}));


// Закрытие попапа после заполнения/сохранения формы
function closePopup(item) {
    item.classList.remove('popup_opened');
  }

// Первый попап - Имя/занятия

const popupProfile = document.querySelector('.popup_profile');

function ProfilePopup(event) {
  openPopup(popupProfile);

  popupName.value = profileName.textContent;
  popupTitle.value = profileTitle.textContent;
}

function handleFormSubmit(evt) {
  evt.preventDefault(); 

  profileName.textContent = popupName.value;
  profileTitle.textContent = popupTitle.value;

  closePopup(popupProfile);
}

popupButton.addEventListener('click', ProfilePopup);
formElement.addEventListener('submit', handleFormSubmit);

// Второй попап - места

const popupNewPlace = document.querySelector('.popup__new-place')
const newPlaceButton = document.querySelector('.profile__add-button')

function openNewPlacePopup(event) {
  openPopup(popupNewPlace);
  

//   popupName.value = profileName.textContent;
//   popupTitle.value = profileTitle.textContent;
// }

// function handleFormSubmit(evt) {
//   evt.preventDefault(); 

//   profileName.textContent = popupName.value;
//   profileTitle.textContent = popupTitle.value;

//   closePopup(openNewPlacePopup);
}

newPlaceButton.addEventListener('click', openNewPlacePopup);


// Третий попап - картинка во весь экран

const popupFullPic = document.querySelector('.popup-img')
const fullPicButton = document.querySelector('.popup__fp-button')

function openFullPicPopup(event) {
  openPopup(popupFullPic)
  }

fullPicButton.addEventListener('click', openFullPicPopup);


