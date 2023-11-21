import { FILMS_CARDS, WATCHLIST_CARDS, HISTORY_CARDS, FAVORITES_CARDS } from "../const.js";
import { render, RenderPosition } from "../utils/render.js";
import CardMostCommentedComponent from "../components/cardMostCommented.js";
import TopRatedContainerComponent from "../components/topRatedContainer.js";
import MostCommentedContainerComponent from "../components/mostCommentedContainer.js";
import { generateTopRatedFilms } from "../mock/cardTopRated.js";
import { generateMostCommentedFilms } from "../mock/cardMostCommented.js";
import CardTopRatedComponent from "../components/cardTopRated.js";
import ControlsComponent from "../components/controls.js";
import SortingComponent, { SortType } from "../components/sorting.js";
import FilmsContainerComponent from "../components/filmsContainer.js";
import FilmsListComponent from "../components/filmsList.js";
import NoDataFilmsTemplate from "../components/no-data.js";
import ShowMoreButtonComponent from "../components/showMoreButton.js";
import { generateFilms } from "../mock/cardFilm.js";
import CardFilmComponent from "../components/cardFilm.js";

const CARD__TOP_RATED_COUNT = 2;
const CARD__MOST_COMMENTED_COUNT = 2;
let SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
let currentMenuButton = "all";

const topRatedFilms = generateTopRatedFilms(CARD__TOP_RATED_COUNT);
const mostCommentedFilms = generateMostCommentedFilms(CARD__MOST_COMMENTED_COUNT);

const getFilms = () => {
    let films = [];
    switch (currentMenuButton) {
        case "all": { films = [...FILMS_CARDS]; break; }
        case "Watchlist": { films = [...WATCHLIST_CARDS]; break; }
        case "History": { films = [...HISTORY_CARDS]; break; }
        case "Favorites": { films = [...FAVORITES_CARDS]; break; }
    }

    return films;
};

// 1)перенесены все функции и переменные из menuButton(WIP)
// 2)не работает сохранение категории фильмов при F5
const renderFilms = (siteMainElement, idButton, FILMS_LIST) => {

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

    const filmsListContainer = filmsContainer.querySelector(
        ".films-list__container"
    );

    if (FILMS_LIST.length === 0) {
        render(filmsListContainer, new NoDataFilmsTemplate(), RenderPosition.BEFOREEND);
    } else {
        if (countFilmsList <= SHOWING_FILMS_COUNT_ON_START) {
            SHOWING_FILMS_COUNT_ON_START = countFilmsList;
        }

        for (let i = 0; i < SHOWING_FILMS_COUNT_ON_START; i++) {
            const cardFilmComponent = new CardFilmComponent(films[i]);
            cardFilmComponent.setCardFilmClickHandler();

            render(filmsListContainer, cardFilmComponent, RenderPosition.BEFOREEND);
        }
        const controlsCardFilm = filmsListContainer.querySelectorAll(".film-card");
        controlsCardFilm.forEach((film) =>
            render(film, new ControlsComponent(), RenderPosition.BEFOREEND)
        );

        // button "Show more"
        render(filmsList, showMoreButton, RenderPosition.BEFOREEND);
        showMoreButtonElement(showMoreButton, filmsListContainer, films);

        if (countFilmsList <= SHOWING_FILMS_COUNT_ON_START) {
            showMoreButton.getElement().remove();
        }
    }
}

const menuButtonElement = (siteMainElement, idButton, FILMS_LIST) => {
    const nameButton = document.getElementById(idButton);

    nameButton.addEventListener(`click`, () => {
        renderFilms(siteMainElement, idButton, FILMS_LIST);
        currentMenuButton = idButton;
    });
};

const showMoreButtonElement = (showMoreButton, filmsListContainer, films) => {
    let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    let cardFilmsCount = films.length;
    let showingFilmsCountByButton = SHOWING_FILMS_COUNT_BY_BUTTON;

    showMoreButton.setShowMoreButtonClickHandler(() => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount = showingFilmsCount + showingFilmsCountByButton;
        films
            .slice(prevFilmsCount, showingFilmsCount)
            .forEach((film) => {
                const cardFilmComponent = new CardFilmComponent(film);
                render(filmsListContainer, cardFilmComponent, RenderPosition.BEFOREEND);
                cardFilmComponent.setCardFilmClickHandler();
            }
            );

        const controlsCardFilm = filmsListContainer.querySelectorAll(".film-card");
        controlsCardFilm.forEach((film) =>
            render(film, new ControlsComponent(), RenderPosition.BEFOREEND)
        );

        if (showingFilmsCount >= cardFilmsCount) {
            showMoreButton.getElement().remove();
        }
    });
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
    constructor(container) {
        this._container = container;

        this._sortingComponent = new SortingComponent();
        this._topRatedContainerComponent = new TopRatedContainerComponent();
        this._mostCommentedContainerComponent = new MostCommentedContainerComponent();
    }

    render() {

        const container = this._container;
        render(container, this._sortingComponent, RenderPosition.BEFOREEND);

        const filmsContainerComponent = new FilmsContainerComponent(); //"films"
        render(container, filmsContainerComponent, RenderPosition.BEFOREEND);

        render(filmsContainerComponent.getElement(), new FilmsListComponent(), RenderPosition.BEFOREEND);

        const filmsListContainer = container.querySelector(".films-list__container");

        const param = window.location.hash;
        const selectedMenuButton = param.slice(1);

        if (FILMS_CARDS.length === 0) {
            render(filmsListContainer, new NoDataFilmsTemplate(), RenderPosition.BEFOREEND);
        } else {

            let films = getFilms();
            if (films.length === 0) {
                films = [...FILMS_CARDS];
            }

            renderFilms(container, selectedMenuButton, films);//отрисовка по умолчанию и обновлению страницы
            menuButtonElement(container, "all", FILMS_CARDS);
            menuButtonElement(container, "Watchlist", WATCHLIST_CARDS);
            menuButtonElement(container, "History", HISTORY_CARDS);
            menuButtonElement(container, "Favorites", FAVORITES_CARDS);


            this._sortingComponent.setSortTypeChangeHandler((sortType) => {

                const films = getFilms(currentMenuButton);
                const sortedFilms = getSortedFilms(films, sortType, 0);

                let filmsList = container.querySelector(".films-list");
                filmsList.innerHTML = ``;

                renderFilms(container, currentMenuButton, sortedFilms);
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