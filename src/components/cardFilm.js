import { createElement } from "../utils.js";

const createCardFilmTemplate = (film) => {
  //comment - массив комментариев
  const { filmName, rating, year, duration, genre, poster, description, comment } = film;

  return `<article class="film-card">
    <h3 class="film-card__title">${filmName}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genre}</span>
    </p>
    <img src=${poster} alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${comment.length} comments</a>   
  </article>`;
};

export default class CardFilmComponent {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createCardFilmTemplate(this._film);
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
