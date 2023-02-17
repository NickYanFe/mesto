import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }

  open(link, name) {
    // this._popupImg = document.querySelector(".popup-img");
    this._popupFullPic = document.querySelector(".popup-img__image");
    this._popupFigcaption = document.querySelector(".popup-img__figcaption");

    this._popupFullPic.src = link;
    this._popupFullPic.alt = name;
    this._popupFigcaption.textContent = name;
    super.open();
  }
}
