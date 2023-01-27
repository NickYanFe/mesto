export const validationConfig = {
  // Создаем и сразу экспортируем
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  errorClass: "popup__input-error_visible",
};

export class FormValidator {
  // Создаем и сразу экспортируем
  constructor(validationConfig, formElement) {
    this._formElement = formElement;
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._errorClass = validationConfig.errorClass;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  // Добавляем класс с ошибкой

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  // удаляем класс с ошибкой, очищаем поля

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  // Проверем валидность введенных данных - показываем/удаляем ошибку

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  // Включение/выключение кнопки submit

  // Проверяем наличие некорректных инпутов

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  // Переключаем состояние кнопки с активной на неактивную

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      // неактивная кнопка
      this._buttonElement.classList.remove(this._submitButtonSelector);
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      // активная кнопка
      this._buttonElement.classList.add(this._submitButtonSelector);
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  // Слушатели

  _setEventListeners() {
    // деактивируем кнопку при 1й загрузке сайта
    this._toggleButtonState();

    this._formElement.addEventListener("reset", () => {
      // `setTimeout` нужен для того, чтобы дождаться очищения формы (вызов уйдет в конце стэка) и только потом вызвать `toggleButtonState`
      setTimeout(() => {
        this._toggleButtonState();
      }, 0); // достаточно указать 0 миллисекунд, чтобы после `reset` уже сработало действие
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // Валидация

  enableValidation() {
    this._setEventListeners();
  }
}
