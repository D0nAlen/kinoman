import { defaultCardOutput, menuButtonElement } from "./mock/menuButton.js";
import { FILMS_CARDS, WATCHLIST_CARDS, HISTORY_CARDS, FAVORITES_CARDS } from "./const.js";
import { render, RenderPosition } from "../utils/render.js";
import CardMostCommentedComponent from "./components/cardMostCommented.js";
import TopRatedContainerComponent from "../components/topRatedContainer.js";
import MostCommentedContainerComponent from "../components/mostCommentedContainer.js";
import { generateMenu } from "./mock/menu.js";
import { generateTopRatedFilms } from "./mock/cardTopRated.js";
import { generateMostCommentedFilms } from "./mock/cardMostCommented.js";

const CARD__TOP_RATED_COUNT = 2;
const CARD__MOST_COMMENTED_COUNT = 2;
const siteHeaderElement = document.querySelector(".header");
const siteMainElement = document.querySelector(".main");


const menu = generateMenu();
const topRatedFilms = generateTopRatedFilms(CARD__TOP_RATED_COUNT);
const mostCommentedFilms = generateMostCommentedFilms(CARD__MOST_COMMENTED_COUNT);

export default class PageController {
    constructor(container) {
        this._container = container;

        // this._noTasksComponent = new NoTasksComponent();
        // this._sortComponent = new SortComponent();
        // this._tasksComponent = new TasksComponent();
        // this._loadMoreButtonComponent = new LoadMoreButtonComponent();
    }


    render(films, comments) {
        defaultCardOutput(siteMainElement);
        menuButtonElement(siteMainElement, "all", FILMS_CARDS);
        menuButtonElement(siteMainElement, "Watchlist", WATCHLIST_CARDS);
        menuButtonElement(siteMainElement, "History", HISTORY_CARDS);
        menuButtonElement(siteMainElement, "Favorites", FAVORITES_CARDS);

        // Top Rated films
        render(filmsContainer, new TopRatedContainerComponent().getElement(), RenderPosition.BEFOREEND);
        const topRatedContainerElement = filmsContainer.querySelectorAll(".films-list__container")[1];
        for (let i = 0; i < CARD__TOP_RATED_COUNT; i++) {
            const cardFilmComponent = new CardTopRatedComponent(topRatedFilms[i]).getElement();
            render(topRatedContainerElement, cardFilmComponent, RenderPosition.BEFOREEND);
            listenerPopup(cardFilmComponent, topRatedFilms[i]);
        }
        let controlsCardFilm = topRatedContainerElement.querySelectorAll(".film-card");
        controlsCardFilm.forEach((film) => render(film, new ControlsComponent().getElement(), RenderPosition.BEFOREEND));

        // Most commented films
        render(filmsContainer, new MostCommentedContainerComponent().getElement(), RenderPosition.BEFOREEND);
        const mostCommentedContainerElement = filmsContainer.querySelectorAll(".films-list__container")[2];
        for (let i = 0; i < CARD__MOST_COMMENTED_COUNT; i++) {
            const cardFilmComponent = new CardMostCommentedComponent(mostCommentedFilms[i]).getElement();
            render(mostCommentedContainerElement, cardFilmComponent, RenderPosition.BEFOREEND);
            listenerPopup(cardFilmComponent, mostCommentedFilms[i]);
        }
        controlsCardFilm = mostCommentedContainerElement.querySelectorAll(".film-card");
        controlsCardFilm.forEach((film) => render(film, new ControlsComponent().getElement(), RenderPosition.BEFOREEND));
    }
}