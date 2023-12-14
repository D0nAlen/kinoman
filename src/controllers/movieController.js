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
            addPopup(this._onDataChange);
        });

        this._cardFilmComponent.setAddToWatchlistButtonClickHandler(() => {
            film.addToWatchlist = !film.addToWatchlist;
            this._onDataChange(film, WATCHLIST_CARDS);
        });
        // cardFilmComponent.setMarkAsFavoriteButtonClickHandler();
        // cardFilmComponent.setMarkAsWatchedButtonClickHandler();

        function addPopup(onDataChange) {
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

            popupComponent.setAddToWatchlistButtonClickHandler(() => {
                film.addToWatchlist = !film.addToWatchlist;
                onDataChange(film, WATCHLIST_CARDS);
            });

            popupComponent.setMarkAsWatchedButtonClickHandler();
            popupComponent.setMarkAsFavoriteButtonClickHandler();
        };

        function deletePopup() {
            popup.replaceChildren();
        };
    }


}