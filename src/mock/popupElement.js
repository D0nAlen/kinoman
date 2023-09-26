import { RenderPosition, render } from "../utils.js";
import PopupComponent from "../components/popupCardFilm.js";

const popup = document.querySelector(".popup");

export const addPopup = (film) => {

    // popup.appendChild(new PopupComponent(film).getElement());
    render(popup, new PopupComponent(film).getElement(), RenderPosition.BEFOREEND);
};

export const deletePopup = (film) => {
    // popupContainer.removeChild(new FilmDetailsContainerComponent().getElement());
};