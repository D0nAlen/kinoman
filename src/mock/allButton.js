"use strict";
import { render } from "./render";
import { cardFilmTemplate } from "../components/cardFilm";
import { showMoreButtonTemplate } from "../components/showMoreButton";
import { generateFilms } from "./cardFilm";
import { controlsTemplate } from "../components/controls";

const CARD_FILMS_COUNT = 20;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const films = generateFilms(CARD_FILMS_COUNT);

// default card output
export const defaultCardOutput = (siteMainElement) => {
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
};

// button #All
export const allButtonElement = (siteMainElement) => {
  const allButton = document.getElementById("all");
  allButton.addEventListener(`click`, () => {
    const filmsContainer = siteMainElement.querySelector(".films");
    const filmsListContainer = filmsContainer.querySelector(
      ".films-list__container"
    );

    let cardFilmsCount = CARD_FILMS_COUNT;
    let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    if (cardFilmsCount <= showingFilmsCount) {
      showingFilmsCount = cardFilmsCount;
      showMoreButton.remove();
    }

    filmsListContainer.innerHTML = "";

    for (let i = 0; i < showingFilmsCount; i++) {
      render(filmsListContainer, cardFilmTemplate(films[i]));
    }
    const controlsCardFilm = filmsListContainer.querySelectorAll(".film-card");
    controlsCardFilm.forEach((film) => render(film, controlsTemplate()));

    // // button "Show more"
    // const filmsList = filmsContainer.querySelector(".films-list");
    // render(filmsList, showMoreButtonTemplate());
    // let showMoreButton = filmsList.querySelector(`.films-list__show-more`);
  });
};

const showMoreButtonElement = (showMoreButton, filmsListContainer) => {
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
    }
  });
};
