export class Section {
  constructor({ items, renderer }, container) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = container;
  }

  renderItems() {
    this._initialArray.forEach((item) => this._renderer(item));
  }

  // Добавление элемента

  addItem(element) {
    this._container.prepend(element);
  }
}
