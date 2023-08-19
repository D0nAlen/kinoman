import { render } from "./render.js";
import { cardFilmTemplate } from "../components/cardFilm.js";
import { showMoreButtonTemplate } from "../components/showMoreButton.js";
import { generateFilms } from "./cardFilm.js";
import { controlsTemplate } from "../components/controls.js";
import { FILMS_CARDS } from "../const.js";

const CARD_FILMS_COUNT = 15;
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

//!!! 1)дублируется кнопка show more по нажатию All
//    2)неправильно работает вывод карточек по кнопке, переделать счетчики по Лекции 3.
// button #All
export const allButtonElement = (siteMainElement) => {
  let cardFilmsCount = CARD_FILMS_COUNT;
  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
  let showingFilmsCountByButton = SHOWING_FILMS_COUNT_BY_BUTTON;
  const allButton = document.getElementById("all");
  const filmsContainer = siteMainElement.querySelector(".films");
  const filmsListContainer = filmsContainer.querySelector(
    ".films-list__container"
  );

  allButton.addEventListener(`click`, () => {
    // showMoreButton.remove();

    // if (cardFilmsCount <= showingFilmsCount) {
    //   showingFilmsCount = cardFilmsCount;
    //   showMoreButton.remove();
    // }
    // if(isShowMoreButtonExist)
    // showMoreButton.remove();

    let remainingCards = cardFilmsCount - showingFilmsCount;
    if (remainingCards < showingFilmsCountByButton)
      showingFilmsCountByButton = remainingCards;
    showingFilmsCount = showingFilmsCount + showingFilmsCountByButton;
    filmsListContainer.innerHTML = "";

    for (let i = 0; i < showingFilmsCount; i++) {
      render(filmsListContainer, cardFilmTemplate(films[i]));
    }
    const controlsCardFilm = filmsListContainer.querySelectorAll(".film-card");
    controlsCardFilm.forEach((film) => render(film, controlsTemplate()));

   // button "Show more"
   const filmsList = filmsContainer.querySelector(".films-list");
   render(filmsList, showMoreButtonTemplate());
   // let showMoreButton = filmsList.querySelector(`.films-list__show-more`);
   // showMoreButtonElement(showMoreButton, filmsListContainer);
   showMoreButtonElement(filmsListContainer, filmsList);
  });
};

const showMoreButtonElement = (filmsListContainer, filmsList) => {
  // const showMoreButtonElement = (showMoreButton, filmsListContainer) => {
  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
  let cardFilmsCount = CARD_FILMS_COUNT;
  let showingFilmsCountByButton = SHOWING_FILMS_COUNT_BY_BUTTON;
  let showMoreButton = filmsList.querySelector(`.films-list__show-more`);

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

    const controlsCardFilm = filmsListContainer.querySelectorAll(".film-card");
    controlsCardFilm.forEach((film) => render(film, controlsTemplate()));

    if (showingFilmsCount >= cardFilmsCount) {
      showMoreButton.remove();
    }
  });
};
