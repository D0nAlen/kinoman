import AbstractComponent from "./abstract-component.js";

const createFilmsContainerTemplate = () => {
  return `<section class="films"></section>`;
};

export default class FilmsContainerComponent extends AbstractComponent{

  getTemplate() {
    return createFilmsContainerTemplate();
  }
}