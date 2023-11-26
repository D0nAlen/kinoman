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

    <form class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
  </form>
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

  setAddToWatchlistButtonClickHandler() {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, () => {
        console.log("add-to-watchlist");
      });
  }

  setMarkAsWatchedButtonClickHandler() {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, () => {
        console.log("mark-as-watched");
      });
  }

  setMarkAsFavoriteButtonClickHandler() {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, () => {
        console.log("favorite");
      });
  }
};
