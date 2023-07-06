"use strict";

const CARD_FILMS_COUNT = 5;
const CARD__TOP_RATED_COUNT = 2;
const CARD__MOST_COMMENTED_COUNT = 2;

const headerProfileTemplate = () => {
  return `
    <section class="header__profile profile">
    <p class="profile__rating">Movie Buff</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>
    `;
};

const menuTemplate = () => {
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

const filterTemplate = () => {
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
  
    <div class="films-list__container"></div>
  </section>
  </section>
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

const showMoreButtonTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

const topRatedContainerTemplate = () => {
  return `
  <section class="films-list--extra">
  <h2 class="films-list__title">Top rated</h2>
  
  <div class="films-list__container"></div>
  </section>
  `;
};

const cardTopRatedTemplate = () => {
  return `
  <article class="film-card">
  <h3 class="film-card__title">The Great Flamarion</h3>
  <p class="film-card__rating">8.9</p>
  <p class="film-card__info">
    <span class="film-card__year">1945</span>
    <span class="film-card__duration">1h 18m</span>
    <span class="film-card__genre">Mystery</span>
  </p>
  <img src="./images/posters/the-great-flamarion.jpg" alt="" class="film-card__poster">
  <p class="film-card__description">The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Grea…</p>
  <a class="film-card__comments">12 comments</a>
  <form class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
  </form>
</article>
`;
};

const mostCommentedContainerTemplate = () => {
  return `
  <section class="films-list--extra">
  <h2 class="films-list__title">Most commented</h2>

  <div class="films-list__container"></div>
  </section>
  `;
};

const cardMostCommentedTemplate = () => {
  return `
  <article class="film-card">
  <h3 class="film-card__title">Made for Each Other</h3>
  <p class="film-card__rating">5.8</p>
  <p class="film-card__info">
    <span class="film-card__year">1939</span>
    <span class="film-card__duration">1h 32m</span>
    <span class="film-card__genre">Comedy</span>
  </p>
  <img src="./images/posters/made-for-each-other.png" alt="" class="film-card__poster">
  <p class="film-card__description">John Mason (James Stewart) is a young, somewhat timid attorney in New York City. He has been doing his job well, and he has a chance of bei…</p>
  <a class="film-card__comments">56 comments</a>
  <form class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
  </form>
</article>
        `;
};

const render = (container, template, place = "beforeend") => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(".main");
const siteHeaderElement = document.querySelector(".header");
render(siteHeaderElement, headerProfileTemplate());
render(siteMainElement, menuTemplate());

const siteFilterElement = siteMainElement.querySelector(".main-navigation");
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
