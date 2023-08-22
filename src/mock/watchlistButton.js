import { render } from "./render.js";
import { cardFilmTemplate } from "../components/cardFilm.js";
import { showMoreButtonTemplate } from "../components/showMoreButton.js";
import { generateFilms } from "./cardFilm.js";
import { controlsTemplate } from "../components/controls.js";
import { WATCHLIST_CARDS } from "../const.js";
import { filmsContainerTemplate } from "../components/filmsList.js";

const WATCHLIST_FILMS_COUNT = 7;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const watchlistFilms = generateFilms(WATCHLIST_CARDS, WATCHLIST_FILMS_COUNT);

// #Watchlist
export const watchlistButtonElement = (siteMainElement) => {
  const watchlistButton = document.getElementById("Watchlist");

  watchlistButton.addEventListener(`click`, () => {
    let filmsContainer = siteMainElement.querySelector(".films");
    filmsContainer.remove();
    render(siteMainElement, filmsContainerTemplate());
    filmsContainer = siteMainElement.querySelector(".films");

    const filmsListContainer = filmsContainer.querySelector(
      ".films-list__container"
    );
    const filmsList = filmsContainer.querySelector(".films-list");
    for (let i = 0; i < SHOWING_FILMS_COUNT_ON_START; i++) {
      render(filmsListContainer, cardFilmTemplate(watchlistFilms[i]));
    }

    // button "Show more"
    render(filmsList, showMoreButtonTemplate());
    showMoreButtonElement(filmsListContainer, filmsList);
  });
};

const showMoreButtonElement = (filmsListContainer, filmsList) => {
  let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
  let cardFilmsCount = WATCHLIST_FILMS_COUNT;
  let showingFilmsCountByButton = SHOWING_FILMS_COUNT_BY_BUTTON;
  let showMoreButton = filmsList.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, () => {
    const prevFilmsCount = showingFilmsCount;
    // let remainingCards = cardFilmsCount - showingFilmsCount;
    // if (remainingCards < showingFilmsCountByButton)
    //   showingFilmsCountByButton = remainingCards;
    showingFilmsCount = showingFilmsCount + showingFilmsCountByButton;
    watchlistFilms
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
