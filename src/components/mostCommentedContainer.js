import AbstractComponent from "./abstract-component.js";
// import { createElement } from "../utils/render.js";

const createMostCommentedContainerTemplate = () => {
  return `<section class="films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container"></div>
    </section>
    `;
};

export default class MostCommentedContainerComponent extends AbstractComponent{
  // constructor() {
  //   this._element = null;
  // }

  getTemplate() {
    return createMostCommentedContainerTemplate();
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