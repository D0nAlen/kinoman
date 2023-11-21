import CardFilmComponent from "../components/cardFilm.js";
import { render, RenderPosition } from "../utils/render.js";

export default class MovieController {
    constructor(container) {
        this._container = container;
    }

    render(film) {
        const container = this._container;

    }

    _renderCardFilm() {
        const cardFilmComponent = new CardFilmComponent(film);
        cardFilmComponent.setCardFilmClickHandler();

        // filmsListContainer это container?
        render(filmsListContainer, cardFilmComponent, RenderPosition.BEFOREEND);
    }

}