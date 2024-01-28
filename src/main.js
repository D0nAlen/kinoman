import { generateMenu } from "./mock/menu.js";
import { render, RenderPosition } from "./utils/render.js";
import HeaderProfileComponent from "./components/headerProfile.js";
import MenuComponent from "./components/menu.js";
import PageController from "./controllers/pageController.js";
import MoviesModel from "./models/movies.js";
import { generateFilms } from "./mock/cardFilm.js";
import { FILMS_CARDS } from "./const.js";

const siteHeaderElement = document.querySelector(".header");
const siteMainElement = document.querySelector(".main");

const menu = generateMenu();
const films = generateFilms(FILMS_CARDS);
render(siteHeaderElement, new HeaderProfileComponent(), RenderPosition.BEFOREEND);

const menuComponent = new MenuComponent(menu);
render(siteMainElement, menuComponent, RenderPosition.BEFOREEND);

const moviesModel = new MoviesModel();
moviesModel.setFilms(films);

const pageController = new PageController(siteMainElement, moviesModel);
pageController.render();