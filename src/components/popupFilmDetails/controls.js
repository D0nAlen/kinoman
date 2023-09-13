import { createElement } from "../../utils.js";

const createFilmDetailsControlsTemplate = () =>{
    return `<section class="film-details__controls">
    <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
    <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

    <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
    <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

    <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
    <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
    </section>`;
};


export default class FilmDetailsControlsComponent {
    constructor() {
      this._element = null;
    }
  
    getTemplate() {
      return createFilmDetailsControlsTemplate();
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
  }