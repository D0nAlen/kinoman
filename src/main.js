import { generateMenu } from "./mock/menu.js";
import { FILMS_CARDS } from "./const.js";
import { render, RenderPosition } from "./utils/render.js";
import HeaderProfileComponent from "./components/headerProfile.js";
import MenuComponent from "./components/menu.js";
import SortingComponent from "./components/sorting.js";
import FilmsContainerComponent from "./components/filmsContainer.js";
import FilmsListComponent from "./components/filmsList.js";
import noDataFilmsTemplate from "./components/no-data.js";
import PageController from "./controllers/pageController.js";
import { generateFilms } from "./mock/cardFilm.js";

const siteHeaderElement = document.querySelector(".header");
const siteMainElement = document.querySelector(".main");

const films = generateFilms(FILMS_CARDS);
const menu = generateMenu();

// всю отрисовку закинуть в контроллер
render(siteHeaderElement, new HeaderProfileComponent(), RenderPosition.BEFOREEND);
render(siteMainElement, new MenuComponent(menu), RenderPosition.BEFOREEND);

// render(siteMainElement, new SortingComponent(), RenderPosition.BEFOREEND);

// render(siteMainElement, new FilmsContainerComponent(), RenderPosition.BEFOREEND);
// const filmsContainer = siteMainElement.querySelector(".films");
// render(filmsContainer, new FilmsListComponent(), RenderPosition.BEFOREEND);
// const filmsListContainer = filmsContainer.querySelector(".films-list__container");

// const filmsListContainer = siteMainElement.querySelector(".films-list__container");
// console.log(filmsListContainer);

// if (FILMS_CARDS.length === 0) {
  // render(filmsListContainer, new noDataFilmsTemplate(), RenderPosition.BEFOREEND);
// } else {
  // const filmsContainerComponent = new FilmsContainerComponent();
  const pageController = new PageController(siteMainElement);

  // render(siteMainElement, filmsContainerComponent, RenderPosition.BEFOREEND);
  pageController.render(films);
