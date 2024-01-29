import { render, RenderPosition } from "../utils/render.js";
import { FAVORITES_CARDS, HISTORY_CARDS, WATCHLIST_CARDS } from "../const.js";
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

    render(film) {
        this._film = film;

        this._cardFilmComponent = new CardFilmComponent(this._film);

        // this._popupComponent = new PopupComponent(this._film);

        this._popup = document.querySelector(".popup");

        render(this._container, this._cardFilmComponent, RenderPosition.BEFOREEND);

        this._cardFilmComponent.setCardFilmClickHandler(() => {
            this._onViewChange();
            this._addPopup();
        });

        this._cardFilmComponent.setAddToWatchlistButtonClickHandler(() => {
            film.addToWatchlist = !film.addToWatchlist;
        });

        this._cardFilmComponent.setMarkAsWatchedButtonClickHandler(() => {
            film.markAsWatched = !film.markAsWatched;
        });

        this._cardFilmComponent.setMarkAsFavoriteButtonClickHandler(() => {
            film.markAsFavorite = !film.markAsFavorite;
        });

    }

    setDefaultView() {
        if (this._mode !== Mode.DEFAULT) {
            this._deletePopup();
        }
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
            this._film.addToWatchlist = !this._film.addToWatchlist;
        });
        this._popupComponent.setMarkAsWatchedButtonClickHandler(() => {
            this._film.markAsWatched = !this._film.markAsWatched;
        });
        this._popupComponent.setMarkAsFavoriteButtonClickHandler(() => {
            this._film.markAsFavorite = !this._film.markAsFavorite;
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