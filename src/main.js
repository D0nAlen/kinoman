import { createMenuTemplate } from "./components/menu.js";
import { topRatedContainerTemplate } from "./components/topRatedContainer.js";
import { cardTopRatedTemplate } from "./components/cardTopRated.js";
import { mostCommentedContainerTemplate } from "./components/mostCommentedContainer.js";
// import { cardMostCommentedTemplate } from "./components/cardMostCommented.js";
import { generateMenu } from "./mock/menu.js";
import { generateTopRatedFilms } from "./mock/cardTopRated.js";
import { generateMostCommentedFilms } from "./mock/cardMostCommented.js";
import { render } from "./utils.js";
// import { menuButtonElement } from "./mock/menuButton.js";
import { FILMS_CARDS } from "./const.js";
import { WATCHLIST_CARDS } from "./const.js";
import { HISTORY_CARDS } from "./const.js";
import { FAVORITES_CARDS } from "./const.js";
import { defaultCardOutput } from "./mock/menuButton.js";
// import { filmsListTemplate } from "./components/filmsList.js";
// import { filmsContainerTemplate } from "./components/filmsContainer.js";
import { controlsTemplate } from "./components/controls.js";
import { RenderPosition } from "./utils.js";
import HeaderProfileComponent from "./components/headerProfile.js";
import CardMostCommentedComponent from "./components/cardMostCommented.js";
import MenuComponent from "./components/menu.js";
import FilterComponent from "./components/filter.js";
import FilmsContainerComponent from "./components/filmsContainer.js";
import FilmsListComponent from "./components/filmsList.js";

const CARD__TOP_RATED_COUNT = 2;
const CARD__MOST_COMMENTED_COUNT = 2;
const siteHeaderElement = document.querySelector(".header");
const siteMainElement = document.querySelector(".main");

const menu = generateMenu();
const topRatedFilms = generateTopRatedFilms(CARD__TOP_RATED_COUNT);
const mostCommentedFilms = generateMostCommentedFilms(CARD__MOST_COMMENTED_COUNT);

render(siteHeaderElement, new HeaderProfileComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MenuComponent(menu).getElement(), RenderPosition.BEFOREEND);

render(siteMainElement, new FilterComponent().getElement(), RenderPosition.BEFOREEND);

render(siteMainElement, new FilmsContainerComponent().getElement(), RenderPosition.BEFOREEND);
const filmsContainer = siteMainElement.querySelector(".films");
render(filmsContainer, new FilmsListComponent().getElement(), RenderPosition.BEFOREEND);


defaultCardOutput(siteMainElement);
// menuButtonElement(siteMainElement, "all", FILMS_CARDS);
// menuButtonElement(siteMainElement, "Watchlist", WATCHLIST_CARDS);
// menuButtonElement(siteMainElement, "History", HISTORY_CARDS);
// menuButtonElement(siteMainElement, "Favorites", FAVORITES_CARDS);

// // Top Rated films
// render(filmsContainer, topRatedContainerTemplate(), RenderPosition.BEFOREEND);
// const topRatedContainerElement = filmsContainer.querySelectorAll(".films-list__container")[1];
// for (let i = 0; i < CARD__TOP_RATED_COUNT; i++) {
//   render(topRatedContainerElement, cardTopRatedTemplate(topRatedFilms[i]), RenderPosition.BEFOREEND);
// }
// let controlsCardFilm = topRatedContainerElement.querySelectorAll(".film-card");
// controlsCardFilm.forEach((film) => render(film, controlsTemplate(), RenderPosition.BEFOREEND));

// // Most commented films
// render(filmsContainer, mostCommentedContainerTemplate(), RenderPosition.BEFOREEND);
// const mostCommentedContainerElement = filmsContainer.querySelectorAll(".films-list__container")[2];
// for (let i = 0; i < CARD__MOST_COMMENTED_COUNT; i++) {
//   render(mostCommentedContainerElement, new CardMostCommentedComponent(mostCommentedFilms[i]),RenderPosition.BEFOREEND);
// }
// controlsCardFilm = mostCommentedContainerElement.querySelectorAll(".film-card");
// controlsCardFilm.forEach((film) => render(film, controlsTemplate(), RenderPosition.BEFOREEND));
