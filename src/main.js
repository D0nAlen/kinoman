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
import { render } from "./mock/render.js";
import { defaultCardOutput } from "./mock/allButton.js";
import { allButtonElement } from "./mock/allButton.js";
import { watchlistButtonElement } from "./mock/watchlistButton.js";

const CARD_FILMS_COUNT = 20;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const CARD__TOP_RATED_COUNT = 2;
const CARD__MOST_COMMENTED_COUNT = 2;
let isShowMoreButtonExist = true;
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

defaultCardOutput(siteMainElement, isShowMoreButtonExist);

allButtonElement(siteMainElement, isShowMoreButtonExist);

watchlistButtonElement(siteMainElement, isShowMoreButtonExist);

// !!! У каждого раздела своя кнопка Show more, со своей логикой и списком фильмов.

// #Watchlist
// const watchlistButton = document.getElementById("Watchlist");
// const watchlistButtonElement = () => {
//   let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
//   let cardFilmsCount = menu[0].count;
//   let showingFilmsCountByButton = SHOWING_FILMS_COUNT_BY_BUTTON;

//   // showMoreButtonElement();

//   watchlistButton.addEventListener(`click`, () => {
//     if (cardFilmsCount <= showingFilmsCount) {
//       showingFilmsCount = cardFilmsCount;
//       showMoreButton.remove();
//     }

//     let remainingCards = cardFilmsCount - showingFilmsCount;
//     if (remainingCards < showingFilmsCountByButton)
//       showingFilmsCountByButton = remainingCards;
//     // showingFilmsCount = showingFilmsCount + showingFilmsCountByButton;
// // alert(remainingCards, cardFilmsCount, showingFilmsCount);
//     filmsListContainer.innerHTML = "";

//     // alert(showingFilmsCount);
//     for (let i = 0; i < showingFilmsCount; i++) {
//       render(filmsListContainer, cardFilmTemplate(films[i]));
//     }
//     const controlsCardFilm = filmsListContainer.querySelectorAll(".film-card");
//     controlsCardFilm.forEach((film) => render(film, controlsTemplate()));
//   });
// };

// // #History
// const historyButton = document.getElementById("History");
// historyButton.addEventListener(`click`, () => {
//   let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

//   let cardFilmsCount = menu[1].count;
//   if (cardFilmsCount <= showingFilmsCount) {
//     showingFilmsCount = cardFilmsCount;
//     showMoreButton.remove();
//   }

//   filmsListContainer.innerHTML = "";

//   for (let i = 0; i < showingFilmsCount; i++) {
//     render(filmsListContainer, cardFilmTemplate(films[i]));
//   }
//   const controlsCardFilm = filmsListContainer.querySelectorAll(".film-card");
//   controlsCardFilm.forEach((film) => render(film, controlsTemplate()));
//   showMoreButtonRendering();
// // });

// // #Favorites
// const favoritesButton = document.getElementById("Favorites");
// favoritesButton.addEventListener(`click`, () => {
//   let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

//   let cardFilmsCount = menu[2].count;
//   if (cardFilmsCount <= showingFilmsCount) {
//     showingFilmsCount = cardFilmsCount;
//     showMoreButton.remove();
//   }

//   filmsListContainer.innerHTML = "";

//   for (let i = 0; i < showingFilmsCount; i++) {
//     render(filmsListContainer, cardFilmTemplate(films[i]));
//   }
//   const controlsCardFilm = filmsListContainer.querySelectorAll(".film-card");
//   controlsCardFilm.forEach((film) => render(film, controlsTemplate()));

//   // showMoreButtonRendering();
// });

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
