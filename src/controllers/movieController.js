import { render, remove, RenderPosition } from "../utils/render.js";
import PopupComponent from "../components/popupCardFilm.js";
import CardFilmComponent from "../components/cardFilm.js";

export const Mode = {
    DEFAULT: `default`,
    EDIT: `edit`,
};

export default class MovieController {
    constructor(container, onDataChange, onViewChange) {
        this._container = container;
        this._onDataChange = onDataChange;
        this._onViewChange = onViewChange;

        this._cardFilmComponent = null;
        this._popupComponent = null;
        this._popup = null;
        this._film = null;
        this._mode = Mode.DEFAULT;

        this._onEscKeyDown = this._onEscKeyDown.bind(this);
    }

    // 1)почему счетчики не изменяются при изменении данных фильтов?
    render(film) {
        this._film = film;
        this._cardFilmComponent = new CardFilmComponent(this._film);
        this._popup = document.querySelector(".popup");

        render(this._container, this._cardFilmComponent, RenderPosition.BEFOREEND);

        this._cardFilmComponent.setCardFilmClickHandler(() => {
            this._onViewChange();
            this._addPopup();
        });

        this._cardFilmComponent.setAddToWatchlistButtonClickHandler(() => {
            film.isAddToWatchlist = !film.isAddToWatchlist;
        });

        this._cardFilmComponent.setMarkAsWatchedButtonClickHandler(() => {
            film.isMarkAsWatched = !film.isMarkAsWatched;
        });

        this._cardFilmComponent.setMarkAsFavoriteButtonClickHandler(() => {
            film.isMarkAsFavorite = !film.isMarkAsFavorite;
        });

    }

    setDefaultView() {
        if (this._mode !== Mode.DEFAULT) {
            this._deletePopup();
        }
    }

    destroy() {
        remove(this._cardFilmComponent);
        // remove(this._popupComponent);
        document.removeEventListener(`keydown`, this._onEscKeyDown);
    }

    _addPopup() {
        this._popupComponent = new PopupComponent(this._film);

        render(this._popup, this._popupComponent, RenderPosition.BEFOREEND);
        document.addEventListener(`keydown`, this._onEscKeyDown);

        this._popupComponent.setCloseButtonClickHandler(() => {
            this._deletePopup();
            document.removeEventListener(`keydown`, this._onEscKeyDown);
        });

        this._popupComponent.setAddToWatchlistButtonClickHandler(() => {
            this._film.isAddToWatchlist = !this._film.isAddToWatchlist;
        });
        this._popupComponent.setMarkAsWatchedButtonClickHandler(() => {
            this._film.isMarkAsWatched = !this._film.isMarkAsWatched;
        });
        this._popupComponent.setMarkAsFavoriteButtonClickHandler(() => {
            this._film.isMarkAsFavorite = !this._film.isMarkAsFavorite;
        });

        this._mode = Mode.EDIT;
    };

    _deletePopup() {
        document.removeEventListener(`keydown`, this._onEscKeyDown);
        this._popupComponent.reset();
        this._popup.replaceChildren();
        this._mode = Mode.DEFAULT;
    };

    _onEscKeyDown = (evt) => {
        const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

        if (isEscKey) {
            this._deletePopup();
            document.removeEventListener(`keydown`, this._onEscKeyDown);
        }
    };
}