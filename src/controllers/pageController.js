import { FILMS_CARDS, WATCHLIST_CARDS, HISTORY_CARDS, FAVORITES_CARDS } from "../const.js";
import { render, RenderPosition, replace, remove } from "../utils/render.js";
import TopRatedContainerComponent from "../components/topRatedContainer.js";
import MostCommentedContainerComponent from "../components/mostCommentedContainer.js";
import { generateTopRatedFilms } from "../mock/cardTopRated.js";
import { generateMostCommentedFilms } from "../mock/cardMostCommented.js";
import SortingComponent, { SortType } from "../components/sort.js";
import FilmsContainerComponent from "../components/filmsContainer.js";
import FilmsListComponent from "../components/filmsList.js";
import NoDataFilmsComponent from "../components/no-data.js";
import ShowMoreButtonComponent from "../components/showMoreButton.js";
// import { generateFilms } from "../mock/cardFilm.js";
import MovieController from "./movieController.js";


const CARD__TOP_RATED_COUNT = 2;
const CARD__MOST_COMMENTED_COUNT = 2;
let SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
let currentMenuButton = "all";

const topRatedFilms = generateTopRatedFilms(CARD__TOP_RATED_COUNT);
const mostCommentedFilms = generateMostCommentedFilms(CARD__MOST_COMMENTED_COUNT);

const renderFilms = (filmsListComponent, films, onDataChange, onViewChange) => {
    // const filmsListContainer = filmsListComponent.querySelector(".films-list__container");
    return films.map((film) => {
        const movieController = new MovieController(filmsListComponent, onDataChange, onViewChange);
        movieController.render(film);

        return movieController;
    });
};

const renderCardTopRatedFilms = (filmsContainerComponent, onDataChange, onViewChange) => {
    const topRatedContainerComponent = new TopRatedContainerComponent();
    render(filmsContainerComponent.getElement(), topRatedContainerComponent, RenderPosition.BEFOREEND);

    const topRatedContainerElement = filmsContainerComponent.getElement().querySelectorAll(".films-list__container")[1];
    for (let i = 0; i < CARD__TOP_RATED_COUNT; i++) {
        const movieController = new MovieController(topRatedContainerElement, onDataChange, onViewChange);
        movieController.render(topRatedFilms[i]);
    }
};

const renderCardMostCommentedFilms = (filmsContainerComponent, onDataChange, onViewChange) => {
    const mostCommentedContainerComponent = new MostCommentedContainerComponent();
    render(filmsContainerComponent.getElement(), mostCommentedContainerComponent, RenderPosition.BEFOREEND);

    const mostCommentedContainerElement = filmsContainerComponent.getElement().querySelectorAll(".films-list__container")[2];
    for (let i = 0; i < CARD__MOST_COMMENTED_COUNT; i++) {
        const movieController = new MovieController(mostCommentedContainerElement, onDataChange, onViewChange);
        movieController.render(mostCommentedFilms[i]);
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

// const renderStandardCardFilms = (idButton, FILMS_LIST, onDataChange, onViewChange) => {
//     const films = generateFilms(FILMS_LIST);
//     const showMoreButton = new ShowMoreButtonComponent();
//     let countFilmsList = FILMS_LIST.length;
//     currentMenuButton = idButton;
//     SHOWING_FILMS_COUNT_ON_START = 5;

//     const filmsContainer = siteMainElement.querySelector(".films");
//     let filmsList = filmsContainer.querySelector(".films-list");
//     filmsList.remove();

//     render(filmsContainer, new FilmsListComponent(), RenderPosition.AFTERBEGIN);

//     filmsList = filmsContainer.querySelector(".films-list");

//     const filmsListContainer = filmsContainer.querySelector(".films-list__container");

//     if (FILMS_LIST.length === 0) {
//         render(filmsListContainer, new NoDataFilmsComponent(), RenderPosition.BEFOREEND);
//     } else {
//         if (countFilmsList <= SHOWING_FILMS_COUNT_ON_START) {
//             SHOWING_FILMS_COUNT_ON_START = countFilmsList;
//         }

//         // renderFilms_all(films, siteMainElement, onDataChange, onViewChange);
//         for (let i = 0; i < SHOWING_FILMS_COUNT_ON_START; i++) {
//             // renderNormalCardFilm(films[i], onDataChange, onViewChange);
//         }

//         // button "Show more"
//         render(filmsList, showMoreButton, RenderPosition.BEFOREEND);
//         showMoreButtonElement(showMoreButton, films, onDataChange, onViewChange);

//         if (countFilmsList <= SHOWING_FILMS_COUNT_ON_START) {
//             showMoreButton.getElement().remove();
//         }
//     }
// };

// const menuButtonElement = (idButton, FILMS_LIST, onDataChange, onViewChange) => {
//     const nameButton = document.getElementById(idButton);

//     nameButton.addEventListener(`click`, () => {
//         renderStandardCardFilms(idButton, FILMS_LIST, onDataChange, onViewChange);
//     });
// };

// const showMoreButtonElement = (showMoreButton, films, onDataChange, onViewChange) => {
//     let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
//     let cardFilmsCount = films.length;
//     let showingFilmsCountByButton = SHOWING_FILMS_COUNT_BY_BUTTON;
//     // const filmsListContainer = siteMainElement.querySelector(".films-list__container");

//     showMoreButton.setShowMoreButtonClickHandler(() => {
//         const prevFilmsCount = showingFilmsCount;
//         showingFilmsCount = showingFilmsCount + showingFilmsCountByButton;
//         films
//             .slice(prevFilmsCount, showingFilmsCount)
//             .forEach((film) => {
//                 renderNormalCardFilm(film, onDataChange, onViewChange);
//             }
//             );


//             // if (countFilmsList <= SHOWING_FILMS_COUNT_ON_START) {
//             //     showMoreButton.getElement().remove();
//             // }
//         if (showingFilmsCount >= cardFilmsCount) {
//             showMoreButton.getElement().remove();
//         }
//     });
// };

export default class PageController {
    constructor(container, menuComponent) {
        this._container = container;
        this._films = [];
        this._menuComponent = menuComponent;

        this._showedMovieControllers = [];
        this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
        this._noDataFilmsComponent = new NoDataFilmsComponent();
        this._sortingComponent = new SortingComponent();
        this._filmsListComponent = new FilmsListComponent();// this._tasksComponent = new TasksComponent();
        this._showMoreButtonComponent = new ShowMoreButtonComponent();

        this._onDataChange = this._onDataChange.bind(this);
        this._onSortTypeChange = this._onSortTypeChange.bind(this);
        this._onViewChange = this._onViewChange.bind(this);

        this._sortingComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    }

    render() {
        const container = this._container;
        render(container, this._sortingComponent, RenderPosition.BEFOREEND);

        const filmsContainerComponent = new FilmsContainerComponent(); //"films"
        render(container, filmsContainerComponent, RenderPosition.BEFOREEND);

        render(filmsContainerComponent.getElement(), this._filmsListComponent, RenderPosition.BEFOREEND);


        const filmsListContainer = this._filmsListComponent.getElement().querySelector(".films-list__container");

        const param = window.location.hash;
        let selectedMenuButton = param.slice(1);
        currentMenuButton = selectedMenuButton;

        if (FILMS_CARDS.length === 0) {
            render(filmsListContainer, this._noDataFilmsComponent, RenderPosition.BEFOREEND);
        } else {
            this._films = getFilms();
            if (selectedMenuButton === "") {
                selectedMenuButton = "all";
            }
            // 1)после нажатия на кнопку меню не везде срабатывает сортировка!
            const panelMenuButtons = container.querySelector(".main-navigation__items");
            panelMenuButtons.querySelectorAll(`.main-navigation__item`).forEach(menuItem => {
                menuItem.addEventListener(`click`, () => {

                    currentMenuButton = menuItem.getAttribute("id");
                    this._films = getFilms();
                    console.log(this._films);
                    filmsListContainer.innerHTML = ``;
                    const newFilms = renderFilms(filmsListContainer, this._films.slice(0, this._showingFilmsCount), this._onDataChange, this._onViewChange);
                    this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);
                    this._renderShowMoreButton();
                });
            });


            const newFilms = renderFilms(filmsListContainer, this._films.slice(0, this._showingFilmsCount), this._onDataChange, this._onViewChange);
            this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);

            this._renderShowMoreButton();

            // 1)нет обновления страницы при выборе другой вкладки, но логика переключения вкладок работает верно после F5!
            // renderStandardCardFilms(selectedMenuButton, this._films, this._onDataChange, this._onViewChange); //отрисовка по умолчанию и обновлению страницы
            // menuButtonElement("all", FILMS_CARDS, this._onDataChange, this._onViewChange);
            // menuButtonElement("Watchlist", WATCHLIST_CARDS, this._onDataChange, this._onViewChange);
            // menuButtonElement("History", HISTORY_CARDS, this._onDataChange, this._onViewChange);
            // menuButtonElement("Favorites", FAVORITES_CARDS, this._onDataChange, this._onViewChange);


            // const newFilms = renderTasks(taskListElement, this._tasks.slice(0, this._showingTasksCount), this._onDataChange, this._onViewChange);
            // this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);

            // 1)вынести сортировку в отдельную функцию!!!
            // this._sortingComponent.setSortTypeChangeHandler((sortType) => {

            //     this._films = getFilms();
            //     const sortedFilms = getSortedFilms(this._films, sortType, 0);

            //     renderStandardCardFilms(currentMenuButton, sortedFilms, this._onDataChange, this._onViewChange);
            // });

            // renderCardTopRatedFilms(filmsContainerComponent, this._onDataChange, this._onViewChange);
            // renderCardMostCommentedFilms(filmsContainerComponent, this._onDataChange, this._onViewChange);
        }
    }

    _renderShowMoreButton() {
        if (this._showingFilmsCount >= this._films.length) {
            return;
        }

        const container = this._container.querySelector(".films-list");
        render(container, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

        this._showMoreButtonComponent.setShowMoreButtonClickHandler(() => {

            const prevFilmsCount = this._showingFilmsCount;
            const filmsListContainer = this._filmsListComponent.getElement().querySelector(".films-list__container");

            this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

            const sortedFilms = getSortedFilms(this._films, this._sortingComponent.getSortType(), prevFilmsCount, this._showingFilmsCount);
            const newFilms = renderFilms(filmsListContainer, sortedFilms, this._onDataChange, this._onViewChange);

            this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);

            if (this._showingFilmsCount >= this._films.length) {
                remove(this._showMoreButtonComponent);
            }
        });
    }

    _onDataChange(movieController, oldData, newData) {
        const index = this._films.findIndex((it) => it === oldData);

        if (index === -1) {
            return;
        }

        this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

        movieController.render(this._films[index]);
    }
    // _onDataChange(filmCard, filmList, typeButton) {
    // let property = null;
    // switch (typeButton) {
    //     case "Watchlist": { property = filmCard.addToWatchlist; break; }
    //     case "History": { property = filmCard.markAsWatched; break; }
    //     case "Favorites": { property = filmCard.markAsFavorite; break; }
    // }

    // if (property) {
    //     filmList.push(filmCard);
    // } else {
    //     const index = filmList.findIndex((it) => it === filmCard);
    //     filmList.splice(index, 1);

    //     if (currentMenuButton === typeButton) {
    //         renderStandardCardFilms( currentMenuButton, filmList, this._onDataChange);
    //     }
    // }
    // }

    _onViewChange() {
        this._showedMovieControllers.forEach((it) => it.setDefaultView());
    }

    _onSortTypeChange(sortType) {
        this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

        const sortedFilms = getSortedFilms(this._films, sortType, 0, this._showingFilmsCount);
        const filmsListContainer = this._filmsListComponent.getElement().querySelector(".films-list__container");
        filmsListContainer.innerHTML = ``;

        const newFilms = renderFilms(filmsListContainer, sortedFilms, this._onDataChange, this._onViewChange);
        this._showedMovieControllers = newFilms;

        this._renderShowMoreButton();
    }
}