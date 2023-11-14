import AbstractComponent from "./abstract-component.js";

export const createNoDataFilms = () => {
  return `<h2 class="films-list__title">There are no movies in our database</h2>`;
}

export default class NoDataFilmsTemplate extends AbstractComponent{

  getTemplate() {
    return createNoDataFilms();
  }
}
