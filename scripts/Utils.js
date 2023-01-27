// Импортируем кнопку закрытия попапа по Esc
import { closePopupEscapeButton } from "./index.js";

// Создаем и сразу экспортируем функцию создания попапа (в дальнейшем экспортируем ее в Card.js)
export function openPopup(item) {
  item.classList.add("popup_opened"); //добавляем переданному попапу класс popup_opened
  document.addEventListener("keydown", closePopupEscapeButton);
}
