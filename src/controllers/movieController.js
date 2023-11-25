import { render, RenderPosition } from "../utils/render.js";
import { COMMENTS } from "../const.js";
import { generateGenres } from "../mock/genres.js";
import { generateComments } from "../mock/comment.js";
import CommentComponent from "../components/popupComponents/comment.js";
import PopupComponent from "../components/popupCardFilm.js";
import GenreTemplateComponent from "../components/popupComponents/genres.js";

export default class MovieController {
    constructor(container, onDataChange) {
        this._container = container;
        this._onDataChange = onDataChange;
    }

    render(film, filmsListContainer, cardFilmComponent) {

        const popup = document.querySelector(".popup");

        renderCard();


        function renderCard() {
            setCardFilmClickHandler(cardFilmComponent);
            render(filmsListContainer, cardFilmComponent, RenderPosition.BEFOREEND);
        }

        function setCardFilmClickHandler(cardFilmComponent) {
            cardFilmComponent.getElement().addEventListener(`click`, () => {
                addPopup(film);
            });
        }

        function addPopup() {
            const genres = generateGenres(film.genres);
            const comments = generateComments(COMMENTS);

            popup.appendChild(new PopupComponent(film).getElement());

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
        };

        function deletePopup() {
            popup.replaceChildren();
        };
    }

  
}