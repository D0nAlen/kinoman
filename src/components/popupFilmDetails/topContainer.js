import { createElement } from "../../utils.js";

const createFormDetailsTopContainerTemplate = () => {
    return `<div class="form-details__top-container"></div>`;
};


export default class FormDetailsTopContainerComponent {
    constructor() {
      this._element = null;
    }
  
    getTemplate() {
      return createFormDetailsTopContainerTemplate();
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