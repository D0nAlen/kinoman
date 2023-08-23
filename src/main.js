"use strict";
import { headerProfileTemplate } from "./components/headerProfile.js";
import { menuTemplate } from "./components/menu.js";
import { filterTemplate } from "./components/filter.js";
import { filmsContainerTemplate } from "./components/filmsList.js";
import { topRatedContainerTemplate } from "./components/topRatedContainer.js";
import { cardTopRatedTemplate } from "./components/cardTopRated.js";
import { mostCommentedContainerTemplate } from "./components/mostCommentedContainer.js";
import { cardMostCommentedTemplate } from "./components/cardMostCommented.js";
import { generateMenu } from "./mock/menu.js";
import { generateTopRatedFilms } from "./mock/cardTopRated.js";
import { generateMostCommentedFilms } from "./mock/cardMostCommented.js";
import { render } from "./mock/render.js";
import { defaultCardOutput } from "./mock/allButton.js";
import { allButtonElement } from "./mock/allButton.js";
import { watchlistButtonElement } from "./mock/watchlistButton.js";
import { historyButtonElement } from "./mock/historyButton.js";
import { menuButtonElement } from "./mock/menuButton.js";

// const CARD_FILMS_COUNT = 15;
// const SHOWING_FILMS_COUNT_ON_START = 5;
// const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const CARD__TOP_RATED_COUNT = 2;
const CARD__MOST_COMMENTED_COUNT = 2;
const siteHeaderElement = document.querySelector(".header");
const siteMainElement = document.querySelector(".main");

const menu = generateMenu();
const topRatedFilms = generateTopRatedFilms(CARD__TOP_RATED_COUNT);
const mostCommentedFilms = generateMostCommentedFilms(
  CARD__MOST_COMMENTED_COUNT
);

render(siteHeaderElement, headerProfileTemplate());

render(siteMainElement, menuTemplate(menu));

render(siteMainElement, filterTemplate());

render(siteMainElement, filmsContainerTemplate());

const filmsContainer = siteMainElement.querySelector(".films");

menuButtonElement(siteMainElement, "all", 17);
menuButtonElement(siteMainElement, "Watchlist", 10);

// defaultCardOutput(siteMainElement);

// allButtonElement(siteMainElement);

// watchlistButtonElement(siteMainElement);

// historyButtonElement(siteMainElement);

// Top Rated films

render(filmsContainer, topRatedContainerTemplate());
const topRatedContainerElement = filmsContainer.querySelectorAll(
  ".films-list__container"
)[1];
for (let i = 0; i < CARD__TOP_RATED_COUNT; i++) {
  render(topRatedContainerElement, cardTopRatedTemplate(topRatedFilms[i]));
}

// Most commented films
render(filmsContainer, mostCommentedContainerTemplate());
const mostCommentedContainerElement = filmsContainer.querySelectorAll(
  ".films-list__container"
)[2];
for (let i = 0; i < CARD__MOST_COMMENTED_COUNT; i++) {
  render(
    mostCommentedContainerElement,
    cardMostCommentedTemplate(mostCommentedFilms[i])
  );
}
