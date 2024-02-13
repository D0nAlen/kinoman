import { render, RenderPosition } from "./utils/render.js";
import HeaderProfileComponent from "./components/headerProfile.js";
import PageController from "./controllers/pageController.js";
import MoviesModel from "./models/movies.js";
import { generateFilms } from "./mock/cardFilm.js";
import { FILMS_CARDS } from "./const.js";
import FilterController from "./controllers/filter.js";
import StatisticsComponent from "./components/statistics.js";
import PageComponent from "./components/pageComponent.js";

const siteHeaderElement = document.querySelector(".header");
const siteMainElement = document.querySelector(".main");

render(siteHeaderElement, new HeaderProfileComponent(), RenderPosition.BEFOREEND);

const films = generateFilms(FILMS_CARDS);
const moviesModel = new MoviesModel();
moviesModel.setFilms(films);

const filterController = new FilterController(siteMainElement, moviesModel);
filterController.render();
filterController.setStatisticsButtonClickHandler();

const pageComponent = new PageComponent();
render(siteMainElement, pageComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(pageComponent, moviesModel);
pageController.render();


const statisticsComponent = new StatisticsComponent({ films: moviesModel });
render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
statisticsComponent.hide();

// 1)не работают другие кнопки после вывода статистики!
filterController.setStatisticsButtonClickHandler(() => {
    pageController.hide();
    statisticsComponent.show();
});