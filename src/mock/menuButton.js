import { generateFilms } from "./cardFilm.js";
import { render } from "../utils.js";
import { FILMS_CARDS } from "../const.js";
import { RenderPosition } from "../utils.js";
import CardFilmComponent from "../components/cardFilm.js";
import FilmsListComponent from "../components/filmsList.js";
import ShowMoreButtonComponent from "../components/showMoreButton.js";
import ControlsComponent from "../components/controls.js";
import PopupCardFilmComponent from "../components/popupCardFilm.js";
import { renderFilm } from "../main.js";

let SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

// default card output
export const defaultCardOutput = (siteMainElement) => {
  SHOWING_FILMS_COUNT_ON_START = 5;
  const filmsContainer = siteMainElement.querySelector(".films");
  const filmsListContainer = filmsContainer.querySelector(".films-list__container");
  const films = generateFilms(FILMS_CARDS);

  for (let i = 0; i < SHOWING_FILMS_COUNT_ON_START; i++) {
  // const cardFilmComponent = new CardFilmComponent(films[0]);
  render(filmsListContainer, new CardFilmComponent(films[i]).getElement(), RenderPosition.BEFOREEND);
  // render(filmsListContainer, cardFilmComponent.getElement(), RenderPosition.BEFOREEND);
  // пример замены нодов!
  // filmsListContainer.replaceChild(new ShowMoreButtonComponent().getElement(), cardFilmComponent.getElement());
  }

  const controlsCardFilm = filmsListContainer.querySelectorAll(".film-card");
  controlsCardFilm.forEach((film) =>
    render(film, new ControlsComponent().getElement(), RenderPosition.BEFOREEND)
  );

  // button "Show more"
  const filmsList = filmsContainer.querySelector(".films-list");
  renderFilm(filmsListContainer, FILMS_CARDS[0]);
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
      render(filmsListContainer, new CardFilmComponent(films[i]).getElement(), RenderPosition.BEFOREEND);
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
      .forEach((film) =>
        render(filmsListContainer, new CardFilmComponent(film).getElement(), RenderPosition.BEFOREEND)
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
