import AbstractComponent from "../abstract-component.js";

const createGenreTemplate = (genre) => {
    return `<span class="film-details__genre">${genre}</span>`;
}

export default class GenreTemplateComponent extends AbstractComponent {
    constructor(genre) {
      super();
      this._genre = genre;
    }
  
    getTemplate() {
      return createGenreTemplate(this._genre);
    }
  };
  