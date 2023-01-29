// Создаем и сразу экспортируем функцию создания попапа (в дальнейшем экспортируем ее в Card.js)
function openPopup(item) {
  item.classList.add("popup_opened"); //добавляем переданному попапу класс popup_opened
  document.addEventListener("keydown", closePopupEscapeButton);
}

// Закрытие попапа нажатием на Escape

function closePopupEscapeButton(evt) {
  // в дальнейшем импортируем в utils.js
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

// Функция закрытия всех попапов
function closePopup(item) {
  item.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEscapeButton);
}

export { openPopup, closePopup };
