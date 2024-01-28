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
import MovieController from "./movieController.js";


const CARD__TOP_RATED_COUNT = 2;
const CARD__MOST_COMMENTED_COUNT = 2;
let SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
let currentMenuButton = "all";

const topRatedFilms = generateTopRatedFilms(CARD__TOP_RATED_COUNT);
const mostCommentedFilms = generateMostCommentedFilms(CARD__MOST_COMMENTED_COUNT);

const renderFilms = (filmsListComponent, films, onDataChange, onViewChange) => {
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
    renderFilms(topRatedContainerElement, topRatedFilms, onDataChange, onViewChange);
};

const renderCardMostCommentedFilms = (filmsContainerComponent, onDataChange, onViewChange) => {
    const mostCommentedContainerComponent = new MostCommentedContainerComponent();
    render(filmsContainerComponent.getElement(), mostCommentedContainerComponent, RenderPosition.BEFOREEND);

    const mostCommentedContainerElement = filmsContainerComponent.getElement().querySelectorAll(".films-list__container")[2];
    renderFilms(mostCommentedContainerElement, mostCommentedFilms, onDataChange, onViewChange);
};

// const getFilms = () => {
//     let films = [];
//     switch (currentMenuButton) {
//         case "": { films = [...FILMS_CARDS]; break; }
//         case "all": { films = [...FILMS_CARDS]; break; }
//         case "Watchlist": { films = [...WATCHLIST_CARDS]; break; }
//         case "History": { films = [...HISTORY_CARDS]; break; }
//         case "Favorites": { films = [...FAVORITES_CARDS]; break; }
//     }
//     return films;
// };

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

export default class PageController {
    constructor(container, moviesModel) {
        this._container = container;
        this._moviesModel = moviesModel;
        // this._films = [];
        // this._menuComponent = menuComponent;

        this._showedMovieControllers = [];
        this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
        this._noDataFilmsComponent = new NoDataFilmsComponent();
        this._sortingComponent = new SortingComponent();
        this._filmsListComponent = new FilmsListComponent();
        this._showMoreButtonComponent = new ShowMoreButtonComponent();

        this._onDataChange = this._onDataChange.bind(this);
        this._onSortTypeChange = this._onSortTypeChange.bind(this);
        this._onViewChange = this._onViewChange.bind(this);

        this._sortingComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    }

    render() {
        const container = this._container;
        render(container, this._sortingComponent, RenderPosition.BEFOREEND);
        const films = this._moviesModel.getFilms();

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
            // this._films = getFilms();
            if (selectedMenuButton === "") {
                selectedMenuButton = "all";
            }

            this._renderFilms(films.slice(0, this._showingFilmsCount));


            // const newFilms = renderFilms(filmsListContainer, films, this._onDataChange, this._onViewChange);
            // this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);
            this._renderShowMoreButton();

            renderCardTopRatedFilms(filmsContainerComponent, this._onDataChange, this._onViewChange);
            renderCardMostCommentedFilms(filmsContainerComponent, this._onDataChange, this._onViewChange);
        }
    }

    _renderFilms(films) {
        const filmsListContainer = this._filmsListComponent.getElement().querySelector(".films-list__container");
        const newFilms = renderFilms(filmsListContainer, films, this._onDataChange, this._onViewChange);
        this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);
        this._showingFilmsCount = this._showedMovieControllers.length;
    }

    _renderShowMoreButton() {
        const films = this._moviesModel.getFilms();
        if (this._showingFilmsCount >= films.length) {
            return;
        }

        const container = this._container.querySelector(".films-list");
        render(container, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

        this._showMoreButtonComponent.setShowMoreButtonClickHandler(() => {

            const prevFilmsCount = this._showingFilmsCount;
            const filmsListContainer = this._filmsListComponent.getElement().querySelector(".films-list__container");

            this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

            const sortedFilms = getSortedFilms(films, this._sortingComponent.getSortType(), prevFilmsCount, this._showingFilmsCount);
            const newFilms = renderFilms(filmsListContainer, sortedFilms, this._onDataChange, this._onViewChange);

            this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);

            if (this._showingFilmsCount >= films.length) {
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

    _onViewChange() {
        this._showedMovieControllers.forEach((it) => it.setDefaultView());
    }

    _onSortTypeChange(sortType) {
        this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

        const sortedFilms = getSortedFilms(this._moviesModel.getFilms(), sortType, 0, this._showingFilmsCount);
        const filmsListContainer = this._filmsListComponent.getElement().querySelector(".films-list__container");
        filmsListContainer.innerHTML = ``;

        const newFilms = renderFilms(filmsListContainer, sortedFilms, this._onDataChange, this._onViewChange);
        this._showedMovieControllers = newFilms;

        this._renderShowMoreButton();
    }
}