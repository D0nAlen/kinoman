import { render, remove, RenderPosition } from "../utils/render.js";
import PopupComponent from "../components/popupCardFilm.js";
import CardFilmComponent from "../components/cardFilm.js";
import { formatCommentDate } from "../utils/common.js";
import { getRandomArrayItem, authorComment } from "../mock/comment.js";

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

        // 1)получить эмоцию с попапа
        // 2)добавить коммент в список комментов карточки, перерисовать попап
        this._popupComponent.setAddNewCommentSubmitHandler(() => {
            const popup = this._popupComponent;
            const film = this._film;
            document.addEventListener("keydown", function (e) {
                if ((e.ctrlKey) && (e.code == "Enter")) {
                    const text = popup.getElement().querySelector(`.film-details__comment-input`).value;
                    const emotion = popup.getElement().querySelector(`.film-details__add-emoji-label`).getElementsByTagName('img')[0].src.replace(window.location.origin + '/', './');

                    const date = formatCommentDate(new Date());
                    const author = getRandomArrayItem(authorComment);
                    //    console.log(date);
                    const comment ={ text, emotion, author, date };
                    console.log(comment);

                    // const newComment = new CommentComponent(comment);
                    // this._film.comments
                    // console.log("Был нажат CTRL+enter");
                }
            });

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