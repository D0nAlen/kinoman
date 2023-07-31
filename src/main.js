"use strict";
import {headerProfileTemplate} from "./components/headerProfile.js";
import {menuTemplate} from "./components/menu.js";
import {filterTemplate} from "./components/filter.js";
import {filmsContainerTemplate} from "./components/filmsList.js";
import {cardFilmTemplate} from "./components/cardFilm.js";
import {showMoreButtonTemplate} from "./components/showMoreButton.js";
import {topRatedContainerTemplate} from "./components/topRatedContainer.js";
import {cardTopRatedTemplate} from "./components/cardTopRated.js";
import {mostCommentedContainerTemplate} from "./components/mostCommentedContainer.js";
import {cardMostCommentedTemplate} from "./components/cardMostCommented.js";
import { generateFilms } from "./mock/cardFilm.js";
import { generateMenu } from "./mock/menu.js";

const CARD_FILMS_COUNT = 20;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const CARD__TOP_RATED_COUNT = 2;
const CARD__MOST_COMMENTED_COUNT = 2;

const render = (container, template, place = "beforeend") => {
  container.insertAdjacentHTML(place, template);
};


const siteMainElement = document.querySelector(".main");
const siteHeaderElement = document.querySelector(".header");

const menu = generateMenu();

render(siteHeaderElement, headerProfileTemplate());
render(siteMainElement, menuTemplate(menu));

const films = generateFilms(CARD_FILMS_COUNT);
render(siteMainElement, filterTemplate());

render(siteMainElement, filmsContainerTemplate());
const filmsContainer = siteMainElement.querySelector(".films");
const cardFilmElement = filmsContainer.querySelector(".films-list__container");
for (let i = 0; i < SHOWING_FILMS_COUNT_ON_START; i++) {
  render(cardFilmElement, cardFilmTemplate(films[i]));
}



let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
const filmsListElement = filmsContainer.querySelector(".films-list");
render(filmsListElement, showMoreButtonTemplate());
const loadMoreButton = filmsListElement.querySelector(`.films-list__show-more`);
loadMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

  films
    .slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) =>
      render(cardFilmElement, cardFilmTemplate(film), `beforeend`)
    );

  if (showingFilmsCount >= films.length) {
    loadMoreButton.remove();
  }
});











render(filmsContainer, topRatedContainerTemplate());
const topRatedContainerElement = filmsContainer.querySelectorAll(
  ".films-list__container")[1];
for (let i = 0; i < CARD__TOP_RATED_COUNT; i++) {
  render(topRatedContainerElement, cardTopRatedTemplate());
}

render(filmsContainer, mostCommentedContainerTemplate());
const mostCommentedContainerElement = filmsContainer.querySelectorAll(
  ".films-list__container")[2];
for (let i = 0; i < CARD__MOST_COMMENTED_COUNT; i++) {
  render(mostCommentedContainerElement, cardMostCommentedTemplate());
}
