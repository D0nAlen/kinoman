import { render, RenderPosition } from "../utils/render.js";
import { FAVORITES_CARDS, HISTORY_CARDS, WATCHLIST_CARDS } from "../const.js";
import PopupComponent from "../components/popupCardFilm.js";
import CardFilmComponent from "../components/cardFilm.js";

// 1)this._container - нужен или нет? (в pageController запись о рефакторинге)
// 2)+добавлены старый и новый компонент - интегрировать!!!
export default class MovieController {
    constructor(container, onDataChange) {
        this._container = container;
        this._onDataChange = onDataChange;

        this._cardFilmComponent = null;
        this._popupComponent = null;
        this._popup = null;
        this._film = null;

        this._onEscKeyDown = this._onEscKeyDown.bind(this);
    }

    render(film, filmsListContainer) {


        // const oldFilmComponent = this._cardFilmComponent;
        // const oldPopupComponent = this._popupComponent;
        this._film = film;

        this._cardFilmComponent = new CardFilmComponent(this._film);
        // this._popupComponent = new PopupComponent(this._film);

        this._popup = document.querySelector(".popup");

        render(filmsListContainer, this._cardFilmComponent, RenderPosition.BEFOREEND);


        this._cardFilmComponent.setCardFilmClickHandler(() => {
            this._addPopup();
        });

        this._cardFilmComponent.setAddToWatchlistButtonClickHandler(() => {
            film.addToWatchlist = !film.addToWatchlist;
            this._onDataChange(film, WATCHLIST_CARDS, "Watchlist");
        });

        this._cardFilmComponent.setMarkAsWatchedButtonClickHandler(() => {
            film.markAsWatched = !film.markAsWatched;
            this._onDataChange(film, HISTORY_CARDS, "History");
        });

        this._cardFilmComponent.setMarkAsFavoriteButtonClickHandler(() => {
            film.markAsFavorite = !film.markAsFavorite;
            this._onDataChange(film, FAVORITES_CARDS, "Favorites");
        });

        // if (oldPopupComponent && oldFilmComponent) {
        //     replace(this._cardFilmComponent, oldFilmComponent);
        //     replace(this._popupComponent, oldPopupComponent);
        // } else {
        //     render(filmsListContainer, this._cardFilmComponent, RenderPosition.BEFOREEND);
        // }

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
            this._onDataChange(this._film, WATCHLIST_CARDS, "Watchlist");
        });

        this._popupComponent.setMarkAsWatchedButtonClickHandler(() => {
            this._film.markAsWatched = !this._film.markAsWatched;
            this._onDataChange(this._film, HISTORY_CARDS, "History");
        });
        this._popupComponent.setMarkAsFavoriteButtonClickHandler(() => {
            this._film.markAsFavorite = !this._film.markAsFavorite;
            this._onDataChange(this._film, FAVORITES_CARDS, "Favorites");
        });

        // this._popupComponent.setEmotionButtonClickHandler();
    };

    _deletePopup() {
        this._popup.replaceChildren();
    };

    _onEscKeyDown = (evt) => {

        const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

        if (isEscKey) {
            document.removeEventListener(`keydown`, this._onEscKeyDown);
            this._deletePopup();
        }
    };
}