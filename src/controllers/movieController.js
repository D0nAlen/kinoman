import { render, RenderPosition } from "../utils/render.js";
import { COMMENTS, FAVORITES_CARDS, HISTORY_CARDS, WATCHLIST_CARDS, EMOJIS } from "../const.js";
import { generateGenres } from "../mock/genres.js";
import { generateComments } from "../mock/comment.js";
import CommentComponent from "../components/popupComponents/comment.js";
import PopupComponent from "../components/popupCardFilm.js";
import GenreTemplateComponent from "../components/popupComponents/genres.js";
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

        const oldFilmComponent = this._cardFilmComponent;
        const oldPopupComponent = this._popupComponent;
        this._film = film;

        this._cardFilmComponent = new CardFilmComponent(film);

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
        // const genres = generateGenres(this._film.genres);
        // const comments = generateComments(COMMENTS);

        render(this._popup, this._popupComponent, RenderPosition.BEFOREEND);

        // // 1)список комментов и жанров стирается при перерисовке!!!
        // //genres rendering
        //         const filmDetailsGenres = this._popupComponent.getElement().querySelector(".film-details-genres");
        // // const filmDetailsGenres = this._popup.querySelector(".film-details-genres");
        // for (let i = 0; i < genres.length; i++) {
        //     render(filmDetailsGenres, new GenreTemplateComponent(genres[i]), RenderPosition.BEFOREEND);
        // }

        // comments rendering
        // const commentsList = this._popupComponent.getElement().querySelector(".film-details__comments-list");
        // // const commentsList = this._popup.querySelector(".film-details__comments-list");
        // for (let i = 0; i < comments.length; i++) {
        //     render(commentsList, new CommentComponent(comments[i]), RenderPosition.BEFOREEND);
        // }

        const closeButton = this._popupComponent.getElement().querySelector(".film-details__close");

        document.addEventListener(`keydown`, this._onEscKeyDown);

        closeButton.addEventListener(`click`, () => {
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

        this._popupComponent.setEmotionButtonClickHandler();
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