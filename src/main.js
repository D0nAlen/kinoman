import { headerProfileTemplate } from "./components/headerProfile.js";
import { menuTemplate } from "./components/menu.js";
import { filterTemplate } from "./components/filter.js";
import { topRatedContainerTemplate } from "./components/topRatedContainer.js";
import { cardTopRatedTemplate } from "./components/cardTopRated.js";
import { mostCommentedContainerTemplate } from "./components/mostCommentedContainer.js";
import { cardMostCommentedTemplate } from "./components/cardMostCommented.js";
import { generateMenu } from "./mock/menu.js";
import { generateTopRatedFilms } from "./mock/cardTopRated.js";
import { generateMostCommentedFilms } from "./mock/cardMostCommented.js";
import { render } from "./mock/render.js";
import { menuButtonElement } from "./mock/menuButton.js";
import { FILMS_CARDS } from "./const.js";
import { WATCHLIST_CARDS } from "./const.js";
import { HISTORY_CARDS } from "./const.js";
import { FAVORITES_CARDS } from "./const.js";
import { defaultCardOutput } from "./mock/menuButton.js";
import { filmsListTemplate } from "./components/filmsList.js";
import { filmsContainerTemplate } from "./components/filmsContainer.js";
import { controlsTemplate } from "./components/controls.js";

const CARD__TOP_RATED_COUNT = 2;
const CARD__MOST_COMMENTED_COUNT = 2;
const siteHeaderElement = document.querySelector(".header");
const siteMainElement = document.querySelector(".main");

const menu = generateMenu();
const topRatedFilms = generateTopRatedFilms(CARD__TOP_RATED_COUNT);
const mostCommentedFilms = generateMostCommentedFilms(CARD__MOST_COMMENTED_COUNT);

render(siteHeaderElement, headerProfileTemplate(), "beforeend");

render(siteMainElement, menuTemplate(menu), "beforeend");

render(siteMainElement, filterTemplate(), "beforeend");

render(siteMainElement, filmsContainerTemplate(), "beforeend");
const filmsContainer = siteMainElement.querySelector(".films");
render(filmsContainer, filmsListTemplate(), "beforeend");


defaultCardOutput(siteMainElement);
menuButtonElement(siteMainElement, "all", FILMS_CARDS);
menuButtonElement(siteMainElement, "Watchlist", WATCHLIST_CARDS);
menuButtonElement(siteMainElement, "History", HISTORY_CARDS);
menuButtonElement(siteMainElement, "Favorites", FAVORITES_CARDS);

// Top Rated films
render(filmsContainer, topRatedContainerTemplate(), "beforeend");
const topRatedContainerElement = filmsContainer.querySelectorAll(".films-list__container")[1];
for (let i = 0; i < CARD__TOP_RATED_COUNT; i++) {
  render(topRatedContainerElement, cardTopRatedTemplate(topRatedFilms[i]), "beforeend");
}
let controlsCardFilm = topRatedContainerElement.querySelectorAll(".film-card");
controlsCardFilm.forEach((film) => render(film, controlsTemplate(), "beforeend"));

// Most commented films
render(filmsContainer, mostCommentedContainerTemplate(), "beforeend");
const mostCommentedContainerElement = filmsContainer.querySelectorAll(".films-list__container")[2];
for (let i = 0; i < CARD__MOST_COMMENTED_COUNT; i++) {
  render(mostCommentedContainerElement, cardMostCommentedTemplate(mostCommentedFilms[i]), "beforeend");
}
controlsCardFilm = mostCommentedContainerElement.querySelectorAll(".film-card");
controlsCardFilm.forEach((film) => render(film, controlsTemplate(), "beforeend"));
