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
  
  
  
  const elementPopupButton = document.querySelector('.popup__fp-button')
  const elementImage = document.querySelector('.element__image')
  const elementTitle = document.querySelector('.element__title')
  const elementDeleteButton = document.querySelector('.element__delete-button')
  const elementLikeButton = document.querySelector('.element__like-button')
  
  
  const defaultElement = initialCards.map(function (item) {
    return {
      name: item.name,
      link: item.link,
    };
  });
  
  const createElement = (elLink, elName) => {
  const elementTemplate = document.querySelector('#elements-list').content;
  const elementItem = elementTemplate.content.querySelector('.element').cloneNode(true);
  
  elementImage.src = elLink;
  elementImage.alt = elName;
  elementTitle.textContent = elName;
  
  
  
  // elementDeleteButton.addEventListener('click', () => {
  //   elementItem.remove();
  // });
  
  // Закрашивание кнопки лайк по клику
  
    elementLikeButton.addEventListener('click', function (evt) {
  evt.target.classList.toggle('element__like-button_active')
  
    })
  
  // Удаление карточки
  
  //  elementDeleteButton.addEventListener('click', () => {
  //   elementItem.remove()
  //  })
  
  
  
  return elementItem;
  
  }
  console.log(elementItem)
  
  // const renderTodo = (elements) => {
  // elementContainer.prepend(createElement(elementName))
  // }
  // elementContainer.append(...initialCards.map(createElement))
  
  // renderTodo(elements)
  
  
  
  
  
  