import { filmsContainerTemplate } from "../components/filmsList";
import { cardFilmTemplate } from "../components/cardFilm";
import { generateFilms } from "./cardFilm.js";
import { render } from "./render.js";
import { controlsTemplate } from "../components/controls.js";
import { showMoreButtonTemplate } from "../components/showMoreButton.js";
import { FILMS_CARDS } from "../const.js";

  const SHOWING_FILMS_COUNT_ON_START = 5;
  const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

  // default card output
export const defaultCardOutput = (siteMainElement) => {
  const filmsContainer = siteMainElement.querySelector(".films");
  const filmsListContainer = filmsContainer.querySelector(
    ".films-list__container"
  );
  const films = generateFilms(FILMS_CARDS, FILMS_CARDS.length);

  for (let i = 0; i < SHOWING_FILMS_COUNT_ON_START; i++) {
    render(filmsListContainer, cardFilmTemplate(films[i]));
  }

  const controlsCardFilm = filmsListContainer.querySelectorAll(".film-card");
    controlsCardFilm.forEach((film) => render(film, controlsTemplate()));

  // button "Show more"
  const filmsList = filmsContainer.querySelector(".films-list");
  render(filmsList, showMoreButtonTemplate());

  showMoreButtonElement(filmsListContainer, filmsList, films, FILMS_CARDS.length);

};

export const menuButtonElement = (siteMainElement, idButton, FILMS_LIST, CARD_FILMS_COUNT) => {
  const nameButton = document.getElementById(idButton);
  const films = generateFilms(FILMS_LIST, CARD_FILMS_COUNT);

  nameButton.addEventListener(`click`, () => {
    let filmsContainer = siteMainElement.querySelector(".films");
    filmsContainer.remove();
    render(siteMainElement, filmsContainerTemplate());
    filmsContainer = siteMainElement.querySelector(".films");

    const filmsListContainer = filmsContainer.querySelector(
      ".films-list__container"
    );
    const filmsList = filmsContainer.querySelector(".films-list");
    for (let i = 0; i < SHOWING_FILMS_COUNT_ON_START; i++) {
      render(filmsListContainer, cardFilmTemplate(films[i]));
    }
    const controlsCardFilm = filmsListContainer.querySelectorAll(".film-card");
    controlsCardFilm.forEach((film) => render(film, controlsTemplate()));

    // button "Show more"
    render(filmsList, showMoreButtonTemplate());
    showMoreButtonElement(filmsListContainer, filmsList, films, CARD_FILMS_COUNT);
  });
};

const showMoreButtonElement = (filmsListContainer, filmsList, films, filmsCount) => {
  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
  let cardFilmsCount = filmsCount;
  let showingFilmsCountByButton = SHOWING_FILMS_COUNT_BY_BUTTON;
  let showMoreButton = filmsList.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, () => {
    const prevFilmsCount = showingFilmsCount;
    
    showingFilmsCount = showingFilmsCount + showingFilmsCountByButton;
    films
      .slice(prevFilmsCount, showingFilmsCount)
      .forEach((film) =>
        render(filmsListContainer, cardFilmTemplate(film), `beforeend`)
      );

    const controlsCardFilm = filmsListContainer.querySelectorAll(".film-card");
    controlsCardFilm.forEach((film) => render(film, controlsTemplate()));

    if (showingFilmsCount >= cardFilmsCount) {
      showMoreButton.remove();
    }
  });
};
