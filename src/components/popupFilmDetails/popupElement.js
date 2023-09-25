import FilmDetailsContainerComponent from "./container.js";
import FormDetailsTopContainerComponent from "./topContainer.js";

const popupContainer = document.querySelector(".popup");

export const addPopup = (film) => {
    popupContainer.appendChild(new FilmDetailsContainerComponent().getElement());
    popupContainer.appendChild(new FormDetailsTopContainerComponent().getElement());
// не отрисовываются, добавить рендеринг!
};

export const deletePopup = (film) => {
    popupContainer.removeChild(new FilmDetailsContainerComponent().getElement());
};