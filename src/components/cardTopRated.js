import { createElement } from "../utils.js";
import FilmComponent from "./film.js";

const createCardTopRatedTemplate = (film) => {
  const getFilm = new FilmComponent(film);

    return `<article class="film-card">
    <h3 class="film-card__title">${getFilm.getFilmName()}</h3>
    <p class="film-card__rating">${getFilm.getRating()}</p>
    <p class="film-card__info">
      <span class="film-card__year">${getFilm.getYear()}</span>
      <span class="film-card__duration">${getFilm.getDuration()}</span>
      <span class="film-card__genre">${getFilm.getGenre()}</span>
    </p>
    <img src=${getFilm.getPoster()} alt="" class="film-card__poster">
    <p class="film-card__description">${getFilm.getDescription()}</p>
    <a class="film-card__comments">${getFilm.getComment().length} comments</a>
   
  </article>
  `;
};

export default class CardTopRatedComponent {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createCardTopRatedTemplate(this._film);
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
};
