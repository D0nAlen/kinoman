import { FILMS_CARDS, WATCHLIST_CARDS, HISTORY_CARDS, FAVORITES_CARDS } from "../const.js";
import { render, RenderPosition } from "../utils/render.js";
import TopRatedContainerComponent from "../components/topRatedContainer.js";
import MostCommentedContainerComponent from "../components/mostCommentedContainer.js";
import { generateTopRatedFilms } from "../mock/cardTopRated.js";
import { generateMostCommentedFilms } from "../mock/cardMostCommented.js";
import SortingComponent, { SortType } from "../components/sort.js";
import FilmsContainerComponent from "../components/filmsContainer.js";
import FilmsListComponent from "../components/filmsList.js";
import NoDataFilmsTemplate from "../components/no-data.js";
import ShowMoreButtonComponent from "../components/showMoreButton.js";
import { generateFilms } from "../mock/cardFilm.js";
import MovieController from "./movieController.js";
import { generateMenu } from "../mock/menu.js";
import MenuComponent from "../components/menu.js";

const CARD__TOP_RATED_COUNT = 2;
const CARD__MOST_COMMENTED_COUNT = 2;
let SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
let currentMenuButton = "all";

const topRatedFilms = generateTopRatedFilms(CARD__TOP_RATED_COUNT);
const mostCommentedFilms = generateMostCommentedFilms(CARD__MOST_COMMENTED_COUNT);


// const renderTasks = (taskListElement, tasks, onDataChange, onViewChange) => {
//     return tasks.map((task) => {
//         const taskController = new TaskController(taskListElement, onDataChange, onViewChange);
//         taskController.render(task);

//         return taskController;
//     });
// };

// 1)функция должна возвращать movieController(создавать не по одному контроллеру и фильму за раз,
//  а по контроллеру для каждой карточки перебором, всем сразу(в заданном списке карточек фильмов)),
// const renderFilms_all = (films, siteMainElement, onDataChange, onViewChange) => {
//     return films.map((film) => {
//         const filmsListContainer = siteMainElement.querySelector(".films-list__container");

//         const movieController = new MovieController(siteMainElement, onDataChange, onViewChange);
//         movieController.render(film, filmsListContainer);

//         return movieController;
//     });
// };

const renderNormalCardFilm = (film, siteMainElement, onDataChange, onViewChange) => {
    const filmsListContainer = siteMainElement.querySelector(".films-list__container");

    const movieController = new MovieController(siteMainElement, onDataChange, onViewChange);
    movieController.render(film, filmsListContainer);
};

const renderCardTopRatedFilms = (siteMainElement, filmsContainerComponent, onDataChange, onViewChange) => {
    const topRatedContainerComponent = new TopRatedContainerComponent();
    render(filmsContainerComponent.getElement(), topRatedContainerComponent, RenderPosition.BEFOREEND);

    const topRatedContainerElement = filmsContainerComponent.getElement().querySelectorAll(".films-list__container")[1];
    for (let i = 0; i < CARD__TOP_RATED_COUNT; i++) {
        const movieController = new MovieController(siteMainElement, onDataChange, onViewChange);
        movieController.render(topRatedFilms[i], topRatedContainerElement);
    }
};

const renderCardMostCommentedFilms = (siteMainElement, filmsContainerComponent, onDataChange, onViewChange) => {
    const mostCommentedContainerComponent = new MostCommentedContainerComponent();
    render(filmsContainerComponent.getElement(), mostCommentedContainerComponent, RenderPosition.BEFOREEND);

    const mostCommentedContainerElement = filmsContainerComponent.getElement().querySelectorAll(".films-list__container")[2];
    for (let i = 0; i < CARD__MOST_COMMENTED_COUNT; i++) {
        const movieController = new MovieController(siteMainElement, onDataChange, onViewChange);
        movieController.render(mostCommentedFilms[i], mostCommentedContainerElement);
    }
};

const getFilms = () => {
    let films = [];
    switch (currentMenuButton) {
        case "": { films = [...FILMS_CARDS]; break; }
        case "all": { films = [...FILMS_CARDS]; break; }
        case "Watchlist": { films = [...WATCHLIST_CARDS]; break; }
        case "History": { films = [...HISTORY_CARDS]; break; }
        case "Favorites": { films = [...FAVORITES_CARDS]; break; }
    }
    return films;
};

const getSortedFilms = (films, sortType, from, to) => {
    let sortedFilms = [];
    const showingFilms = [...films];

    switch (sortType) {
        case SortType.BY_DATE:
            sortedFilms = showingFilms.sort((a, b) => b.year - a.year);
            break;
        case SortType.BY_RATING:
            sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
            break;
        case SortType.BY_DEFAULT:
            sortedFilms = showingFilms;
            break;
    }
    return sortedFilms.slice(from, to);
};

const renderStandardCardFilms = (siteMainElement, idButton, FILMS_LIST, onDataChange, onViewChange) => {
    const films = generateFilms(FILMS_LIST);
    const showMoreButton = new ShowMoreButtonComponent();
    let countFilmsList = FILMS_LIST.length;
    currentMenuButton = idButton;
    SHOWING_FILMS_COUNT_ON_START = 5;

    const filmsContainer = siteMainElement.querySelector(".films");
    let filmsList = filmsContainer.querySelector(".films-list");
    filmsList.remove();

    render(filmsContainer, new FilmsListComponent(), RenderPosition.AFTERBEGIN);

    filmsList = filmsContainer.querySelector(".films-list");

    const filmsListContainer = filmsContainer.querySelector(".films-list__container");

    if (FILMS_LIST.length === 0) {
        render(filmsListContainer, new NoDataFilmsTemplate(), RenderPosition.BEFOREEND);
    } else {
        if (countFilmsList <= SHOWING_FILMS_COUNT_ON_START) {
            SHOWING_FILMS_COUNT_ON_START = countFilmsList;
        }

        // renderFilms_all(films, siteMainElement, onDataChange, onViewChange);
        for (let i = 0; i < SHOWING_FILMS_COUNT_ON_START; i++) {
            renderNormalCardFilm(films[i], siteMainElement, onDataChange, onViewChange);
        }

        // button "Show more"
        render(filmsList, showMoreButton, RenderPosition.BEFOREEND);
        showMoreButtonElement(showMoreButton, siteMainElement, films, onDataChange, onViewChange);

        if (countFilmsList <= SHOWING_FILMS_COUNT_ON_START) {
            showMoreButton.getElement().remove();
        }
    }
};

const menuButtonElement = (siteMainElement, idButton, FILMS_LIST, onDataChange, onViewChange) => {
    const nameButton = document.getElementById(idButton);

    nameButton.addEventListener(`click`, () => {
        renderStandardCardFilms(siteMainElement, idButton, FILMS_LIST, onDataChange, onViewChange);
    });
};

const showMoreButtonElement = (showMoreButton, siteMainElement, films, onDataChange, onViewChange) => {
    let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    let cardFilmsCount = films.length;
    let showingFilmsCountByButton = SHOWING_FILMS_COUNT_BY_BUTTON;
    // const filmsListContainer = siteMainElement.querySelector(".films-list__container");

    showMoreButton.setShowMoreButtonClickHandler(() => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount = showingFilmsCount + showingFilmsCountByButton;
        films
            .slice(prevFilmsCount, showingFilmsCount)
            .forEach((film) => {
                renderNormalCardFilm(film, siteMainElement, onDataChange, onViewChange);
            }
            );

        if (showingFilmsCount >= cardFilmsCount) {
            showMoreButton.getElement().remove();
        }
    });
};

export default class PageController {
    constructor(container) {
        this._container = container;
        this._films = [];
        this._showedMovieControllers = [];

        this._sortingComponent = new SortingComponent();
        this._onDataChange = this._onDataChange.bind(this);
        this._onViewChange = this._onViewChange.bind(this);
    }

    render(films) {

        const container = this._container;
        this._films = films;
        render(container, this._sortingComponent, RenderPosition.BEFOREEND);

        const filmsContainerComponent = new FilmsContainerComponent(); //"films"
        render(container, filmsContainerComponent, RenderPosition.BEFOREEND);

        render(filmsContainerComponent.getElement(), new FilmsListComponent(), RenderPosition.BEFOREEND);

        const filmsListContainer = container.querySelector(".films-list__container");

        const param = window.location.hash;
        let selectedMenuButton = param.slice(1);
        currentMenuButton = selectedMenuButton;

        if (FILMS_CARDS.length === 0) {
            render(filmsListContainer, new NoDataFilmsTemplate(), RenderPosition.BEFOREEND);
        } else {

            this._films = getFilms();
            if (selectedMenuButton === "") {
                selectedMenuButton = "all";
            }

            renderStandardCardFilms(container, selectedMenuButton, this._films, this._onDataChange, this._onViewChange); //отрисовка по умолчанию и обновлению страницы
            menuButtonElement(container, "all", FILMS_CARDS, this._onDataChange, this._onViewChange);
            menuButtonElement(container, "Watchlist", WATCHLIST_CARDS, this._onDataChange, this._onViewChange);
            menuButtonElement(container, "History", HISTORY_CARDS, this._onDataChange, this._onViewChange);
            menuButtonElement(container, "Favorites", FAVORITES_CARDS, this._onDataChange, this._onViewChange);


            // const newFilms = renderTasks(taskListElement, this._tasks.slice(0, this._showingTasksCount), this._onDataChange, this._onViewChange);
            // this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);

            // 1)вынести сортировку в отдельную функцию!!!
            this._sortingComponent.setSortTypeChangeHandler((sortType) => {

                this._films = getFilms();
                const sortedFilms = getSortedFilms(this._films, sortType, 0);

                renderFilms(container, currentMenuButton, sortedFilms, this._onDataChange, this._onViewChange);
            });

            renderCardTopRatedFilms(container, filmsContainerComponent, this._onDataChange, this._onViewChange);
            renderCardMostCommentedFilms(container, filmsContainerComponent, this._onDataChange, this._onViewChange);
        }
    }

    _onDataChange(filmCard, filmList, typeButton) {
        let property = null;
        switch (typeButton) {
            case "Watchlist": { property = filmCard.addToWatchlist; break; }
            case "History": { property = filmCard.markAsWatched; break; }
            case "Favorites": { property = filmCard.markAsFavorite; break; }
        }

        if (property) {
            filmList.push(filmCard);
        } else {
            const index = filmList.findIndex((it) => it === filmCard);
            filmList.splice(index, 1);

            if (currentMenuButton === typeButton) {
                renderStandardCardFilms(this._container, currentMenuButton, filmList, this._onDataChange);
            }
        }
    }

    _onViewChange() {
        this._showedMovieControllers.forEach((it) => it.setDefaultView());
    }
}