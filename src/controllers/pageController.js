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
import SortingComponent from "../components/sorting.js";
import { SortType } from "../components/sorting.js";

const CARD__TOP_RATED_COUNT = 2;
const CARD__MOST_COMMENTED_COUNT = 2;

const topRatedFilms = generateTopRatedFilms(CARD__TOP_RATED_COUNT);
const mostCommentedFilms = generateMostCommentedFilms(CARD__MOST_COMMENTED_COUNT);


const getSortedFilms = (films, sortType, from, to) => {
    let sortedTasks = [];
    const showingTasks = [...films];

    switch (sortType) {
        case SortType.DATE_UP:
            sortedTasks = showingTasks.sort((a, b) => a.dueDate - b.dueDate);
            break;
        case SortType.DATE_DOWN:
            sortedTasks = showingTasks.sort((a, b) => b.dueDate - a.dueDate);
            break;
        case SortType.DEFAULT:
            sortedTasks = showingTasks;
            break;
    }
    return sortedTasks.slice(from, to);
};

export default class PageController {
    constructor(container) {
        this._container = container;

        this._sortingComponent = new SortingComponent();
        this._topRatedContainerComponent = new TopRatedContainerComponent();
        this._mostCommentedContainerComponent = new MostCommentedContainerComponent();
    }

    render(siteMainElement) {

        const filmsContainer = this._container;
// 1)нужно отрисовать сортировку здесь, в контроллере
// 2)...для этого перенести логику отрисовки из menuButton элемент в контроллер
// 3)исправить, чтобы по умолч. выводились не все карточки, а категория, которая была выбрана(по умолч. категория All)
        defaultCardOutput(siteMainElement);
        menuButtonElement(siteMainElement, "all", FILMS_CARDS);
        menuButtonElement(siteMainElement, "Watchlist", WATCHLIST_CARDS);
        menuButtonElement(siteMainElement, "History", HISTORY_CARDS);
        menuButtonElement(siteMainElement, "Favorites", FAVORITES_CARDS);

        // WIP
        this._sortingComponent.setSortTypeChangeHandler((sortType) => {
            showingTasksCount = SHOWING_TASKS_COUNT_BY_BUTTON;

            const sortedTasks = getSortedFilms(tasks, sortType, 0, showingTasksCount);

            taskListElement.innerHTML = ``;

            renderTasks(taskListElement, sortedTasks);
            // sortedTasks.slice(0, showingTasksCount).forEach((task) => {
            //     renderTask(taskListElement, task);
            // });
            renderLoadMoreButton();
        });

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