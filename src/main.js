import { render, RenderPosition } from "./utils/render.js";
import HeaderProfileComponent from "./components/headerProfile.js";
import PageController from "./controllers/pageController.js";
import MoviesModel from "./models/movies.js";
import { generateFilms } from "./mock/cardFilm.js";
import { FILMS_CARDS } from "./const.js";
import FilterController from "./controllers/filter.js";
import StatisticsComponent from "./components/statistics.js";
import PageComponent from "./components/pageComponent.js";
import SiteMenuComponent, { MenuItem } from "./components/site-menu.js";

const siteHeaderElement = document.querySelector(".header");
const siteMainElement = document.querySelector(".main");

render(siteHeaderElement, new HeaderProfileComponent(), RenderPosition.BEFOREEND);

const films = generateFilms(FILMS_CARDS);
const moviesModel = new MoviesModel();
moviesModel.setFilms(films);

const siteMenuComponent = new SiteMenuComponent();
render(siteMainElement, siteMenuComponent, RenderPosition.BEFOREEND);

const filterController = new FilterController(siteMenuComponent.getElement(), moviesModel);
filterController.render();

const pageComponent = new PageComponent();
render(siteMainElement, pageComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(pageComponent, moviesModel);
pageController.render();

const statisticsComponent = new StatisticsComponent({ films: moviesModel });
render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
statisticsComponent.hide();

siteMenuComponent.setOnChange((menuItem) => {
    switch (menuItem) {
        case MenuItem.ALL:
            statisticsComponent.hide();
            pageController.show();
            break;
        case MenuItem.WATCHLIST:
            statisticsComponent.hide();
            pageController.show();
            break;
        case MenuItem.HISTORY:
            statisticsComponent.hide();
            pageController.show();
            break;
        case MenuItem.FAVORITES:
            statisticsComponent.hide();
            pageController.show();
            break;
        case MenuItem.STATISTICS:
            pageController.hide();
            statisticsComponent.show();
            break;
    }
});