import { generateFilter } from "./mock/filter.js";
import { render, RenderPosition } from "./utils/render.js";
import HeaderProfileComponent from "./components/headerProfile.js";
import FilterComponent from "./components/filter.js";
import PageController from "./controllers/pageController.js";
import MoviesModel from "./models/movies.js";
import { generateFilms } from "./mock/cardFilm.js";
import { FILMS_CARDS } from "./const.js";
import FilterController from "./controllers/filter.js";

const siteHeaderElement = document.querySelector(".header");
const siteMainElement = document.querySelector(".main");

render(siteHeaderElement, new HeaderProfileComponent(), RenderPosition.BEFOREEND);

// const filter = generateFilter();
// const filterComponent = new FilterComponent(filter);
// render(siteMainElement, filterComponent, RenderPosition.BEFOREEND);

const films = generateFilms(FILMS_CARDS);
const moviesModel = new MoviesModel();
moviesModel.setFilms(films);

const filterController = new FilterController(siteMainElement, moviesModel);
filterController.render();

const pageController = new PageController(siteMainElement, moviesModel);
pageController.render();