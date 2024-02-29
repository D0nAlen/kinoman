import {FilterType} from "../const.js";
import { getFilmsByFilter } from "../utils/filter.js";

export default class MoviesModel {

    constructor() {
        this._films = [];
        this._activeFilterType = FilterType.ALL;

        this._dataChangeHandlers = [];
        this._filterChangeHandlers = [];

        this._comments = [];
    }

    getFilms() {
        return getFilmsByFilter(this._films, this._activeFilterType);
    }

    getFilmsAll() {
        return this._films;
    }

    setFilms(films) {
        this._films = Array.from(films);
        this._callHandlers(this._dataChangeHandlers);
    }

    setFilter(filterType) {
        this._activeFilterType = filterType;
        this._callHandlers(this._filterChangeHandlers);
      }

    updateFilm(id, film) {
        const index = this._films.findIndex((it) => it.id === id);

        if (index === -1) {
            return false;
        }

        this._films = [].concat(this._films.slice(0, index), film, this._films.slice(index + 1));

        this._callHandlers(this._dataChangeHandlers);

        return true;
    }

    setFilterChangeHandler(handler) {
        this._filterChangeHandlers.push(handler);
      }

    setDataChangeHandler(handler) {
        this._dataChangeHandlers.push(handler);
    }

    _callHandlers(handlers) {
        handlers.forEach((handler) => handler());
    }


    addComment(comment) {
        this._comments = [].concat(comment, this._comments);
        this._callHandlers(this._dataChangeHandlers);
      }
}