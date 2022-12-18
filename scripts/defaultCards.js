 const initialCards = [ 
  {
     name: 'Архыз',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
   {
     name: 'Челябинская область',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
   },
   {
     name: 'Иваново',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
   },
   {
     name: 'Камчатка',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
   },
   {
     name: 'Холмогорский район',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
   },
   {
     name: 'Байкал',
     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
   }
 ]; 

const elementContainer = document.querySelector('.elements__grid') //ul


// const elementPopupButton = document.querySelector('.popup__fp-button')
// const elementImage = document.querySelector('.element__image')
// const elementTitle = document.querySelector('.element__title')
// const elementDeleteButton = document.querySelector('.element__delete-button')
// const elementLikeButton = document.querySelector('.element__like-button')


const defaultElement = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link,
  };
});

// function render() {initialCards.forEach(defaultElement)}


const createElement = (elLink, elName) => {
const elementTemplate = document.querySelector('#elements-list');
const elementItem = elementTemplate.content.querySelector('.element').cloneNode(true);

elementItem.querySelector('.element__image').src = elLink;
elementItem.querySelector('.element__title').alt = elName;
elementItem. querySelector('.element__title').textContent = elName;

// Кнопка "удалить"

elementItem.querySelector('.element__delete-button').addEventListener('click', () => {
  elementItem.remove();
 });

// Закрашивание кнопки лайк по клику

elementItem.querySelector.addEventListener('click', function (evt) {
evt.target.classList.toggle('element__like-button_active')

  })

  // Третий попап - картинка во весь экран

//    const popupFullPic = document.querySelector('.popup-img')
//   const fullPicButton = document.querySelector('.popup__fp-button')

//  function openFullPicPopup(event) {
//    popupFullPic.classList.add('popup_opened');
//    }
//    fullPicButton.addEventListener('click', openFullPicPopup);

// // return createElement

}
 // Add new element

 const addElement = (newElement) => {
   elementContainer.prepend(newElement);
 };
