import { defaultCardOutput} from "../mock/allButton.js";
import { menuButtonElement} from "../mock/menuButton.js";
import { FILMS_CARDS, WATCHLIST_CARDS, HISTORY_CARDS, FAVORITES_CARDS } from "../const.js";
import { render, RenderPosition } from "../utils/render.js";
import CardMostCommentedComponent from "../components/cardMostCommented.js";
import TopRatedContainerComponent from "../components/topRatedContainer.js";
import MostCommentedContainerComponent from "../components/mostCommentedContainer.js";
import { generateMenu } from "../mock/menu.js";
import { generateTopRatedFilms } from "../mock/cardTopRated.js";
import { generateMostCommentedFilms } from "../mock/cardMostCommented.js";
import CardTopRatedComponent from "../components/cardTopRated.js";
import ControlsComponent from "../components/controls.js";

const CARD__TOP_RATED_COUNT = 2;
const CARD__MOST_COMMENTED_COUNT = 2;

// const filmsContainer = siteMainElement.querySelector(".films");
// render(filmsContainer, new FilmsListComponent().getElement(), RenderPosition.BEFOREEND);
// const filmsListContainer = filmsContainer.querySelector(".films-list__container");

export default class PageController {
    constructor(container) {
        this._container = container;

        // this._noTasksComponent = new NoTasksComponent();
        // this._sortComponent = new SortComponent();
        // this._tasksComponent = new TasksComponent();
        // this._loadMoreButtonComponent = new LoadMoreButtonComponent();
    }

    render(siteMainElement) {
        // const menu = generateMenu();
        const topRatedFilms = generateTopRatedFilms(CARD__TOP_RATED_COUNT);
        const mostCommentedFilms = generateMostCommentedFilms(CARD__MOST_COMMENTED_COUNT);
        
        const filmsContainer = this._container;

        defaultCardOutput(siteMainElement);
        menuButtonElement(siteMainElement, "all", FILMS_CARDS);
        menuButtonElement(siteMainElement, "Watchlist", WATCHLIST_CARDS);
        menuButtonElement(siteMainElement, "History", HISTORY_CARDS);
        menuButtonElement(siteMainElement, "Favorites", FAVORITES_CARDS);

        // // Top Rated films
        // render(filmsContainer, new TopRatedContainerComponent().getElement(), RenderPosition.BEFOREEND);
        // const topRatedContainerElement = filmsContainer.querySelectorAll(".films-list__container")[1];
        // for (let i = 0; i < CARD__TOP_RATED_COUNT; i++) {
        //     const cardFilmComponent = new CardTopRatedComponent(topRatedFilms[i]);
        //     render(topRatedContainerElement, cardFilmComponent.getElement(), RenderPosition.BEFOREEND);
        //     cardFilmComponent.setCardTopRatedClickHandler();
        // }
        // let controlsCardFilm = topRatedContainerElement.querySelectorAll(".film-card");
        // controlsCardFilm.forEach((film) => render(film, new ControlsComponent().getElement(), RenderPosition.BEFOREEND));

        // // Most commented films
        // render(filmsContainer, new MostCommentedContainerComponent().getElement(), RenderPosition.BEFOREEND);
        // const mostCommentedContainerElement = filmsContainer.querySelectorAll(".films-list__container")[2];
        // for (let i = 0; i < CARD__MOST_COMMENTED_COUNT; i++) {
        //     const cardFilmComponent = new CardMostCommentedComponent(mostCommentedFilms[i]);
        //     render(mostCommentedContainerElement, cardFilmComponent.getElement(), RenderPosition.BEFOREEND);
        //     cardFilmComponent.setCardMostCommentedClickHandler();

        // }
        // controlsCardFilm = mostCommentedContainerElement.querySelectorAll(".film-card");
        // controlsCardFilm.forEach((film) => render(film, new ControlsComponent().getElement(), RenderPosition.BEFOREEND));
    }
}