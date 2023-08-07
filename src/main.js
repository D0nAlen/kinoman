"use strict";
import { headerProfileTemplate } from "./components/headerProfile.js";
import { menuTemplate } from "./components/menu.js";
import { filterTemplate } from "./components/filter.js";
import { filmsContainerTemplate } from "./components/filmsList.js";
import { cardFilmTemplate } from "./components/cardFilm.js";
import { showMoreButtonTemplate } from "./components/showMoreButton.js";
import { topRatedContainerTemplate } from "./components/topRatedContainer.js";
import { cardTopRatedTemplate } from "./components/cardTopRated.js";
import { mostCommentedContainerTemplate } from "./components/mostCommentedContainer.js";
import { cardMostCommentedTemplate } from "./components/cardMostCommented.js";
import { generateFilms } from "./mock/cardFilm.js";
import { generateMenu } from "./mock/menu.js";
import { controlsTemplate } from "./components/controls.js";
import { generateTopRatedFilms } from "./mock/cardTopRated.js";
import { generateMostCommentedFilms } from "./mock/cardMostCommented.js";

const CARD_FILMS_COUNT = 10;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const CARD__TOP_RATED_COUNT = 2;
const CARD__MOST_COMMENTED_COUNT = 2;
const render = (container, template, place = "beforeend") => {
  container.insertAdjacentHTML(place, template);
};

if (CARD_FILMS_COUNT <= SHOWING_FILMS_COUNT_ON_START) {
  SHOWING_FILMS_COUNT_ON_START = CARD_FILMS_COUNT;
}

const siteHeaderElement = document.querySelector(".header");
const siteMainElement = document.querySelector(".main");

const menu = generateMenu();
const films = generateFilms(CARD_FILMS_COUNT);
const topRatedFilms = generateTopRatedFilms(CARD__TOP_RATED_COUNT);
const mostCommentedFilms = generateMostCommentedFilms(
  CARD__MOST_COMMENTED_COUNT
);

render(siteHeaderElement, headerProfileTemplate());

render(siteMainElement, menuTemplate(menu));

render(siteMainElement, filterTemplate());

render(siteMainElement, filmsContainerTemplate());
const filmsContainer = siteMainElement.querySelector(".films");
const cardFilmElement = filmsContainer.querySelector(".films-list__container");

// Default cards rendering
for (let i = 0; i < SHOWING_FILMS_COUNT_ON_START; i++) {
  render(cardFilmElement, cardFilmTemplate(films[i]));
}

// button "load more"
let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
let cardFilmsCount = CARD_FILMS_COUNT;
let showingFilmsCountByButton = SHOWING_FILMS_COUNT_BY_BUTTON;
const filmsListElement = filmsContainer.querySelector(".films-list");
render(filmsListElement, showMoreButtonTemplate());
const loadMoreButton = filmsListElement.querySelector(`.films-list__show-more`);
loadMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
// let cardFilmsCount = CARD_FILMS_COUNT;
// let showingFilmsCountByButton = SHOWING_FILMS_COUNT_BY_BUTTON;
  let remainingCards = cardFilmsCount - showingFilmsCount;
  if (remainingCards < showingFilmsCountByButton)
  showingFilmsCountByButton = remainingCards;
  showingFilmsCount = showingFilmsCount + showingFilmsCountByButton;
  films
    .slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) =>
      render(cardFilmElement, cardFilmTemplate(film), `beforeend`)
    );


  // if (showingFilmsCount >= films.length) {
  if (showingFilmsCount >= cardFilmsCount) {
    loadMoreButton.remove();
  }
});

// #Watchlist
const watchlistButton = document.getElementById("Watchlist");
watchlistButton.addEventListener(`click`, () => {
  cardFilmsCount = CARD_FILMS_COUNT;
 showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

cardFilmsCount = menu[0].count;
  if (cardFilmsCount <= showingFilmsCount) {
    showingFilmsCount = cardFilmsCount;
    loadMoreButton.remove();
  }

  cardFilmElement.innerHTML = "";

  for (let i = 0; i < showingFilmsCount; i++) {
    render(cardFilmElement, cardFilmTemplate(films[i]));
  }
  const controlsCardFilm = cardFilmElement.querySelectorAll(".film-card");
  controlsCardFilm.forEach((film) => render(film, controlsTemplate()));
});

// !!!не добавляется кнопка Load More после удаления со страницы и переключения на другую вкладку.
// #History
const historyButton = document.getElementById("History");
historyButton.addEventListener(`click`, () => {
  cardFilmsCount = CARD_FILMS_COUNT;
 showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

cardFilmsCount = menu[1].count;
  if (cardFilmsCount <= showingFilmsCount) {
    showingFilmsCount = cardFilmsCount;
    loadMoreButton.remove();
  }

  cardFilmElement.innerHTML = "";

  for (let i = 0; i < showingFilmsCount; i++) {
    render(cardFilmElement, cardFilmTemplate(films[i]));
  }
  const controlsCardFilm = cardFilmElement.querySelectorAll(".film-card");
  controlsCardFilm.forEach((film) => render(film, controlsTemplate()));
});

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
