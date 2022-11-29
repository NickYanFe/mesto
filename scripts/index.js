const popupButton = document.querySelector('.profile__edit-button')
const popup = document.querySelector('.popup')
const popupCloseButton = document.querySelector('.popup__close-button')

popupButton.addEventListener('click', popupOpen)
popupCloseButton.addEventListener('click', popupClose)

function popupOpen (event) {

    popup.classList.add('popup_opened')
}


function popupClose (event) {

    popup.classList.remove('popup_opened')
}

// Закрашивание кнопки лайк по клику

// const likeButton = document.querySelector('.element__like-button');
// likeButton.addEventListener('click', likeButtonBlack)

// function likeButtonBlack () {

//     likeButton.classList.add('element__like-button_active')
// }


// Находим форму в DOM
let formElement = document.querySelector('.popup__save-button') // Воспользуйтесь методом querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    let popupName = document.querySelector('.popup__field-top')
    let popupTitle = document.querySelector('.popup__field-bottom')


    // Выберите элементы, куда должны быть вставлены значения полей

    let profileName = document.querySelector('.profile__title')
    let profileTitle = document.querySelector('.profile__subtitle')

    // Вставьте новые значения с помощью textContent

    
    profileName.textContent = popupName.value
    profileTitle.textContent = popupTitle.value

    popupName.value= profileName.textContent;
    popupTitle.value= profileTitle.textContent;

    popupClose();



}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('click', handleFormSubmit); 
