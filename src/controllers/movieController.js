import { render, remove, RenderPosition } from "../utils/render.js";
import PopupComponent from "../components/popupComponent.js";
import CardFilmComponent from "../components/cardFilm.js";
import { formatCommentDate } from "../utils/common.js";
import { getRandomArrayItem, authorComment } from "../mock/comment.js";
import CommentComponent from "../components/popupComponents/comment.js";

export const Mode = {
    DEFAULT: `default`,
    EDIT: `edit`,
};

export const EmptyComment = {
    text: ``,
    emotion: ``,
    author: ``,
    date: null,
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

        this._commentComponent = new CommentComponent();
        // this.getData = this.getData.bind(this);

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

        // 1)добавить _onDataChange к обработчикам
        // 2)не работает автоперерисовка после изменения счетчика фильтров
        // this._taskComponent.setArchiveButtonClickHandler(() => {
        //     this._onDataChange(this, task, Object.assign({}, task, {
        //       isArchive: !task.isArchive,
        //     }));
        //   });
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

        // 1)рабочая функция, работает добавление(пока без удаления), нужно прикрутить _onDataChange!!!
        // this._popupComponent.setAddNewCommentClickHandler(() => {
        //     const popup = this._popupComponent;
        //     const film = this._film;
        //     document.addEventListener("keydown", function (e) {
        //         if ((e.ctrlKey) && (e.code == "Enter")) {
        //             const text = popup.getElement().querySelector(`.film-details__comment-input`).value;
        //             const emotion = popup.getElement().querySelector(`.film-details__add-emoji-label`).getElementsByTagName('img')[0].src.replace(window.location.origin + '/', './');

        //             const date = formatCommentDate(new Date());
        //             const author = getRandomArrayItem(authorComment);
        //             const comment = { text, emotion, author, date };
        //             film.comment.push(comment);

        //             popup.rerender();
        //         }
        //     });

        // });



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

    // _onDataChange(movieController, oldData, newData) {

    //     if (oldData === EmptyComment) {
    //         this._creatingComment = null;
    //         if (newData === null) {
    //             movieController.destroy();
    //             this._updateFilms(this._showingFilmsCount);
    //         } else {
    //             this._moviesModel.addComment(newData);
    //             movieController.render(newData, MovieControllerMode.DEFAULT);

    //             if (this._showingFilmsCount % SHOWING_FILMS_COUNT_BY_BUTTON === 0) {
    //                 const destroyedComment = this._showedMovieControllers.pop();
    //                 destroyedComment.destroy();
    //             }

    //             this._showedMovieControllers = [].concat(movieController, this._showedMovieControllers);
    //             this._showingFilmsCount = this._showedMovieControllers.length;

    //             // this._renderLoadMoreButton();
    //         }
    //     } else if (newData === null) {
    //         this._moviesModel.removeTask(oldData.id);
    //         this._updateFilms(this._showingFilmsCount);
    //     }
    // }
}