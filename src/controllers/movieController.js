import { render, RenderPosition } from "../utils/render.js";
import { COMMENTS } from "../const.js";
import { generateGenres } from "../mock/genres.js";
import { generateComments } from "../mock/comment.js";
import CommentComponent from "../components/popupComponents/comment.js";
import PopupComponent from "../components/popupCardFilm.js";
import GenreTemplateComponent from "../components/popupComponents/genres.js";
import CardFilmComponent from "../components/cardFilm.js";
import { WATCHLIST_CARDS } from "../const.js";

export default class MovieController {
    constructor(container, onDataChange) {
        this._container = container;
        this._onDataChange = onDataChange;
        this._cardFilmComponent = null;
    }

    render(film, filmsListContainer) {
        // 1)Что будет новым и старым компонентом?
        // const oldTaskComponent = this._taskComponent;
        // const oldTaskEditComponent = this._taskEditComponent;

        // this._taskComponent = new TaskComponent(task);
        // this._taskEditComponent = new TaskEditComponent(task);

        this._cardFilmComponent = new CardFilmComponent(film);
        const popup = document.querySelector(".popup");

        render(filmsListContainer, this._cardFilmComponent, RenderPosition.BEFOREEND);

        this._cardFilmComponent.getElement().addEventListener(`click`, () => {
            addPopup();
        });

        // 1)некорректно работает добавление, если вызов кнопки происходит с других страниц(типо, All, History, и т.д.)
        // this._cardFilmComponent.setAddToWatchlistButtonClickHandler(() => {
        //     // this._cardFilmComponent.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
        //     // .addEventListener(`click`, () => {
        //     let watchlist = WATCHLIST_CARDS;
        //     this._onDataChange(this, filmsListContainer, film, Object.assign({}, film, {
        //         addToWatchlist: !film.addToWatchlist,
        //     }), WATCHLIST_CARDS);
        //     console.log(film.addToWatchlist);
        // });
        this._cardFilmComponent.setAddToWatchlistButtonClickHandler(() => {
            // this._cardFilmComponent.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
            // .addEventListener(`click`, () => {
            // let watchlist = WATCHLIST_CARDS;

            // film.addToWatchlist = !film.addToWatchlist
            this._onDataChange(this, filmsListContainer, film, film.addToWatchlist = !film.addToWatchlist, WATCHLIST_CARDS);
        });
        // cardFilmComponent.setMarkAsFavoriteButtonClickHandler();
        // cardFilmComponent.setMarkAsWatchedButtonClickHandler();

        // 1)заменить на ф-ции обработчики событий из TaskController.render()(по аналогии 
        // с "this._cardFilmComponent.setAddToWatchlistButtonClickHandler(() => {" выше).
        function addPopup() {
            const genres = generateGenres(film.genres);
            const comments = generateComments(COMMENTS);

            const popupComponent = new PopupComponent(film);
            popup.appendChild(popupComponent.getElement());

            //genres rendering
            const filmDetailsGenres = popup.querySelector(".film-details-genres");
            for (let i = 0; i < genres.length; i++) {
                filmDetailsGenres.appendChild(new GenreTemplateComponent(genres[i]).getElement());
            }

            // comments rendering
            const commentsList = popup.querySelector(".film-details__comments-list");
            for (let i = 0; i < comments.length; i++) {
                commentsList.appendChild(new CommentComponent(comments[i]).getElement());
            }

            const closeButton = popup.querySelector(".film-details__close");

            const onEscKeyDown = (evt) => {

                const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

                if (isEscKey) {
                    document.removeEventListener(`keydown`, onEscKeyDown);
                    deletePopup();
                }
            };

            document.addEventListener(`keydown`, onEscKeyDown);

            closeButton.addEventListener(`click`, () => {
                deletePopup();
                document.removeEventListener(`keydown`, onEscKeyDown);
            });

            // 1)не все переменные инициализированы!
            // popupComponent.setAddToWatchlistButtonClickHandler(() => {
            //     // this._cardFilmComponent.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
            //     // .addEventListener(`click`, () => {
            //     let watchlist = WATCHLIST_CARDS;
            //     onDataChange(this, filmsListContainer, film, Object.assign({}, film, {
            //         addToWatchlist: !film.addToWatchlist,
            //     }), watchlist);
            // });

            popupComponent.setMarkAsWatchedButtonClickHandler();
            popupComponent.setMarkAsFavoriteButtonClickHandler();
        };

        function deletePopup() {
            popup.replaceChildren();
        };
    }


}