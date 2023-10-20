import AbstractComponent from "./abstract-component.js";
// import { createElement } from "./utils/render.js";

const createCardMostCommentedTemplate = (film) => {

  return `<article class="film-card">
    <h3 class="film-card__title">${film.filmName}</h3>
    <p class="film-card__rating">${film.rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${film.year}</span>
      <span class="film-card__duration">${film.duration}</span>
      <span class="film-card__genre">${film.genres.join(", ")}</span>
    </p>
    <img src=${film.poster} alt="" class="film-card__poster">
    <p class="film-card__description">${film.description}</p>
    <a class="film-card__comments">${film.comment.length} comments</a>
  </article>`;
};

export default class CardMostCommentedComponent extends AbstractComponent{
  constructor(film) {
    super();
    this._film = film;
    // this._element = null;
  }

  getTemplate() {
    return createCardMostCommentedTemplate(this._film);
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
};
