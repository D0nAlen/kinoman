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

const CARD_FILMS_COUNT = 5;
const CARD__TOP_RATED_COUNT = 2;
const CARD__MOST_COMMENTED_COUNT = 2;

const render = (container, template, place = "beforeend") => {
  container.insertAdjacentHTML(place, template);
};

// popup film details
// const filmDetailsTemplate = ()=>{
// return `
// <section class="film-details">
//   <form class="film-details__inner" action="" method="get">
//     <div class="form-details__top-container">
//       <div class="film-details__close">
//         <button class="film-details__close-btn" type="button">close</button>
//       </div>
//       <div class="film-details__info-wrap"></div>
//     </div>
//   </form>
// </section>
// `;
// };

const siteMainElement = document.querySelector(".main");
const siteHeaderElement = document.querySelector(".header");
render(siteHeaderElement, headerProfileTemplate());
render(siteMainElement, menuTemplate());

// const siteFilterElement = siteMainElement.querySelector(".main-navigation");
render(siteMainElement, filterTemplate());

render(siteMainElement, filmsContainerTemplate());
const filmsContainer = siteMainElement.querySelector(".films");
const cardFilmElement = filmsContainer.querySelector(".films-list__container");
for (let i = 0; i < CARD_FILMS_COUNT; i++) {
  render(cardFilmElement, cardFilmTemplate());
}

const filmsListElement = filmsContainer.querySelector(".films-list");
render(filmsListElement, showMoreButtonTemplate());

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

//   popup
// const createDetailedInformationFilmTemplate = () => {
//   return `

//         `;
// };
