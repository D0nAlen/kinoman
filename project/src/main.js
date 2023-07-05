"use strict";

const CARD_COUNT = 5;

const createHeaderProfileTemplate = () => {
  return `
    <section class="header__profile profile">
    <p class="profile__rating">Movie Buff</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>
    `;
};

const createMenuTemplate = () => {
  return `
  <nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>
    `;
};

const createFilterTemplate = () => {
  return `
  <ul class="sort">
  <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
  <li><a href="#" class="sort__button">Sort by date</a></li>
  <li><a href="#" class="sort__button">Sort by rating</a></li>
</ul>
      `;
};

const filmsContainerTemplate = () => {
  return `
  <section class="films">
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  
    <div class="films-list__container">
  `;
};
const cardFilmTemplate = () => {
  return `
  <article class="film-card">
  <h3 class="film-card__title">Sagebrush Trail</h3>
  <p class="film-card__rating">3.2</p>
  <p class="film-card__info">
    <span class="film-card__year">1933</span>
    <span class="film-card__duration">54m</span>
    <span class="film-card__genre">Western</span>
  </p>
  <img src="./images/posters/sagebrush-trail.jpg" alt="" class="film-card__poster">
  <p class="film-card__description">Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the real killer. By chance Brant's narrow escap…</p>
  <a class="film-card__comments">89 comments</a>
  <form class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist film-card__controls-item--active">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
  </form>
</article>
          `;
};

const createShowMoreButtonTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

const render = (container, template, place = "beforeend") => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(".main");
const siteHeaderElement = document.querySelector(".header");
render(siteHeaderElement, createHeaderProfileTemplate());
render(siteMainElement, createMenuTemplate());

const siteFilterElement = siteMainElement.querySelector(".main-navigation");
render(siteMainElement, createFilterTemplate());

render(siteMainElement, filmsContainerTemplate());
const cardFilmElement = siteMainElement.querySelector(".films-list__container");
for (let i = 0; i < CARD_COUNT; i++) {
  render(cardFilmElement, cardFilmTemplate());
}

render(siteMainElement, createShowMoreButtonTemplate());



// const createCardTopRatedTemplate = () => {
//   return `

//         `;
// };

// const createCardMostCommentedTemplate = () => {
//   return `

//         `;
// };

//   popup
// const createDetailedInformationFilmTemplate = () => {
//   return `

//         `;
// };
