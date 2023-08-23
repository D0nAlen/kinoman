import { filmsContainerTemplate } from "../components/filmsList";
import { cardFilmTemplate } from "../components/cardFilm";
import { FILMS_CARDS } from "../const.js";
import { generateFilms } from "./cardFilm.js";
import { render } from "./render";
import { controlsTemplate } from "../components/controls";
import { showMoreButtonTemplate } from "../components/showMoreButton";

// const CARD_FILMS_COUNT = 17;
  const SHOWING_FILMS_COUNT_ON_START = 5;
  const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

// export const menuButtonElement = (buttonElement,cardFilmsCount,setCardFilmsCount) => {
//   buttonElement.addEventListener(`click`, () => {
//     cardFilmsCount = setCardFilmsCount;
//     let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
//     // let showingFilmsCountByButton = SHOWING_FILMS_COUNT_BY_BUTTON;
//     if (cardFilmsCount <= showingFilmsCount) {
//       showingFilmsCount = cardFilmsCount;
//       showMoreButton.remove();
//     }

//     filmsListContainer.innerHTML = "";

//     for (let i = 0; i < showingFilmsCount; i++) {
//       render(filmsListContainer, cardFilmTemplate(films[i]));
//     }
//     const controlsCardFilm = filmsListContainer.querySelectorAll(".film-card");
//     controlsCardFilm.forEach((film) => render(film, controlsTemplate()));
//     showMoreButtonRendering();
//   });
// };

export const menuButtonElement = (siteMainElement, idButton, CARD_FILMS_COUNT) => {
  const nameButton = document.getElementById(idButton);
  const films = generateFilms(FILMS_CARDS, CARD_FILMS_COUNT);

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

    // button "Show more"
    render(filmsList, showMoreButtonTemplate());
    showMoreButtonElement(filmsListContainer, filmsList,films,CARD_FILMS_COUNT);
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
