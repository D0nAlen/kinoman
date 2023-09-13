import { createElement } from "../utils.js";


export default class PopupCardFilmComponent {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createRenderPopupFilm(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
};