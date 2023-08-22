import { render } from "./render.js";
import { cardFilmTemplate } from "../components/cardFilm.js";
import { showMoreButtonTemplate } from "../components/showMoreButton.js";
import { generateFilms } from "./cardFilm.js";
import { controlsTemplate } from "../components/controls.js";
import { FILMS_CARDS } from "../const.js";
import { filmsContainerTemplate } from "../components/filmsList.js";

const CARD_FILMS_COUNT = 20;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const films = generateFilms(FILMS_CARDS, CARD_FILMS_COUNT);

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
  // let showMoreButton = filmsList.querySelector(`.films-list__show-more`);
  // showMoreButtonElement(showMoreButton, filmsListContainer);
  showMoreButtonElement(filmsListContainer, filmsList);
};

//3)Поиск кнопки на странице и ее удаление(отдельная функция)
// button #All
export const allButtonElement = (siteMainElement) => {
  const allButton = document.getElementById("all");
  let filmsContainer = siteMainElement.querySelector(".films");

  allButton.addEventListener(`click`, () => {
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

    // button "Show more"
    render(filmsList, showMoreButtonTemplate());
    showMoreButtonElement(filmsListContainer, filmsList);
  });
};

const showMoreButtonElement = (filmsListContainer, filmsList) => {
  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
  let cardFilmsCount = CARD_FILMS_COUNT;
  let showingFilmsCountByButton = SHOWING_FILMS_COUNT_BY_BUTTON;
  let showMoreButton = filmsList.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, () => {
    const prevFilmsCount = showingFilmsCount;
    // let remainingCards = cardFilmsCount - showingFilmsCount;
    // if (remainingCards < showingFilmsCountByButton)
    //   showingFilmsCountByButton = remainingCards;
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
