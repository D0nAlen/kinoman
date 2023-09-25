import { render } from "../utils.js"
import { generateFilms } from "./cardFilm.js";
import { FILMS_CARDS } from "../const.js";
import { RenderPosition } from "../utils.js";
import ShowMoreButtonComponent from "../components/showMoreButton.js";
import ControlsComponent from "../components/controls.js";
import FilmsContainerComponent from "../components/filmsContainer.js";
import CardFilmComponent from "../components/cardFilm.js";

const CARD_FILMS_COUNT = 17;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const films = generateFilms(FILMS_CARDS, CARD_FILMS_COUNT);

// default card output
export const defaultCardOutput = (siteMainElement) => {
  const filmsContainer = siteMainElement.querySelector(".films");
  const filmsListContainer = filmsContainer.querySelector(".films-list__container");

  for (let i = 0; i < SHOWING_FILMS_COUNT_ON_START; i++) {
    render(filmsListContainer, new CardFilmComponent(films[i]));
  }

  // button "Show more"
  const filmsList = filmsContainer.querySelector(".films-list");
  render(filmsList, new ShowMoreButtonComponent().getElement());
  showMoreButtonElement(filmsListContainer, filmsList);
};

// button #All
export const allButtonElement = (siteMainElement) => {
  const allButton = document.getElementById("all");

  allButton.addEventListener(`click`, () => {
    let filmsContainer = siteMainElement.querySelector(".films");
    filmsContainer.remove();
    render(siteMainElement, new FilmsContainerComponent().getElement());
    filmsContainer = siteMainElement.querySelector(".films");

    const filmsListContainer = filmsContainer.querySelector(".films-list__container");
    const filmsList = filmsContainer.querySelector(".films-list");
    for (let i = 0; i < SHOWING_FILMS_COUNT_ON_START; i++) {
      render(filmsListContainer, new CardFilmComponent(films[i]).getElement());
    }

    // button "Show more"
    render(filmsList, new ShowMoreButtonComponent().getElement());
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
        render(filmsListContainer, new CardFilmComponent(film).getElement(), RenderPosition.BEFOREEND)
      );

    const controlsCardFilm = filmsListContainer.querySelectorAll(".film-card");
    controlsCardFilm.forEach((film) => render(film, new ControlsComponent().getElement()));

    if (showingFilmsCount >= cardFilmsCount) {
      showMoreButton.remove();
    }
  });
};
