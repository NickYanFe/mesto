import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupFullPic = popup.querySelector(".popup-img__image");
    this._popupFigcaption = popup.querySelector(".popup-img__figcaption");
  }

  open(link, name) {
    this._popupFullPic.src = link;
    this._popupFullPic.alt = name;
    this._popupFigcaption.textContent = name;
    super.open();
  }
}
