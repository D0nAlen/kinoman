import { FILMS_CARDS } from "../const.js";
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
import MovieController, { Mode as MovieControllerMode } from "./movieController.js";

const CARD__TOP_RATED_COUNT = 2;
const CARD__MOST_COMMENTED_COUNT = 2;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
// let currentMenuButton = "all";

const topRatedFilms = generateTopRatedFilms(CARD__TOP_RATED_COUNT);
const mostCommentedFilms = generateMostCommentedFilms(CARD__MOST_COMMENTED_COUNT);

const renderFilms = (filmsListComponent, films, onDataChange, onViewChange) => {
    return films.map((film) => {
        const movieController = new MovieController(filmsListComponent, onDataChange, onViewChange);
        movieController.render(film);

        return movieController;
    });
};

// 1)сделать по принципу фильтра, отобразить из All все фильмы, которые имеют нужный флаг.
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

        this._showedMovieControllers = [];
        this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
        this._noDataFilmsComponent = new NoDataFilmsComponent();
        this._sortingComponent = new SortingComponent();
        this._filmsListComponent = new FilmsListComponent();
        this._showMoreButtonComponent = new ShowMoreButtonComponent();

        this._onDataChange = this._onDataChange.bind(this);
        this._onSortTypeChange = this._onSortTypeChange.bind(this);
        this._onViewChange = this._onViewChange.bind(this);
        this._onFilterChange = this._onFilterChange.bind(this);
        this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);

        this._sortingComponent.setSortTypeChangeHandler(this._onSortTypeChange);
        this._moviesModel.setFilterChangeHandler(this._onFilterChange);
    }

    render() {
        const container = this._container;
        render(container, this._sortingComponent, RenderPosition.BEFOREEND);
        const films = this._moviesModel.getFilms();

        const filmsContainerComponent = new FilmsContainerComponent();
        render(container, filmsContainerComponent, RenderPosition.BEFOREEND);

        render(filmsContainerComponent.getElement(), this._filmsListComponent, RenderPosition.BEFOREEND);


        const filmsListContainer = this._filmsListComponent.getElement().querySelector(".films-list__container");

        // const param = window.location.hash;
        // let selectedMenuButton = param.slice(1);
        // currentMenuButton = selectedMenuButton;

        if (FILMS_CARDS.length === 0) {
            render(filmsListContainer, this._noDataFilmsComponent, RenderPosition.BEFOREEND);
        } else {
            // if (selectedMenuButton === "") {
            //     selectedMenuButton = "all";
            // }

            this._renderFilms(films.slice(0, this._showingFilmsCount));


            // const newFilms = renderFilms(filmsListContainer, films, this._onDataChange, this._onViewChange);
            // this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);
            this._renderShowMoreButton();

            renderCardTopRatedFilms(filmsContainerComponent, this._onDataChange, this._onViewChange);
            renderCardMostCommentedFilms(filmsContainerComponent, this._onDataChange, this._onViewChange);
        }
    }

    _removeFilms() {
        this._showedMovieControllers.forEach((movieController) => movieController.destroy());
        this._showedMovieControllers = [];
    }


    _renderFilms(films) {
        const filmsListContainer = this._filmsListComponent.getElement().querySelector(".films-list__container");
        const newFilms = renderFilms(filmsListContainer, films, this._onDataChange, this._onViewChange);
        this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);
        this._showingFilmsCount = this._showedMovieControllers.length;
    }

    _renderShowMoreButton() {
        remove(this._showMoreButtonComponent);

        if (this._showingFilmsCount >= this._moviesModel.getFilms().length) {
            return;
        }

        const container = this._container.querySelector(".films-list");
        render(container, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

        this._showMoreButtonComponent.setShowMoreButtonClickHandler(this._onShowMoreButtonClick);
    }

    _updateFilms(count) {
        this._removeFilms();
        this._renderFilms(this._moviesModel.getFilms().slice(0, count));
        this._renderShowMoreButton();
    }


    _onDataChange(movieController, oldData, newData) {
        const isSuccess = this._moviesModel.updateFilm(oldData.id, newData);

        if (isSuccess) {
            movieController.render(newData, MovieControllerMode.DEFAULT);
        }
    }

    _onViewChange() {
        this._showedMovieControllers.forEach((it) => it.setDefaultView());
    }

    _onSortTypeChange(sortType) {
        this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

        const sortedFilms = getSortedFilms(this._moviesModel.getFilms(), sortType, 0, this._showingFilmsCount);

        this._removeFilms();
        this._renderFilms(sortedFilms);

        this._renderShowMoreButton();
    }

    _onShowMoreButtonClick() {
            const prevFilmsCount = this._showingFilmsCount;
            const films = this._moviesModel.getFilms();

            // const filmsListContainer = this._filmsListComponent.getElement().querySelector(".films-list__container");

            this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

            const sortedFilms = getSortedFilms(films, this._sortingComponent.getSortType(), prevFilmsCount, this._showingFilmsCount);
            this._renderFilms(sortedFilms);
            // const newFilms = renderFilms(filmsListContainer, sortedFilms, this._onDataChange, this._onViewChange);
            // this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);

            if (this._showingFilmsCount >= films.length) {
                remove(this._showMoreButtonComponent);
            }
    }

    _onFilterChange() {
        this._updateFilms(SHOWING_FILMS_COUNT_ON_START);
    }
}