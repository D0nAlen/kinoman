import { generateMenu } from "./mock/menu.js";
import { render, RenderPosition } from "./utils/render.js";
import HeaderProfileComponent from "./components/headerProfile.js";
import MenuComponent from "./components/menu.js";
import PageController from "./controllers/pageController.js";

const siteHeaderElement = document.querySelector(".header");
const siteMainElement = document.querySelector(".main");

const menu = generateMenu();

render(siteHeaderElement, new HeaderProfileComponent(), RenderPosition.BEFOREEND);

// 1)можно ли отрисовать меню в самом контроллере?
const menuComponent = new MenuComponent(menu);
render(siteMainElement, menuComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(siteMainElement, menuComponent);
pageController.render();
