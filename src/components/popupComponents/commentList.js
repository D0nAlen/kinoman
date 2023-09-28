import { createElement } from "../../utils.js";

const createFilmDetailsCommentsList = () => {
  return `<ul class="film-details__comments-list"></ul>`;
};

export default class FilmDetailsCommentsListComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmDetailsCommentsList();
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
