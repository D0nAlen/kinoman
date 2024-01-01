import { render, RenderPosition } from "../utils/render.js";
import { FAVORITES_CARDS, HISTORY_CARDS, WATCHLIST_CARDS } from "../const.js";
import PopupComponent from "../components/popupCardFilm.js";
import CardFilmComponent from "../components/cardFilm.js";

const Mode = {
    DEFAULT: `default`,
    EDIT: `edit`,
};

// 1)this._container - нужен или нет? (в pageController запись о рефакторинге)
// 2)+добавлены старый и новый компонент - интегрировать!!!
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

    render(film, filmsListContainer) {


        // const oldFilmComponent = this._cardFilmComponent;
        // const oldPopupComponent = this._popupComponent;
        this._film = film;

        this._cardFilmComponent = new CardFilmComponent(this._film);
        // this._popupComponent = new PopupComponent(this._film);

        this._popup = document.querySelector(".popup");

        render(filmsListContainer, this._cardFilmComponent, RenderPosition.BEFOREEND);


        this._cardFilmComponent.setCardFilmClickHandler(() => {
            // this._onViewChange();
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

    setDefaultView() {
        if (this._mode !== Mode.DEFAULT) {
            this._deletePopup();
            // this._replaceEditToTask();
        }
    }

    // // нужен рефакторинг! (закрыть редактирование)
    //     document.removeEventListener(`keydown`, this._onEscKeyDown);
    //     this._taskEditComponent.reset();
    //     replace(this._taskComponent, this._taskEditComponent);
    //     this._mode = Mode.DEFAULT;
    // };

    // _replaceTaskToEdit = () => {
    //     this._onViewChange();
    //     replace(this._taskEditComponent, this._taskComponent);
    //     this._mode = Mode.EDIT;
    // };




    
    // 1)рефакторинг этой и след.функции
    // 2)настроить reset() в popupCardFilm
    // 3)может нужна отдельная функция, вызывающая addPopup()? Наподобие _replaceTaskToEdit().
    //  _replaceTaskToEdit
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
    };

    // _replaceEditToTask()
    _deletePopup() {
        // this._popup.replaceChildren();

        document.removeEventListener(`keydown`, this._onEscKeyDown);
        this._taskEditComponent.reset();
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