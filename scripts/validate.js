const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  errorClass: "popup__input-error_visible",
};

// Добавляем класс с ошибкой

function showInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.classList.add(config.errorClass);
  errorElement.textContent = inputElement.validationMessage;
}

// удаляем класс с ошибкой, очищаем поля

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
}

// Проверем валидность введенных данных - показываем/удаляем ошибку

function checkInputValidity(formElement, inputElement, config) {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, config);
  } else {
    showInputError(formElement, inputElement, config);
  }
}
// Проверяем валидность всех форм

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

// Включение/выключение кнопки submit

// Проверяем наличие некорректных инпутов

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

// Переключаем состояние кнопки с активной на неактивную

function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    // неактивная кнопка
    buttonElement.classList.remove(config.submitButtonSelector);
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    // активная кнопка
    buttonElement.classList.add(config.submitButtonSelector);
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

// Проверка корректности полей формы

function setEventListeners(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  // деактивируем кнопку при 1й загрузке сайта
  toggleButtonState(inputList, buttonElement, config);

  formElement.addEventListener("reset", () => {
    // `setTimeout` нужен для того, чтобы дождаться очищения формы (вызов уйдет в конце стэка) и только потом вызвать `toggleButtonState`
    setTimeout(() => {
      toggleButtonState(inputList, buttonElement, config);
    }, 0); // достаточно указать 0 миллисекунд, чтобы после `reset` уже сработало действие
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);

      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

enableValidation(validationConfig);
