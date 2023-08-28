import { filmsContainerTemplate } from "../components/filmsContainer.js";
import { cardFilmTemplate } from "../components/cardFilm.js";
import { generateFilms } from "./cardFilm.js";
import { render } from "./render.js";
import { controlsTemplate } from "../components/controls.js";
import { showMoreButtonTemplate } from "../components/showMoreButton.js";
import { FILMS_CARDS } from "../const.js";
import { filmsListTemplate } from "../components/filmsList.js";

let SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

// default card output
export const defaultCardOutput = (siteMainElement) => {
  SHOWING_FILMS_COUNT_ON_START = 5;
  const filmsContainer = siteMainElement.querySelector(".films");
  const filmsListContainer = filmsContainer.querySelector(
    ".films-list__container"
  );
  const films = generateFilms(FILMS_CARDS);

  for (let i = 0; i < SHOWING_FILMS_COUNT_ON_START; i++) {
    render(filmsListContainer, cardFilmTemplate(films[i]), "beforeend");
  }

  const controlsCardFilm = filmsListContainer.querySelectorAll(".film-card");
  controlsCardFilm.forEach((film) =>
    render(film, controlsTemplate(), "beforeend")
  );

  // button "Show more"
  const filmsList = filmsContainer.querySelector(".films-list");
  render(filmsList, showMoreButtonTemplate(), "beforeend");

  showMoreButtonElement(
    filmsListContainer,
    filmsList,
    films,
    FILMS_CARDS.length
  );
};

// !!!
//     1)При выводе <5 карточек фильмов, ошибка.
export const menuButtonElement = (siteMainElement, idButton, FILMS_LIST) => {
  const nameButton = document.getElementById(idButton);
  const films = generateFilms(FILMS_LIST);
  // SHOWING_FILMS_COUNT_ON_START = 5;
  let countFilmsList = FILMS_LIST.length;

  nameButton.addEventListener(`click`, () => {
    SHOWING_FILMS_COUNT_ON_START = 5;
    const filmsContainer = siteMainElement.querySelector(".films");
    let filmsList = filmsContainer.querySelector(".films-list");
    filmsList.remove();

    render(filmsContainer, filmsListTemplate(), "afterbegin");
    filmsList = filmsContainer.querySelector(".films-list");

    const filmsListContainer = filmsContainer.querySelector(
      ".films-list__container"
    );
    
    if (countFilmsList <= SHOWING_FILMS_COUNT_ON_START) {
      SHOWING_FILMS_COUNT_ON_START = countFilmsList;
      // let showMoreButton = filmsList.querySelector(`.films-list__show-more`);
      // showMoreButton.remove();
    }

    for (let i = 0; i < SHOWING_FILMS_COUNT_ON_START; i++) {
      render(filmsListContainer, cardFilmTemplate(films[i]), "beforeend");
    }
    const controlsCardFilm = filmsListContainer.querySelectorAll(".film-card");
    controlsCardFilm.forEach((film) =>
      render(film, controlsTemplate(), "beforeend")
    );

    // button "Show more"
    render(filmsList, showMoreButtonTemplate(), "beforeend");
    showMoreButtonElement(filmsListContainer, filmsList, films);

    if (countFilmsList <= SHOWING_FILMS_COUNT_ON_START) {
      let showMoreButton = filmsList.querySelector(`.films-list__show-more`);
      showMoreButton.remove();
    }
  });
};

const showMoreButtonElement = (filmsListContainer, filmsList, films) => {
  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
  let cardFilmsCount = films.length;
  let showingFilmsCountByButton = SHOWING_FILMS_COUNT_BY_BUTTON;
  let showMoreButton = filmsList.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, () => {
    const prevFilmsCount = showingFilmsCount;

    showingFilmsCount = showingFilmsCount + showingFilmsCountByButton;
    films
      .slice(prevFilmsCount, showingFilmsCount)
      .forEach((film) =>
        render(filmsListContainer, cardFilmTemplate(film), "beforeend")
      );

    const controlsCardFilm = filmsListContainer.querySelectorAll(".film-card");
    controlsCardFilm.forEach((film) =>
      render(film, controlsTemplate(), "beforeend")
    );

    if (showingFilmsCount >= cardFilmsCount) {
      showMoreButton.remove();
    }
  });
};
