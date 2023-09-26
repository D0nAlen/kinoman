import FilmDetailsContainerComponent from "./container.js";
import FormDetailsTopContainerComponent from "./topContainer.js";
import { RenderPosition, render } from "../../utils.js";
import FilmDetailsCloseButtonComponent from "../popupFilmDetails/closeButton.js"
import FilmDetailsInfoWrap from "./infoWrap.js";


const popup = document.querySelector(".popup");

export const addPopup = (film) => {

    const popupContainer = new FilmDetailsContainerComponent().getElement();
    popupContainer.appendChild(new FormDetailsTopContainerComponent().getElement());

    const topContainer = popupContainer.querySelector(".form-details__top-container");
    topContainer.appendChild(new FilmDetailsCloseButtonComponent().getElement());
    topContainer.appendChild(new FilmDetailsInfoWrap(film).getElement());
    render(popup, popupContainer, RenderPosition.BEFOREEND);
};

export const deletePopup = (film) => {
    // popupContainer.removeChild(new FilmDetailsContainerComponent().getElement());
};