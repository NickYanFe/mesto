const popupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector(".popup");
const formElement = document.querySelector('.popup__form'); 

let popupName = formElement.querySelector('.popup__input_type_name');
let popupTitle = formElement.querySelector('.popup__input_type_job');

let profileName = document.querySelector('.profile__title');
let profileTitle = document.querySelector('.profile__subtitle');





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
const popupElementForm = document.querySelector('.popup__new-place-form')

const elementImage = document.querySelector('.element__image') //уже заданы в темплейте, потом удалить
const elementTitle = document.querySelector('.element__title') //уже заданы в темплейте, потом удалить

const popupPlace = document.querySelector('.popup__input_type_place');
const popupLink = document.querySelector('.popup__input_type_link');

function openNewPlacePopup(event) {
  openPopup(popupNewPlace);

  popupPlace.value = '';
 popupLink.value = '';
 }


function addNewElement(evt) {
evt.preventDefault(); 

elementImage.src = popupLink.value;
elementImage.alt = popupPlace.value;
elementTitle.textContent = popupPlace.value;

   closePopup(popupNewPlace);

}

newPlaceButton.addEventListener('click', openNewPlacePopup);
popupElementForm.addEventListener('submit', addNewElement)

// Третий попап - картинка во весь экран

const popupImg = document.querySelector('.popup-img')
const fullPicButton = document.querySelector('.popup__fp-button')
const popupFullPic= document.querySelector('.popup-img__image')
const popupFigcaption = document.querySelector('.popup-img__figcaption')

function openFullPicPopup(event) {

popupFullPic.src = elementImage.src
popupFigcaption.textContent = elementTitle.textContent

  openPopup(popupImg)
  }

fullPicButton.addEventListener('click', openFullPicPopup);

