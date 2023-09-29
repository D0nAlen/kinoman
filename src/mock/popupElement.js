import { RenderPosition, render } from "../utils.js";
import PopupComponent from "../components/popupCardFilm.js";
import { COMMENTS } from "../const.js";
import { generateComments } from "../mock/comment.js";
import CommentComponent from "../components/popupComponents/comment.js";
import { generateGenres } from "./genres.js";
import GenreTemplateComponent from "../components/popupComponents/genres.js";

const popup = document.querySelector(".popup");

export const addPopup = (film) => {
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
    closeButton.addEventListener(`click`, () => {
        deletePopup();
        document.removeEventListener(`click`, closeButton);
    });

    // console.log(!!closeButton);
    const onEscKeyDown = (evt) => {

        const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

        if (isEscKey) {
            document.removeEventListener(`keydown`, onEscKeyDown);
            deletePopup();
        }
    };

    document.addEventListener(`keydown`, onEscKeyDown);
};

export const deletePopup = () => {
    const filmDetails = popup.querySelector(".film-details");
    // console.log(filmDetails);
    popup.removeChild(filmDetails);
};