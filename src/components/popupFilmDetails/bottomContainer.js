import { createElement } from "../../utils.js";

const createFormDetailsBottomContainerTemplate = () => {
    return `<div class="form-details__bottom-container"></div>`;
};


export default class FormDetailsBottomContainerComponent {
    constructor() {
      this._element = null;
    }
  
    getTemplate() {
      return createFormDetailsBottomContainerTemplate();
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
