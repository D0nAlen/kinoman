import { render, RenderPosition } from "../utils/render.js";
import { FAVORITES_CARDS, HISTORY_CARDS, WATCHLIST_CARDS } from "../const.js";
import PopupComponent from "../components/popupCardFilm.js";
import CardFilmComponent from "../components/cardFilm.js";

const Mode = {
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
        // const oldFilmComponent = this._cardFilmComponent;
        // const oldPopupComponent = this._popupComponent;
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
            // film.addToWatchlist = !film.addToWatchlist;
            // this._onDataChange(film, WATCHLIST_CARDS, "Watchlist");
        });

        this._cardFilmComponent.setMarkAsWatchedButtonClickHandler(() => {
            // film.markAsWatched = !film.markAsWatched;
            // this._onDataChange(film, HISTORY_CARDS, "History");
        });

        this._cardFilmComponent.setMarkAsFavoriteButtonClickHandler(() => {
            // film.markAsFavorite = !film.markAsFavorite;
            // this._onDataChange(film, FAVORITES_CARDS, "Favorites");
        });

        // if (oldPopupComponent && oldFilmComponent) {
        //     replace(this._cardFilmComponent, oldFilmComponent);
        //     replace(this._popupComponent, oldPopupComponent);
        // } else {
        //     render(filmsListContainer, this._cardFilmComponent, RenderPosition.BEFOREEND);
        // }

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
            // this._film.addToWatchlist = !this._film.addToWatchlist;
            // this._onDataChange(this._film, WATCHLIST_CARDS, "Watchlist");
        });
        this._popupComponent.setMarkAsWatchedButtonClickHandler(() => {
            // this._film.markAsWatched = !this._film.markAsWatched;
            // this._onDataChange(this._film, HISTORY_CARDS, "History");
        });
        this._popupComponent.setMarkAsFavoriteButtonClickHandler(() => {
            // this._film.markAsFavorite = !this._film.markAsFavorite;
            // this._onDataChange(this._film, FAVORITES_CARDS, "Favorites");
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