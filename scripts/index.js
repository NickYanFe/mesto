const popupButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector(".popup");
const popupCloseButton = document.querySelector('.popup__close-button');

let popupName = document.querySelector('.popup__form_input_type_name');
let popupTitle = document.querySelector('.popup__form_input_type_job');

let profileName = document.querySelector('.profile__title');
let profileTitle = document.querySelector('.profile__subtitle');

let formElement = document.querySelector('.popup__form'); 

function popupOpen(event) {
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupTitle.value = profileTitle.textContent;
}

function closePopup(event) {
  popup.classList.remove('popup_opened');
}

// Закрашивание кнопки лайк по клику

// const likeButton = document.querySelector('.element__like-button');
// likeButton.addEventListener('click', likeButtonBlack)

// function likeButtonBlack () {

//     likeButton.classList.add('element__like-button_active')
// }


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Вставьте новые значения с помощью textContent

  profileName.textContent = popupName.value;
  profileTitle.textContent = popupTitle.value;

  //   profileName.value = popupName.value;
  //   profileTitle.Value = popupTitle.value;

  closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', handleFormSubmit);
