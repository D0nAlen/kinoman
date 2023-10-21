import AbstractComponent from "./abstract-component.js";
// import { createElement } from "./utils/render.js";

const createFilmsContainerTemplate = () => {
  return `<section class="films"></section>`;
};

export default class FilmsContainerComponent extends AbstractComponent{
  // constructor() {
  //   this._element = null;
  // }

  getTemplate() {
    return createFilmsContainerTemplate();
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