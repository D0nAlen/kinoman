import AbstractComponent from "./abstract-component.js";
// import { createElement } from "./utils/render.js";

export const createNoDataFilms = () => {
  return `<h2 class="films-list__title">There are no movies in our database</h2>`;
}

export default class noDataFilmsTemplate extends AbstractComponent{
  // constructor() {
  //   this._element = null;
  // }

  getTemplate() {
    return createNoDataFilms();
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
