
const validationConfig= {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  errorClass: 'popup__input-error_visible'
};


//  const form = document.querySelector('.popup__form');
//  const nameInput = document.querySelector('#name');
//  const linkInput = document.querySelector('#link');

//    evt.preventDefault();
//    console.log({
//      place: nameInput.value,
//     link: linkInput.value,
//   })


//  form.addEventListener('submit', handleSubmit);

// Добавляем класс с ошибкой

function showInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  
// удаляем класс с ошибкой, очищаем поля (????)

function hideInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
   
   }

// Проверем валидность введенных данных - показываем/удаляем ошибку

function checkInputValidity(formElement, inputElement, config) {
    if (inputElement.validity.valid) {
      hideInputError(formElement, inputElement, config);
    } else {
      showInputError(formElement, inputElement, config);
    }
  }

// Добавляем слушатели на поля ввода
function setEventListeners (formElement, config) {
const inputList = Array.from(formElement.querySelectorAll(config.inputSelector))
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
    checkInputValidity(formElement, inputElement, config);
})
})
}

// Проверяем валидность всех форм

function enableValidation (config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  
  formList.forEach((formElement) => {
      setEventListeners(formElement, config)
    })
  
  }

enableValidation(validationConfig);