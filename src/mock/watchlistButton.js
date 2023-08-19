import { render } from "./render.js";
import { cardFilmTemplate } from "../components/cardFilm.js";
import { showMoreButtonTemplate } from "../components/showMoreButton.js";
import { generateFilms } from "./cardFilm.js";
import { controlsTemplate } from "../components/controls.js";
import { WATCHLIST_CARDS } from "../const.js";

const WATCHLIST_FILMS_COUNT = 10;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const watchlistFilms = generateFilms(WATCHLIST_CARDS, WATCHLIST_FILMS_COUNT);

// #Watchlist
export const watchlistButtonElement = (siteMainElement, isShowMoreButtonExist) => {
  let cardFilmsCount = WATCHLIST_FILMS_COUNT; //10
  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START; //5
  let showingFilmsCountByButton = SHOWING_FILMS_COUNT_BY_BUTTON; //5
  const watchlistButton = document.getElementById("Watchlist");
  const filmsContainer = siteMainElement.querySelector(".films");
  const filmsListContainer = filmsContainer.querySelector(
    ".films-list__container"
  );

  watchlistButton.addEventListener(`click`, () => {
    // if (cardFilmsCount <= showingFilmsCount) {
    //   showingFilmsCount = cardFilmsCount;
    //   showMoreButton.remove();
    //   isShowMoreButtonExist = false;
    // }


    let remainingCards = cardFilmsCount - showingFilmsCount;
    if (remainingCards < showingFilmsCountByButton)
      showingFilmsCountByButton = remainingCards;
    showingFilmsCount = showingFilmsCount + showingFilmsCountByButton;
    filmsListContainer.innerHTML = "";

    // for (let i = 0; i < showingFilmsCount; i++) {
    //   render(filmsListContainer, cardFilmTemplate(watchlistFilms[i]));
    // }
    // const controlsCardFilm = filmsListContainer.querySelectorAll(".film-card");
    // controlsCardFilm.forEach((film) => render(film, controlsTemplate()));

    // // button "Show more"
    // const filmsList = filmsContainer.querySelector(".films-list");
    // let showMoreButton = filmsList.querySelector(`.films-list__show-more`);
    // if (!isShowMoreButtonExist) {
    //   render(filmsList, showMoreButtonTemplate());
    //   showMoreButtonElement(showMoreButton, filmsListContainer, isShowMoreButtonExist);
    // }
  });
};

const showMoreButtonElement = (showMoreButton, filmsListContainer,isShowMoreButtonExist) => {
  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START; //5
  let cardFilmsCount = WATCHLIST_FILMS_COUNT; //10
  let showingFilmsCountByButton = SHOWING_FILMS_COUNT_BY_BUTTON; //5

  // !!! Неправильно считаются карточки при выводе
  showMoreButton.addEventListener(`click`, () => {
    const prevFilmsCount = showingFilmsCount;
    let remainingCards = cardFilmsCount - showingFilmsCount;
    if (remainingCards < showingFilmsCountByButton)
      showingFilmsCountByButton = remainingCards;
    showingFilmsCount = showingFilmsCount + showingFilmsCountByButton;
    watchlistFilms
      .slice(prevFilmsCount, showingFilmsCount)
      .forEach((film) =>
        render(filmsListContainer, cardFilmTemplate(film), `beforeend`)
      );

    if (showingFilmsCount >= cardFilmsCount) {
      showMoreButton.remove();
      isShowMoreButtonExist = false;
    }
  });
};
