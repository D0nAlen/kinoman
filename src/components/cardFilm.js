import AbstractComponent from "../components/abstract-component.js";

const createCardFilmTemplate = (film) => {
  //comment - массив комментариев

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

export default class CardFilmComponent extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createCardFilmTemplate(this._film);
  }

  setAddToWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setMarkAsWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setMarkAsFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
};
