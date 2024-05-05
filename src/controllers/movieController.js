import { render, remove, RenderPosition } from "../utils/render.js";
import PopupComponent from "../components/popupComponent.js";
import CardFilmComponent from "../components/cardFilm.js";
import { formatCommentDate } from "../utils/common.js";
import { getRandomArrayItem, authorComment } from "../mock/comment.js";
import MovieModel from "../models/movie.js";

export const Mode = {
    DEFAULT: `default`,
    EDIT: `edit`,
};

const parseFormData = (formData) => {
    const date = formData.get(`date`);
    const repeatingDays = DAYS.reduce((acc, day) => {
        acc[day] = false;
        return acc;
    }, {});

    // Адаптер:
    return new MovieModel({
        //   "description": formData.get(`text`),
        //   "dueDate": date ? new Date(date) : null,
        //   "repeatingDays": formData.getAll(`repeat`).reduce((acc, it) => {
        //     acc[it] = true;
        //     return acc;
        //   }, repeatingDays),
        //   "color": formData.get(`color`),
        //   "isFavorite": false,
        //   "isDone": false,

        "id": formData.get(`id`),
        "filmName": formData.get(`filmName`),
        "originalFilmName": formData.get(`originalFilmName`),
        "director": formData.get(`director`),
        "writers": formData.get(`writers`),
        "actors": formData.get(`actors`),
        "releaseDate": date ? new Date(date) : null,
        "country": formData.get(`country`),
        "genres": formData.get(`genres`),
        "rating": formData.get(`rating`),
        "year": formData.get(`year`),
        "duration": formData.get(`duration`),
        "poster": formData.get(`poster`),
        "description": formData.get(`description`),
        "comment": formData.get(`comment`),
        "age": formData.get(`age`),
        "isAddToWatchlist": false,
        "isMarkAsFavorite": false,
        "isMarkAsWatched": false,
        "isCardTopRated": false,
        "isCardMostCommented": false,
    });
};

export default class MovieController {
    constructor(container, onDataChange, onViewChange, onDataChangeComment, api) {
        this._container = container;
        this._onDataChange = onDataChange;
        this._onDataChangeComment = onDataChangeComment;
        this._onViewChange = onViewChange;

        this._cardFilmComponent = null;
        this._popupComponent = null;
        this._popup = null;
        this._film = null;
        this._mode = Mode.DEFAULT;
        this._api = api;

        this._onEscKeyDown = this._onEscKeyDown.bind(this);
    }

    // getFilm() {
    //     return this._film;
    // }

    render(film) {
        this._film = film;
        this._cardFilmComponent = new CardFilmComponent(this._film);
        this._popup = document.querySelector(".popup");

        render(this._container, this._cardFilmComponent, RenderPosition.BEFOREEND);

        this._cardFilmComponent.setCardFilmClickHandler(() => {
            this._onViewChange();
            this._addPopup();
        });

        //при попадании курсора между заголовками фильтров, срабатывает фильтр "All"(сделать чтобы клик был только по All)
        this._cardFilmComponent.setAddToWatchlistButtonClickHandler(() => {
            // this._onDataChange(this, film, Object.assign({}, film, {
            //     isAddToWatchlist: !film.isAddToWatchlist,
            // }));
            const newFilm = MovieModel.clone(film);
            newFilm.isAddToWatchlist = !newFilm.isAddToWatchlist;
            this._onDataChange(this, film, newFilm);
        });

        this._cardFilmComponent.setMarkAsWatchedButtonClickHandler(() => {
            // this._onDataChange(this, film, Object.assign({}, film, {
            //     isMarkAsWatched: !film.isMarkAsWatched,
            // }));
            const newFilm = MovieModel.clone(film);
            newFilm.isMarkAsWatched = !newFilm.isMarkAsWatched;
            this._onDataChange(this, film, newFilm);
        });

        this._cardFilmComponent.setMarkAsFavoriteButtonClickHandler(() => {
            // this._onDataChange(this, film, Object.assign({}, film, {
            //     isMarkAsFavorite: !film.isMarkAsFavorite,
            // }));
            const newFilm = MovieModel.clone(film);
            newFilm.isMarkAsFavorite = !newFilm.isMarkAsFavorite;
            this._onDataChange(this, film, newFilm);
        });

        // console.log(this._api);



        this._cardFilmComponent.setSubmitHandler((evt) => {
            evt.preventDefault();

            const formData = this._cardFilmComponent.getData();
            const data = parseFormData(formData);

            // this._cardFilmComponent.setData({
            // //   saveButtonText: `Saving...`,
            // });
            this._onDataChange(this, film, data);
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

    // shake() {
    //     this._taskEditComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    //     this._taskComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    //     setTimeout(() => {
    //       this._taskEditComponent.getElement().style.animation = ``;
    //       this._taskComponent.getElement().style.animation = ``;


    //       this._taskEditComponent.setData({
    //         saveButtonText: `Save`,
    //         deleteButtonText: `Delete`,
    //       });
    //     }, SHAKE_ANIMATION_TIMEOUT);
    //   }

    _addPopup() {
        this._popupComponent = new PopupComponent(this._film);

        // console.log(this._api.getComments());



        render(this._popup, this._popupComponent, RenderPosition.BEFOREEND);
        document.addEventListener(`keydown`, this._onEscKeyDown);

        this._popupComponent.setCloseButtonClickHandler(() => {
            this._deletePopup();
            document.removeEventListener(`keydown`, this._onEscKeyDown);
        });

        const film = this._film;

        this._popupComponent.setAddToWatchlistButtonClickHandler(() => {
            // this._onDataChange(this, film, Object.assign({}, film, {
            //     isAddToWatchlist: !film.isAddToWatchlist,
            // }));

            // this._popupComponent.rerender();
            const newFilm = MovieModel.clone(film);
            newFilm.isAddToWatchlist = !newFilm.isAddToWatchlist;
            this._onDataChange(this, film, newFilm);

        });
        this._popupComponent.setMarkAsWatchedButtonClickHandler(() => {
            // this._onDataChange(this, film, Object.assign({}, film, {
            //     isMarkAsWatched: !film.isMarkAsWatched,
            // }));

            // this._popupComponent.rerender();
            const newFilm = MovieModel.clone(film);
            newFilm.isMarkAsWatched = !newFilm.isMarkAsWatched;
            this._onDataChange(this, film, newFilm);
        });

        this._popupComponent.setMarkAsFavoriteButtonClickHandler(() => {
            // this._onDataChange(this, film, Object.assign({}, film, {
            //     isMarkAsFavorite: !film.isMarkAsFavorite,
            // }));
            // this._popupComponent.rerender();
            const newFilm = MovieModel.clone(film);
            newFilm.isMarkAsWatched = !newFilm.isMarkAsWatched;
            this._onDataChange(this, film, newFilm);
        });

        const onDataChangeComment = this._onDataChangeComment;
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

                    // onDataChange(film, null, comment);
                    // onDataChangeComment(film, null, comment);

                    popup.rerender();
                }
            });

        });


        const deleteCommentList = this._popupComponent.getElement().querySelectorAll(`.film-details__comment-delete`);
        deleteCommentList.forEach((deleteCommentButton) => {
            deleteCommentButton.addEventListener(`click`, (event) => {
                event.preventDefault();
                const idComment = deleteCommentButton.id;
                // onDataChange(this, idComment, null);
                // onDataChangeComment(film.id, idComment, null);
                // console.log(film.id);

                // 2)после удаления второго комментария попап закрывается здесь!!!(слетает обработчик событий)
                // popup.rerender();
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