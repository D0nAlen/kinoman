import { generateFilms } from "./cardFilm.js";
import { render } from "../utils.js";
import { FILMS_CARDS } from "../const.js";
import { RenderPosition } from "../utils.js";
import CardFilmComponent from "../components/cardFilm.js";
import FilmsListComponent from "../components/filmsList.js";
import ShowMoreButtonComponent from "../components/showMoreButton.js";
import ControlsComponent from "../components/controls.js";
import {listenerPopup} from "../mock/popupElement.js";

let SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

// default card output
export const defaultCardOutput = (siteMainElement) => {
  SHOWING_FILMS_COUNT_ON_START = 5;
  const filmsContainer = siteMainElement.querySelector(".films");
  const filmsListContainer = filmsContainer.querySelector(".films-list__container");

  const films = generateFilms(FILMS_CARDS);

  for (let i = 0; i < SHOWING_FILMS_COUNT_ON_START; i++) {
    const cardFilmComponent = new CardFilmComponent(films[i]).getElement();
    render(filmsListContainer, cardFilmComponent, RenderPosition.BEFOREEND);

    listenerPopup(cardFilmComponent, films[i]);
  }


  const controlsCardFilm = filmsListContainer.querySelectorAll(".film-card");
  controlsCardFilm.forEach((film) =>
    render(film, new ControlsComponent().getElement(), RenderPosition.BEFOREEND)
  );

  // button "Show more"
  const filmsList = filmsContainer.querySelector(".films-list");
  render(filmsList, new ShowMoreButtonComponent().getElement(), RenderPosition.BEFOREEND);

  showMoreButtonElement(filmsListContainer, filmsList, films, FILMS_CARDS.length);
};

export const menuButtonElement = (siteMainElement, idButton, FILMS_LIST) => {
  const nameButton = document.getElementById(idButton);
  const films = generateFilms(FILMS_LIST);
  let countFilmsList = FILMS_LIST.length;

  nameButton.addEventListener(`click`, () => {
    SHOWING_FILMS_COUNT_ON_START = 5;
    const filmsContainer = siteMainElement.querySelector(".films");
    let filmsList = filmsContainer.querySelector(".films-list");
    filmsList.remove();

    render(filmsContainer, new FilmsListComponent().getElement(), RenderPosition.AFTERBEGIN);

    filmsList = filmsContainer.querySelector(".films-list");

    const filmsListContainer = filmsContainer.querySelector(
      ".films-list__container"
    );

    if (countFilmsList <= SHOWING_FILMS_COUNT_ON_START) {
      SHOWING_FILMS_COUNT_ON_START = countFilmsList;
    }

    for (let i = 0; i < SHOWING_FILMS_COUNT_ON_START; i++) {
      const cardFilmComponent = new CardFilmComponent(films[i]).getElement();
      render(filmsListContainer, cardFilmComponent, RenderPosition.BEFOREEND);
      listenerPopup(cardFilmComponent, films[i]);
    }
    const controlsCardFilm = filmsListContainer.querySelectorAll(".film-card");
    controlsCardFilm.forEach((film) =>
      render(film, new ControlsComponent().getElement(), RenderPosition.BEFOREEND)
    );

    // button "Show more"
    render(filmsList, new ShowMoreButtonComponent().getElement(), RenderPosition.BEFOREEND);
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
      .forEach((film) => {
        const cardFilmComponent = new CardFilmComponent(film).getElement();
        render(filmsListContainer, cardFilmComponent, RenderPosition.BEFOREEND);
        listenerPopup(cardFilmComponent, film);
      }
      );

    const controlsCardFilm = filmsListContainer.querySelectorAll(".film-card");
    controlsCardFilm.forEach((film) =>
      render(film, new ControlsComponent().getElement(), RenderPosition.BEFOREEND)
    );

    if (showingFilmsCount >= cardFilmsCount) {
      showMoreButton.remove();
    }
  });
};