const popupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector(".popup");
const popupCloseButton = document.querySelector('.popup__close-button');

let popupName = document.querySelector('.popup__input_type_name');
let popupTitle = document.querySelector('.popup__input_type_job');

let profileName = document.querySelector('.profile__title');
let profileTitle = document.querySelector('.profile__subtitle');

let formElement = document.querySelector('.popup__form'); 


// Первый попап - Имя/занятия


function openPopup(event) {
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupTitle.value = profileTitle.textContent;
}

function closePopup(event) {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault(); 

  profileName.textContent = popupName.value;
  profileTitle.textContent = popupTitle.value;

  closePopup();
}

popupButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', handleFormSubmit);

// Второй попап - места

const popupNewPlace = document.querySelector('.popup__new-place')
const newPlaceButton = document.querySelector('.profile__add-button')

function openNewPlacePopup(event) {
  popupNewPlace.classList.add('popup__new-place_opened');
  }

function closeNewPlacePopup(event) {
  popupNewPlace.classList.remove('popup__new-place_opened');
  
}

newPlaceButton.addEventListener('click', openNewPlacePopup);
popupCloseButton.addEventListener('click', closePopup);

// initialCards.forEach((name, link) => {
//   renderElement(name, link)
//  })

// Третий попап - картинка во весь экран

const popupFullPic = document.querySelector('.popup-img')
const fullPicButton = document.querySelector('.popup__fp-button')

function openFullPicPopup(event) {
  popupFullPic.classList.add('popup_opened');
  }

  console.log(openFullPicPopup)
  
function closeNewPlacePopup(event) {
  popupFullPic.classList.remove('popup__full-picture_opened');
}

fullPicButton.addEventListener('click', openFullPicPopup);

// Закрываем все попапы

popupCloseButton.addEventListener('click', closePopup);


// Закрашивание кнопки лайк по клику

const elementPlace = document.querySelector('.element');
const likeButton = document.querySelector('.element__like-button');
  // likeButton.addEventListener('click', likeButtonBlack)

  likeButton.addEventListener('click', function (evt) {
evt.target.classList.toggle('element__like-button_active')

console.log(evt)

  } )

 // Удаление карточки

// const elementItem = document.querySelector('.element').cloneNode(true)
const removeButton = document.querySelector('.element__delete-button')

const removeElement = () => {
elementPlace.remove()
}
 removeButton.addEventListener('click', removeElement)

// попап "Изображение во весь экран"

// const popupFullPicture = document.querySelector('.popup__full-picture')


