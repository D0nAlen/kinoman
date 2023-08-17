import { render } from "./render.js";
import { cardFilmTemplate } from "../components/cardFilm.js";
import { showMoreButtonTemplate } from "../components/showMoreButton.js";
import { generateFilms } from "./cardFilm.js";
import { controlsTemplate } from "../components/controls.js";
import { FILMS_CARDS } from "../const.js";

const CARD_FILMS_COUNT = 20;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const films = generateFilms(CARD_FILMS_COUNT);

// default card output
export const defaultCardOutput = (siteMainElement, isShowMoreButtonExist) => {
  const filmsContainer = siteMainElement.querySelector(".films");
  const filmsListContainer = filmsContainer.querySelector(
    ".films-list__container"
  );

  for (let i = 0; i < SHOWING_FILMS_COUNT_ON_START; i++) {
    render(filmsListContainer, cardFilmTemplate(films[i]));
  }

  // button "Show more"
  const filmsList = filmsContainer.querySelector(".films-list");
  render(filmsList, showMoreButtonTemplate());
  let showMoreButton = filmsList.querySelector(`.films-list__show-more`);
  showMoreButtonElement(showMoreButton, filmsListContainer);
  isShowMoreButtonExist = true;
};

// button #All
export const allButtonElement = (siteMainElement, isShowMoreButtonExist) => {
  let cardFilmsCount = CARD_FILMS_COUNT;
  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
  const allButton = document.getElementById("all");
  const filmsContainer = siteMainElement.querySelector(".films");
  const filmsListContainer = filmsContainer.querySelector(
    ".films-list__container"
  );

  allButton.addEventListener(`click`, () => {
    if (cardFilmsCount <= showingFilmsCount) {
      showingFilmsCount = cardFilmsCount;
      showMoreButton.remove();
      isShowMoreButtonExist = false;
    }

    filmsListContainer.innerHTML = "";

    for (let i = 0; i < showingFilmsCount; i++) {
      render(filmsListContainer, cardFilmTemplate(films[i]));
    }
    const controlsCardFilm = filmsListContainer.querySelectorAll(".film-card");
    controlsCardFilm.forEach((film) => render(film, controlsTemplate()));

    // button "Show more"
    const filmsList = filmsContainer.querySelector(".films-list");
    if (!isShowMoreButtonExist) {
      render(filmsList, showMoreButtonTemplate());
    }
    let showMoreButton = filmsList.querySelector(`.films-list__show-more`);
      showMoreButtonElement(showMoreButton, filmsListContainer, isShowMoreButtonExist);
  });
};

const showMoreButtonElement = (showMoreButton, filmsListContainer,isShowMoreButtonExist) => {
  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
  let cardFilmsCount = CARD_FILMS_COUNT;
  let showingFilmsCountByButton = SHOWING_FILMS_COUNT_BY_BUTTON;

  showMoreButton.addEventListener(`click`, () => {
    const prevFilmsCount = showingFilmsCount;
    let remainingCards = cardFilmsCount - showingFilmsCount;
    if (remainingCards < showingFilmsCountByButton)
      showingFilmsCountByButton = remainingCards;
    showingFilmsCount = showingFilmsCount + showingFilmsCountByButton;
    films
      .slice(prevFilmsCount, showingFilmsCount)
      .forEach((film) =>
        render(filmsListContainer, cardFilmTemplate(film), `beforeend`)
      );

    if (showingFilmsCount >= cardFilmsCount) {
      showMoreButton.remove();
      isShowMoreButtonExist=false;
    }
  });
};
