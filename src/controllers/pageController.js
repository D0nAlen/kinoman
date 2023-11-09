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
import FilmsContainerComponent from "../components/filmsContainer.js";
import FilmsListComponent from "../components/filmsList.js";
import noDataFilmsTemplate from "../components/no-data.js";
import { currentMenuButton } from "../mock/menuButton.js";


const CARD__TOP_RATED_COUNT = 2;
const CARD__MOST_COMMENTED_COUNT = 2;

const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
let SHOWING_FILMS_COUNT_ON_START = 5;

const topRatedFilms = generateTopRatedFilms(CARD__TOP_RATED_COUNT);
const mostCommentedFilms = generateMostCommentedFilms(CARD__MOST_COMMENTED_COUNT);

const getSortedFilms = (films, sortType, from, to) => {
    let sortedFilms = [];
    const showingFilms = [...films];

    // исправить сортировку, по дате, по рейтингу(обращаться к полям объекта фильма)
    switch (sortType) {
        case SortType.BY_DATE:
            // sortedFilms = showingFilms.sort((a, b) => a.dueDate - b.dueDate);
            sortedFilms = showingFilms.sort((a, b) => a.dueDate - b.dueDate);
            break;
        case SortType.BY_RATING:
            // sortedFilms = showingFilms.sort((a, b) => b.dueDate - a.dueDate);
            sortedFilms = showingFilms.sort((a, b) => a.rating - b.rating);
            break;
        case SortType.BY_DEFAULT:
            sortedFilms = showingFilms;
            break;
    }
    return sortedFilms.slice(from, to);
};

export default class PageController {
    constructor(container) {
        this._container = container;

        this._sortingComponent = new SortingComponent();
        this._topRatedContainerComponent = new TopRatedContainerComponent();
        this._mostCommentedContainerComponent = new MostCommentedContainerComponent();
    }

    render() {

        const container = this._container;
        // 1)исправить, чтобы по умолч. выводились не все карточки, а категория, которая была выбрана(по умолч. категория All) - переменная с именем тек.категории
        render(container, this._sortingComponent, RenderPosition.BEFOREEND);

        const filmsContainerComponent = new FilmsContainerComponent(); //"films"
        render(container, filmsContainerComponent, RenderPosition.BEFOREEND);

        // const filmsContainer = container.querySelector(".films");
        // render(filmsContainer, new FilmsListComponent(), RenderPosition.BEFOREEND);
        render(filmsContainerComponent.getElement(), new FilmsListComponent(), RenderPosition.BEFOREEND);

        const filmsListContainer = container.querySelector(".films-list__container");
        // !Должно проверяться, сколько фильмов в данном разделе, а не всего
        if (FILMS_CARDS.length === 0) {

            // const filmsListContainer = container.querySelector(".films-list__container");
            render(filmsListContainer, new noDataFilmsTemplate(), RenderPosition.BEFOREEND);

        } else {

            defaultCardOutput(container);
            menuButtonElement(container, "all", FILMS_CARDS);
            menuButtonElement(container, "Watchlist", WATCHLIST_CARDS);
            menuButtonElement(container, "History", HISTORY_CARDS);
            menuButtonElement(container, "Favorites", FAVORITES_CARDS);


            let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
            console.log(currentMenuButton);

            this._sortingComponent.setSortTypeChangeHandler((sortType) => {
                showingFilmsCount = SHOWING_FILMS_COUNT_BY_BUTTON;
                // console.log(currentMenuButton);

                let films = [];
                switch (currentMenuButton) {
                    case "all": { films = FILMS_CARDS; break; }
                    case "Watchlist": { films = WATCHLIST_CARDS; break; }
                    case "History": { films = HISTORY_CARDS; break; }
                    case "Favorites": { films = FAVORITES_CARDS; break; }
                }

                const sortedFilms = getSortedFilms(films, sortType, 0, showingFilmsCount);
                console.log(sortedFilms);
                // filmsListContainer.innerHTML = ``;

                // почему не отрисовывается по-новому отсортированный список?
                menuButtonElement(container, currentMenuButton, sortedFilms);
                // renderFilms(taskListElement, sortedFilms);
                // sortedTasks.slice(0, showingTasksCount).forEach((task) => {
                //     renderTask(taskListElement, task);
                // });
                // renderLoadMoreButton();
            });



            // Top Rated films
            render(filmsContainerComponent.getElement(), this._topRatedContainerComponent, RenderPosition.BEFOREEND);
            const topRatedContainerElement = filmsContainerComponent.getElement().querySelectorAll(".films-list__container")[1];
            for (let i = 0; i < CARD__TOP_RATED_COUNT; i++) {
                const cardFilmComponent = new CardTopRatedComponent(topRatedFilms[i]);
                render(topRatedContainerElement, cardFilmComponent, RenderPosition.BEFOREEND);
                cardFilmComponent.setCardTopRatedClickHandler();
            }
            let controlsCardFilm = topRatedContainerElement.querySelectorAll(".film-card");
            controlsCardFilm.forEach((film) => render(film, new ControlsComponent(), RenderPosition.BEFOREEND));

            // Most commented films
            render(filmsContainerComponent.getElement(), this._mostCommentedContainerComponent, RenderPosition.BEFOREEND);
            const mostCommentedContainerElement = filmsContainerComponent.getElement().querySelectorAll(".films-list__container")[2];
            for (let i = 0; i < CARD__MOST_COMMENTED_COUNT; i++) {
                const cardFilmComponent = new CardMostCommentedComponent(mostCommentedFilms[i]);
                render(mostCommentedContainerElement, cardFilmComponent, RenderPosition.BEFOREEND);
                cardFilmComponent.setCardMostCommentedClickHandler();
            }
            controlsCardFilm = mostCommentedContainerElement.querySelectorAll(".film-card");
            controlsCardFilm.forEach((film) => render(film, new ControlsComponent(), RenderPosition.BEFOREEND));
        }
    }
}