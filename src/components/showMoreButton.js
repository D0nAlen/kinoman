import AbstractComponent from "./abstract-component.js";

const createShowMoreButtonTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class ShowMoreButtonComponent extends AbstractComponent {
  getTemplate() {
    return createShowMoreButtonTemplate();
  }

  setShowMoreButtonClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}