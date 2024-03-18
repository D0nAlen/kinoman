import { render, remove, RenderPosition } from "../utils/render.js";
import PopupComponent from "../components/popupComponent.js";
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

    getFilm() {
        return this._film;
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
    
// 1)при попадании курсора между заголовками фильтров, срабатывает фильтр "All"(сделать чтобы клик был только по All)
        this._cardFilmComponent.setAddToWatchlistButtonClickHandler(() => {
            // film.isAddToWatchlist = !film.isAddToWatchlist;
            this._onDataChange(this, film, Object.assign({}, film, {
                isAddToWatchlist: !film.isAddToWatchlist,
            }));
        });

        this._cardFilmComponent.setMarkAsWatchedButtonClickHandler(() => {
            // film.isMarkAsWatched = !film.isMarkAsWatched;
            this._onDataChange(this, film, Object.assign({}, film, {
                isMarkAsWatched: !film.isMarkAsWatched,
            }));
        });

        this._cardFilmComponent.setMarkAsFavoriteButtonClickHandler(() => {
            // film.isMarkAsFavorite = !film.isMarkAsFavorite;
            this._onDataChange(this, film, Object.assign({}, film, {
                isMarkAsFavorite: !film.isMarkAsFavorite,
            }));
        });
    }

    setDefaultView() {
        if (this._mode !== Mode.DEFAULT) {
            this._deletePopup();
        }
    }

    destroy() {
        remove(this._cardFilmComponent);
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

        const film = this._film;

        this._popupComponent.setAddToWatchlistButtonClickHandler(() => {
            // this._film.isAddToWatchlist = !this._film.isAddToWatchlist;
            this._onDataChange(this, film, Object.assign({}, film, {
                isAddToWatchlist: !film.isAddToWatchlist,
            }));

            this._popupComponent.rerender();

        });
        this._popupComponent.setMarkAsWatchedButtonClickHandler(() => {
            this._onDataChange(this, film, Object.assign({}, film, {
                isMarkAsWatched: !film.isMarkAsWatched,
            }));

            this._popupComponent.rerender();
            // this._film.isMarkAsWatched = !this._film.isMarkAsWatched;
        });
        this._popupComponent.setMarkAsFavoriteButtonClickHandler(() => {
            this._onDataChange(this, film, Object.assign({}, film, {
                isMarkAsFavorite: !film.isMarkAsFavorite,
            }));

            this._popupComponent.rerender();

            // this._film.isMarkAsFavorite = !this._film.isMarkAsFavorite;
        });

        const onDataChange = this._onDataChange;
        // const film = this._film;
        const popup = this._popupComponent;

        this._popupComponent.setAddNewCommentClickHandler(() => {
            document.addEventListener("keydown", function (e) {
                if ((e.ctrlKey) && (e.code == "Enter")) {
                    const id = new Date().getTime() + Math.random();
                    const text = popup.getElement().querySelector(`.film-details__comment-input`).value;
                    const emotion = popup.getElement().querySelector(`.film-details__add-emoji-label`).getElementsByTagName('img')[0].src.replace(window.location.origin + '/', './');
                    const date = formatCommentDate(new Date());
                    const author = getRandomArrayItem(authorComment);
                    const comment = { id, text, emotion, author, date };

                    onDataChange(film, null, comment);

                    popup.rerender();
                }
            });

        });

        // 1)после удаления второго комментария попап закрывается(слетает обработчик событий)
        const deleteCommentList = this._popupComponent.getElement().querySelectorAll(`.film-details__comment-delete`);
        deleteCommentList.forEach((deleteCommentButton) => {
            deleteCommentButton.addEventListener(`click`, (event) => {
                event.preventDefault();
                const idComment = deleteCommentButton.id;
                onDataChange(this, idComment, null);
                popup.rerender();
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