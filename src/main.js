import { generateMenu } from "./mock/menu.js";
import { generateTopRatedFilms } from "./mock/cardTopRated.js";
import { generateMostCommentedFilms } from "./mock/cardMostCommented.js";
import { defaultCardOutput, menuButtonElement } from "./mock/menuButton.js";
import { FILMS_CARDS, WATCHLIST_CARDS, HISTORY_CARDS, FAVORITES_CARDS } from "./const.js";
import { render, RenderPosition } from "./utils/render.js";
import HeaderProfileComponent from "./components/headerProfile.js";
import CardMostCommentedComponent from "./components/cardMostCommented.js";
import MenuComponent from "./components/menu.js";
import FilterComponent from "./components/filter.js";
import FilmsContainerComponent from "./components/filmsContainer.js";
import FilmsListComponent from "./components/filmsList.js";
import TopRatedContainerComponent from "./components/topRatedContainer.js";
import CardTopRatedComponent from "./components/cardTopRated.js";
import ControlsComponent from "./components/controls.js";
import MostCommentedContainerComponent from "./components/mostCommentedContainer.js";
import noDataFilmsTemplate from "./components/no-data.js";

const CARD__TOP_RATED_COUNT = 2;
const CARD__MOST_COMMENTED_COUNT = 2;
const siteHeaderElement = document.querySelector(".header");
const siteMainElement = document.querySelector(".main");

const renderBoard = () => {

  defaultCardOutput(siteMainElement);
  menuButtonElement(siteMainElement, "all", FILMS_CARDS);
  menuButtonElement(siteMainElement, "Watchlist", WATCHLIST_CARDS);
  menuButtonElement(siteMainElement, "History", HISTORY_CARDS);
  menuButtonElement(siteMainElement, "Favorites", FAVORITES_CARDS);

  // Top Rated films
  render(filmsContainer, new TopRatedContainerComponent().getElement(), RenderPosition.BEFOREEND);
  const topRatedContainerElement = filmsContainer.querySelectorAll(".films-list__container")[1];
  for (let i = 0; i < CARD__TOP_RATED_COUNT; i++) {
    const cardFilmComponent = new CardTopRatedComponent(topRatedFilms[i]);
    render(topRatedContainerElement, cardFilmComponent.getElement(), RenderPosition.BEFOREEND);
    cardFilmComponent.setCardTopRatedClickHandler();
  }
  let controlsCardFilm = topRatedContainerElement.querySelectorAll(".film-card");
  controlsCardFilm.forEach((film) => render(film, new ControlsComponent().getElement(), RenderPosition.BEFOREEND));

  // Most commented films
  render(filmsContainer, new MostCommentedContainerComponent().getElement(), RenderPosition.BEFOREEND);
  const mostCommentedContainerElement = filmsContainer.querySelectorAll(".films-list__container")[2];
  for (let i = 0; i < CARD__MOST_COMMENTED_COUNT; i++) {
    const cardFilmComponent = new CardMostCommentedComponent(mostCommentedFilms[i]);
    render(mostCommentedContainerElement, cardFilmComponent.getElement(), RenderPosition.BEFOREEND);
    cardFilmComponent.setCardMostCommentedClickHandler();

  }
  controlsCardFilm = mostCommentedContainerElement.querySelectorAll(".film-card");
  controlsCardFilm.forEach((film) => render(film, new ControlsComponent().getElement(), RenderPosition.BEFOREEND));
};

const menu = generateMenu();
const topRatedFilms = generateTopRatedFilms(CARD__TOP_RATED_COUNT);
const mostCommentedFilms = generateMostCommentedFilms(CARD__MOST_COMMENTED_COUNT);

render(siteHeaderElement, new HeaderProfileComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MenuComponent(menu).getElement(), RenderPosition.BEFOREEND);

render(siteMainElement, new FilterComponent().getElement(), RenderPosition.BEFOREEND);

render(siteMainElement, new FilmsContainerComponent().getElement(), RenderPosition.BEFOREEND);
const filmsContainer = siteMainElement.querySelector(".films");
render(filmsContainer, new FilmsListComponent().getElement(), RenderPosition.BEFOREEND);
const filmsListContainer = filmsContainer.querySelector(".films-list__container");

if (FILMS_CARDS.length === 0) {
  render(filmsListContainer, new noDataFilmsTemplate().getElement(), RenderPosition.BEFOREEND);
} else {
  renderBoard();
}
