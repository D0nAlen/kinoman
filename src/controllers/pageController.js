import { defaultCardOutput } from "../mock/allButton.js";
import { menuButtonElement } from "../mock/menuButton.js";
import { FILMS_CARDS, WATCHLIST_CARDS, HISTORY_CARDS, FAVORITES_CARDS } from "../const.js";
import { render, RenderPosition } from "../utils/render.js";
import CardMostCommentedComponent from "../components/cardMostCommented.js";
import TopRatedContainerComponent from "../components/topRatedContainer.js";
import MostCommentedContainerComponent from "../components/mostCommentedContainer.js";
import { generateTopRatedFilms } from "../mock/cardTopRated.js";
import { generateMostCommentedFilms } from "../mock/cardMostCommented.js";
import CardTopRatedComponent from "../components/cardTopRated.js";
import ControlsComponent from "../components/controls.js";

const CARD__TOP_RATED_COUNT = 2;
const CARD__MOST_COMMENTED_COUNT = 2;

const topRatedFilms = generateTopRatedFilms(CARD__TOP_RATED_COUNT);
const mostCommentedFilms = generateMostCommentedFilms(CARD__MOST_COMMENTED_COUNT);

export default class PageController {
    constructor(container) {
        this._container = container;

        this._topRatedContainerComponent = new TopRatedContainerComponent();
        this._mostCommentedContainerComponent = new MostCommentedContainerComponent();
    }

    render(siteMainElement) {

        const filmsContainer = this._container;

        // !!!исправить, чтобы по умолч. выводились не все карточки, а категория, которая была выбрана(по умолч. категория All)
        defaultCardOutput(siteMainElement);
        // !!!неправуильно считаются карточки all после favorites!
        menuButtonElement(siteMainElement, "all", FILMS_CARDS);
        // allButtonElement(siteMainElement);
        menuButtonElement(siteMainElement, "Watchlist", WATCHLIST_CARDS);
        menuButtonElement(siteMainElement, "History", HISTORY_CARDS);
        menuButtonElement(siteMainElement, "Favorites", FAVORITES_CARDS);

        // Top Rated films
        render(filmsContainer.getElement(), this._topRatedContainerComponent, RenderPosition.BEFOREEND);
        const topRatedContainerElement = filmsContainer.getElement().querySelectorAll(".films-list__container")[0];
        for (let i = 0; i < CARD__TOP_RATED_COUNT; i++) {
            const cardFilmComponent = new CardTopRatedComponent(topRatedFilms[i]);
            render(topRatedContainerElement, cardFilmComponent, RenderPosition.BEFOREEND);
            cardFilmComponent.setCardTopRatedClickHandler();
        }
        let controlsCardFilm = topRatedContainerElement.querySelectorAll(".film-card");
        controlsCardFilm.forEach((film) => render(film, new ControlsComponent(), RenderPosition.BEFOREEND));

        // Most commented films
        render(filmsContainer.getElement(), this._mostCommentedContainerComponent, RenderPosition.BEFOREEND);
        const mostCommentedContainerElement = filmsContainer.getElement().querySelectorAll(".films-list__container")[1];
        for (let i = 0; i < CARD__MOST_COMMENTED_COUNT; i++) {
            const cardFilmComponent = new CardMostCommentedComponent(mostCommentedFilms[i]);
            render(mostCommentedContainerElement, cardFilmComponent, RenderPosition.BEFOREEND);
            cardFilmComponent.setCardMostCommentedClickHandler();
        }
        controlsCardFilm = mostCommentedContainerElement.querySelectorAll(".film-card");
        controlsCardFilm.forEach((film) => render(film, new ControlsComponent(), RenderPosition.BEFOREEND));
    }
}