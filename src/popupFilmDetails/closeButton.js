import { createElement } from "../utils.js";

const createFilmDetailsCloseButtonTemplate = () => {
  return `<div class="film-details__close">
  <button class="film-details__close-btn" type="button">close</button>
  </div>`;
};

export default class FilmDetailsCloseButtonComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmDetailsCloseButtonTemplate();
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
}