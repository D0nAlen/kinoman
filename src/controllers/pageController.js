// import { FILMS_CARDS } from "../const.js";
import { render, RenderPosition, replace, remove } from "../utils/render.js";
import TopRatedContainerComponent from "../components/topRatedContainer.js";
import MostCommentedContainerComponent from "../components/mostCommentedContainer.js";
// import { generateTopRatedFilms } from "../mock/cardTopRated.js";
// import { generateMostCommentedFilms } from "../mock/cardMostCommented.js";
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

let topRatedFilms = null; //generateTopRatedFilms(CARD__TOP_RATED_COUNT);
let mostCommentedFilms = null; //generateMostCommentedFilms(CARD__MOST_COMMENTED_COUNT);
// const topRatedFilms = generateTopRatedFilms(CARD__TOP_RATED_COUNT);
// const mostCommentedFilms = generateMostCommentedFilms(CARD__MOST_COMMENTED_COUNT);

const renderFilms = (filmsListComponent, films, onDataChange, onViewChange, onDataChangeComment, api) => {
    return films.map((film) => {
        const movieController = new MovieController(filmsListComponent, onDataChange, onViewChange, onDataChangeComment, api);
        movieController.render(film);

        return movieController;
    });
};


const renderCardTopRatedFilms = (filmsContainerComponent, onDataChange, onViewChange, cardTopRatedCount, onDataChangeComment, api) => {
    const topRatedContainerComponent = new TopRatedContainerComponent();
    render(filmsContainerComponent.getElement(), topRatedContainerComponent, RenderPosition.BEFOREEND);

    const topRatedContainerElement = filmsContainerComponent.getElement().querySelectorAll(".films-list__container")[1];
    renderFilms(topRatedContainerElement, topRatedFilms.slice(0, cardTopRatedCount), onDataChange, onViewChange, onDataChangeComment, api);
};

const renderCardMostCommentedFilms = (filmsContainerComponent, onDataChange, onViewChange, cardMostCommentedCount, onDataChangeComment, api) => {
    const mostCommentedContainerComponent = new MostCommentedContainerComponent();
    render(filmsContainerComponent.getElement(), mostCommentedContainerComponent, RenderPosition.BEFOREEND);

    const mostCommentedContainerElement = filmsContainerComponent.getElement().querySelectorAll(".films-list__container")[2];
    renderFilms(mostCommentedContainerElement, mostCommentedFilms.slice(0, cardMostCommentedCount), onDataChange, onViewChange, onDataChangeComment, api);
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
    constructor(container, moviesModel, api) {
        this._container = container;
        this._moviesModel = moviesModel;
        this._api = api;

        this._showedMovieControllers = [];
        this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
        this._noDataFilmsComponent = new NoDataFilmsComponent();
        this._sortingComponent = new SortingComponent();
        this._filmsListComponent = new FilmsListComponent();
        this._showMoreButtonComponent = new ShowMoreButtonComponent();
        this._filmsContainerComponent = null;

        this._onDataChange = this._onDataChange.bind(this);
        this._onDataChangeComment = this._onDataChangeComment.bind(this);

        this._onSortTypeChange = this._onSortTypeChange.bind(this);
        this._onViewChange = this._onViewChange.bind(this);
        this._onFilterChange = this._onFilterChange.bind(this);
        this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);

        this._sortingComponent.setSortTypeChangeHandler(this._onSortTypeChange);
        this._moviesModel.setFilterChangeHandler(this._onFilterChange);
    }

    hide() {
        this._container.hide();
    }

    show() {
        this._container.show();
    }

    render() {
        const container = this._container.getElement();
        render(container, this._sortingComponent, RenderPosition.BEFOREEND);
        const films = this._moviesModel.getFilms();

        this._filmsContainerComponent = new FilmsContainerComponent();
        render(container, this._filmsContainerComponent, RenderPosition.BEFOREEND);

        render(this._filmsContainerComponent.getElement(), this._filmsListComponent, RenderPosition.BEFOREEND);


        const filmsListContainer = this._filmsListComponent.getElement().querySelector(".films-list__container");

        // const param = window.location.hash;
        // let selectedMenuButton = param.slice(1);
        // currentMenuButton = selectedMenuButton;

        // 1)вставить сообщение в случае если нет связи с сервером
        // if (films.length === 0) {
        //     render(filmsListContainer, this._noDataFilmsComponent, RenderPosition.BEFOREEND);
        // } else 
        {


            this._renderFilms(films.slice(0, this._showingFilmsCount), this._api);

            this._renderShowMoreButton();

            mostCommentedFilms = this._moviesModel.getFilmsMostCommented();
            topRatedFilms = this._moviesModel.getFilmsTopRated();


            renderCardTopRatedFilms(this._filmsContainerComponent, this._onDataChange, this._onViewChange, CARD__TOP_RATED_COUNT,this._onDataChangeComment, this._api);
            renderCardMostCommentedFilms(this._filmsContainerComponent, this._onDataChange, this._onViewChange, CARD__MOST_COMMENTED_COUNT,this._onDataChangeComment, this._api);

        }
    }

    _renderExtraCards() {
        renderCardTopRatedFilms(this._filmsContainerComponent, this._onDataChange, this._onViewChange, CARD__TOP_RATED_COUNT, this._api);
        renderCardMostCommentedFilms(this._filmsContainerComponent, this._onDataChange, this._onViewChange, CARD__MOST_COMMENTED_COUNT, this._api);
    }

    _removeExtraCards() {
        const topRatedFilmContainer = this._container.getElement().querySelectorAll(".films-list--extra")[0];
        const mostCommentedFilmContainer = this._container.getElement().querySelectorAll(".films-list--extra")[1];

        topRatedFilmContainer.remove();
        mostCommentedFilmContainer.remove();
    }

    _removeFilms() {
        this._showedMovieControllers.forEach((movieController) => movieController.destroy());
        this._showedMovieControllers = [];
    }

    _renderFilms(films) {
        const filmsListContainer = this._filmsListComponent.getElement().querySelector(".films-list__container");
        const newFilms = renderFilms(filmsListContainer, films, this._onDataChange, this._onViewChange, this._onDataChangeComment, this._api);
        this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);
        this._showingFilmsCount = this._showedMovieControllers.length;
    }

    _renderShowMoreButton() {
        remove(this._showMoreButtonComponent);

        if (this._showingFilmsCount >= this._moviesModel.getFilms().length) {
            return;
        }

        const container = this._container.getElement().querySelector(".films-list");
        render(container, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

        this._showMoreButtonComponent.setShowMoreButtonClickHandler(this._onShowMoreButtonClick);
    }

    _updateFilms(count) {
        this._removeFilms();
        this._renderFilms(this._moviesModel.getFilms().slice(0, count));

        this._renderShowMoreButton();

        this._removeExtraCards();
        this._renderExtraCards();
    }

    _onDataChange(movieController, oldData, newData) {
        // if (oldData === null) {
        //     // this._moviesModel.addComment(movieController, newData);
        // }

        // else if (newData === null) {
        //     // movieController.getFilm().comment = this._moviesModel.removeComment(movieController.getFilm().comment, oldData);
        // }
        // else {
        // console.log(newData);
        this._api.updateFilm(oldData.id, newData)
            .then((movieModel) => {
                const isSuccess = this._moviesModel.updateFilm(oldData.id, movieModel);

                if (isSuccess) {
                    this._updateFilms(this._showingFilmsCount);
                }
            })
            .catch(() => {
                // movieController.shake();
            });

        // this._moviesModel.updateFilm(oldData.id, newData);





        // const isSuccess = this._moviesModel.updateFilm(oldData.id, newData);
        // if (isSuccess) { //здесь происходит задвоение карточек при удалении/добавлении карточек по фильтрам
        //     movieController.render(newData, MovieControllerMode.DEFAULT);
        // }
        // }
    }

    _onDataChangeComment(filmId, oldData, newData) {
        // if (oldData === null) {
        //     // this._moviesModel.addComment(movieController, newData);
        // }

        // else 



        // if (newData === null) {
        // console.log(this._moviesModel.getFilms());
        // console.log(filmId);
        // this._api.getComments(filmId);



        // const currentFilm = this._moviesModel.getFilms()[0];
        // console.log();
        // movieController.getFilm().comment = this._moviesModel.removeComment(movieController.getFilm().comment, oldData);
        // currentFilm.comment = this._moviesModel.removeComment(currentFilm.comment, oldData);
        // }






        // else {
        // console.log(newData);



        // this._api.updateFilm(oldData.id, newData)
        //     .then((movieModel) => {
        //         const isSuccess = this._moviesModel.updateFilm(oldData.id, movieModel);

        //         if (isSuccess) {
        //             this._updateFilms(this._showingFilmsCount);
        //         }
        //     })
        //     .catch(() => {
        //         // movieController.shake();
        //     });

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

        this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

        const sortedFilms = getSortedFilms(films, this._sortingComponent.getSortType(), prevFilmsCount, this._showingFilmsCount);
        this._renderFilms(sortedFilms);

        if (this._showingFilmsCount >= films.length) {
            remove(this._showMoreButtonComponent);
        }
    }

    _onFilterChange() {
        this._updateFilms(SHOWING_FILMS_COUNT_ON_START);
    }
}