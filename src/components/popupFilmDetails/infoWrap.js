import { createElement } from "../../utils.js";
import FilmComponent from "../film.js";

const createFilmDetailsInfoWrapTemplate = (film) => {
  const getFilm = new FilmComponent(film);

  return `<div class="film-details__info-wrap">
    <div class="film-details__poster">
      <img class="film-details__poster-img" src=${getFilm.getPoster()} alt="">

      <p class="film-details__age">${getFilm.getAge()}</p>
    </div>

    <div class="film-details__info">
      <div class="film-details__info-head">
        <div class="film-details__title-wrap">
          <h3 class="film-details__title">${getFilm.getFilmName()}</h3>
          <p class="film-details__title-original">Original: ${getFilm.getOriginalFilmName()}</p>
        </div>

        <div class="film-details__rating">
          <p class="film-details__total-rating">${getFilm.getRating()}</p>
        </div>
      </div>

      <table class="film-details__table">
        <tr class="film-details__row">
          <td class="film-details__term">Director</td>
          <td class="film-details__cell">${getFilm.getDirector()}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Writers</td>
          <td class="film-details__cell">${getFilm.getWriters()}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Actors</td>
          <td class="film-details__cell">${getFilm.getActors()}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Release Date</td>
          <td class="film-details__cell">${getFilm.getReleaseDate()}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Runtime</td>
          <td class="film-details__cell">${getFilm.getDuration()}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Country</td>
          <td class="film-details__cell">${getFilm.getCountry()}</td>
        </tr>
        <tr class="film-details__row">
          <td class="film-details__term">Genres</td>
          <td class="film-details__cell">
            <span class="film-details__genre">Drama</span>
            <span class="film-details__genre">Film-Noir</span>
            <span class="film-details__genre">Mystery</span></td>
        </tr>
      </table>

      <p class="film-details__film-description">
        The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Great Flamarion (Erich von Stroheim) is an arrogant, friendless, and misogynous marksman who displays his trick gunshot act in the vaudeville circuit. His show features a beautiful assistant, Connie (Mary Beth Hughes) and her drunken husband Al (Dan Duryea), Flamarion's other assistant. Flamarion falls in love with Connie, the movie's femme fatale, and is soon manipulated by her into killing her no good husband during one of their acts.
      </p>
    </div>
  </div>
`;
};

export default class FilmDetailsInfoWrap {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createFilmDetailsInfoWrapTemplate(this._film);
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

