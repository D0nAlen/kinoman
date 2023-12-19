import { createElement } from "../../utils/render.js";
import AbstractComponent from "../abstract-component.js";

const createFilmDetailsCommentsList = () => {
  return `<ul class="film-details__comments-list"></ul>`;
};

export default class FilmDetailsCommentsListComponent extends AbstractComponent{
  // constructor() {
  //   this._element = null;
  // }

  getTemplate() {
    return createFilmDetailsCommentsList();
  }

  // getElement() {
  //   if (!this._element) {
  //     this._element = createElement(this.getTemplate());
  //   }
  //   return this._element;
  // }

  // removeElement() {
  //   this._element = null;
  // }
}
