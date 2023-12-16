import { render, RenderPosition } from "../utils/render.js";
import { COMMENTS, FAVORITES_CARDS, HISTORY_CARDS, WATCHLIST_CARDS, EMOJIS } from "../const.js";
import { generateGenres } from "../mock/genres.js";
import { generateComments } from "../mock/comment.js";
import CommentComponent from "../components/popupComponents/comment.js";
import PopupComponent from "../components/popupCardFilm.js";
import GenreTemplateComponent from "../components/popupComponents/genres.js";
import CardFilmComponent from "../components/cardFilm.js";
import { generateEmojis } from "../mock/emojis.js";
import EmojiComponent from "../components/popupComponents/emoji.js";

export default class MovieController {
    constructor(container, onDataChange) {
        this._container = container;
        this._onDataChange = onDataChange;
        this._cardFilmComponent = null;
    }

    // 1)по клику на кнопках addTo... не должен открываться попап.
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

        function addPopup(onDataChange) {
            const genres = generateGenres(film.genres);
            const comments = generateComments(COMMENTS);

            const popupComponent = new PopupComponent(film);
            render(popup, popupComponent, RenderPosition.BEFOREEND);
            // popup.appendChild(popupComponent.getElement());

            //genres rendering
            const filmDetailsGenres = popup.querySelector(".film-details-genres");
            for (let i = 0; i < genres.length; i++) {
                render(filmDetailsGenres, new GenreTemplateComponent(genres[i]), RenderPosition.BEFOREEND);
                // filmDetailsGenres.appendChild(new GenreTemplateComponent(genres[i]).getElement());
            }

            // comments rendering
            const commentsList = popup.querySelector(".film-details__comments-list");
            for (let i = 0; i < comments.length; i++) {
                render(commentsList, new CommentComponent(comments[i]), RenderPosition.BEFOREEND);
                // commentsList.appendChild(new CommentComponent(comments[i]).getElement());
            }

            // 1)нужно, чтобы по клику на эмодзи, смайлик подставлялся в кружок слева от поля с комментарием.
            // 2)emoji должен быть объектом класса!!!
            //   setEmotionButtonClickHandler() {
            let emojiIcon = popup.querySelector(".film-details__add-emoji-label");
            let emojiList = popup.querySelector(".film-details__emoji-list");

            const emojis = generateEmojis(EMOJIS);
            emojis.forEach((emoji) => {
                // render(emojiList, new EmojiComponent(emoji), RenderPosition.BEFOREEND);
                console.log((new EmojiComponent(emoji)).getElement());
            });

            // this.getElement().querySelectorAll(`.film-details__emoji-label`).forEach(emoji => {
            //     emoji.addEventListener(`click`, () => {
            //         render(emojiIcon, emoji, RenderPosition.BEFOREEND);
            //     });
            // });
            //   }

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
                onDataChange(film, WATCHLIST_CARDS, "Watchlist");
            });

            popupComponent.setMarkAsWatchedButtonClickHandler(() => {
                film.markAsWatched = !film.markAsWatched;
                onDataChange(film, HISTORY_CARDS, "History");
            });
            popupComponent.setMarkAsFavoriteButtonClickHandler(() => {
                film.markAsFavorite = !film.markAsFavorite;
                onDataChange(film, FAVORITES_CARDS, "Favorites");
            });

            // popupComponent.setEmotionButtonClickHandler();
        };

        function deletePopup() {
            popup.replaceChildren();
        };
    }


}