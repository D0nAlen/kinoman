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

// const films = generateFilms(FILMS_CARDS);
const menu = generateMenu();

render(siteHeaderElement, new HeaderProfileComponent(), RenderPosition.BEFOREEND);
render(siteMainElement, new MenuComponent(menu), RenderPosition.BEFOREEND);

const pageController = new PageController(siteMainElement);
// pageController.render(films);
pageController.render();
