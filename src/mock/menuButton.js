import { generateFilms } from "./cardFilm.js";
import { render, RenderPosition } from "../utils/render.js";
import { FILMS_CARDS } from "../const.js";
import CardFilmComponent from "../components/cardFilm.js";
import FilmsListComponent from "../components/filmsList.js";
import ShowMoreButtonComponent from "../components/showMoreButton.js";
import ControlsComponent from "../components/controls.js";
import { listenerPopup } from "../mock/popupElement.js";
import { addPopup } from "../mock/popupElement.js";

let SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;


// default card output
export const defaultCardOutput = (siteMainElement) => {
  SHOWING_FILMS_COUNT_ON_START = 5;
  let showMoreButton = new ShowMoreButtonComponent();

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
    // render(filmsList, new ShowMoreButtonComponent().getElement(), RenderPosition.BEFOREEND);
  render(filmsList, showMoreButton.getElement(), RenderPosition.BEFOREEND);

  showMoreButtonElement(showMoreButton, filmsListContainer, films);
};

export const menuButtonElement = (siteMainElement, idButton, FILMS_LIST) => {
  const nameButton = document.getElementById(idButton);
  const films = generateFilms(FILMS_LIST);
  let showMoreButton = new ShowMoreButtonComponent();
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
      const cardFilmComponent = new CardFilmComponent(films[i]);
      cardFilmComponent.setCardFilmButtonClickHandler();
        // addPopup(cardFilmComponent);
      // });
      render(filmsListContainer, cardFilmComponent.getElement(), RenderPosition.BEFOREEND);
      // listenerPopup(cardFilmComponent, films[i]);
    }
    const controlsCardFilm = filmsListContainer.querySelectorAll(".film-card");
    controlsCardFilm.forEach((film) =>
      render(film, new ControlsComponent().getElement(), RenderPosition.BEFOREEND)
    );

    // button "Show more"
    render(filmsList, showMoreButton.getElement(), RenderPosition.BEFOREEND);
    showMoreButtonElement(showMoreButton, filmsListContainer, films);

    if (countFilmsList <= SHOWING_FILMS_COUNT_ON_START) {
      // let showMoreButton = filmsList.querySelector(`.films-list__show-more`);
      showMoreButton.getElement().remove();
    }
  });
};

const showMoreButtonElement = (showMoreButton, filmsListContainer, films) => {
  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
  let cardFilmsCount = films.length;
  let showingFilmsCountByButton = SHOWING_FILMS_COUNT_BY_BUTTON;
  // let showMoreButton = filmsList.querySelector(`.films-list__show-more`);

  // showMoreButton.addEventListener(`click`, () => {

  showMoreButton.setShowMoreButtonClickHandler(() => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + showingFilmsCountByButton;
    films
      .slice(prevFilmsCount, showingFilmsCount)
      .forEach((film) => {
        const cardFilmComponent = new CardFilmComponent(film);
        render(filmsListContainer, cardFilmComponent.getElement(), RenderPosition.BEFOREEND);
        // listenerPopup(cardFilmComponent, film);
        cardFilmComponent.setCardFilmButtonClickHandler();
      }
      );

    const controlsCardFilm = filmsListContainer.querySelectorAll(".film-card");
    controlsCardFilm.forEach((film) =>
      render(film, new ControlsComponent().getElement(), RenderPosition.BEFOREEND)
    );

    if (showingFilmsCount >= cardFilmsCount) {
      showMoreButton.getElement().remove();
    }
  });
};