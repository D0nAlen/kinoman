import { createElement } from "../../utils/render.js";
import AbstractComponent from "../abstract-component.js";

const createCommentsListTemplate = (comments) => {
  return `<section class="film-details__comments-wrap">
  <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
  </section>`;
};

export default class FilmDetailsCommentsWrapComponent extends AbstractComponent{

  constructor(comments) {
    super();
    this._comments = comments;
    this._element = null;
  }

  getTemplate() {
    return createCommentsListTemplate(this._comments);
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