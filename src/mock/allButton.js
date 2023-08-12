"use strict";
import { render } from "./render";
import { cardFilmTemplate } from "../components/cardFilm";
import { showMoreButtonTemplate } from "../components/showMoreButton";
import { generateFilms } from "./cardFilm";

const CARD_FILMS_COUNT = 20;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const films = generateFilms(CARD_FILMS_COUNT);

export const allButtonElement = (siteMainElement) => {
  const filmsContainer = siteMainElement.querySelector(".films");
  const filmsListContainer = filmsContainer.querySelector(".films-list__container");

  // Default cards rendering
  for (let i = 0; i < SHOWING_FILMS_COUNT_ON_START; i++) {
    render(filmsListContainer, cardFilmTemplate(films[i]));
  }

  // button "Show more"
  const filmsList = filmsContainer.querySelector(".films-list");
  render(filmsList, showMoreButtonTemplate());
  let showMoreButton = filmsList.querySelector(`.films-list__show-more`);

  showMoreButtonElement(showMoreButton, filmsListContainer);
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
