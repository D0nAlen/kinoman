import { generateMenu } from "./mock/menu.js";
import { FILMS_CARDS } from "./const.js";
import { render, RenderPosition } from "./utils/render.js";
import HeaderProfileComponent from "./components/headerProfile.js";
import MenuComponent from "./components/menu.js";
import FilterComponent from "./components/filter.js";
import FilmsContainerComponent from "./components/filmsContainer.js";
import FilmsListComponent from "./components/filmsList.js";
import noDataFilmsTemplate from "./components/no-data.js";
import PageController from "./controllers/pageController.js";

const siteHeaderElement = document.querySelector(".header");
const siteMainElement = document.querySelector(".main");

const menu = generateMenu();

render(siteHeaderElement, new HeaderProfileComponent(), RenderPosition.BEFOREEND);
render(siteMainElement, new MenuComponent(menu), RenderPosition.BEFOREEND);

render(siteMainElement, new FilterComponent(), RenderPosition.BEFOREEND);

render(siteMainElement, new FilmsContainerComponent(), RenderPosition.BEFOREEND);
const filmsContainer = siteMainElement.querySelector(".films");
render(filmsContainer, new FilmsListComponent(), RenderPosition.BEFOREEND);
const filmsListContainer = filmsContainer.querySelector(".films-list__container");

if (FILMS_CARDS.length === 0) {
  render(filmsListContainer, new noDataFilmsTemplate(), RenderPosition.BEFOREEND);
} else {

  const filmsContainerComponent = new FilmsContainerComponent();
  const pageController = new PageController(filmsContainerComponent);

  render(siteMainElement, filmsContainerComponent, RenderPosition.BEFOREEND);
  pageController.render(siteMainElement);
}
