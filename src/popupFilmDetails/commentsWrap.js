import { createElement } from "../utils.js";

const createCommentsListTemplate = () => {
  return `<section class="film-details__comments-wrap">
  <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>
  <ul class="film-details__comments-list">  
  </ul>
  </section>`;
};

export default class FilmDetailsCommentsWrapComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createCommentsListTemplate();
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