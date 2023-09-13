
import { generateMenu } from "./mock/menu.js";
import { generateTopRatedFilms } from "./mock/cardTopRated.js";
import { generateMostCommentedFilms } from "./mock/cardMostCommented.js";
import { menuButtonElement } from "./mock/menuButton.js";
import { FILMS_CARDS } from "./const.js";
import { WATCHLIST_CARDS } from "./const.js";
import { HISTORY_CARDS } from "./const.js";
import { FAVORITES_CARDS } from "./const.js";
import { defaultCardOutput } from "./mock/menuButton.js";
import { render, RenderPosition } from "./utils.js";
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
import { COMMENTS } from "./const.js";
import { generateComments } from "./mock/comment.js";
import FormDetailsTopContainerComponent from "./components/popupFilmDetails/topContainer.js";
import FilmDetailsCloseButtonComponent from "./components/popupFilmDetails/closeButton.js";
import FilmDetailsInfoWrap from "./components/popupFilmDetails/infoWrap.js";
import FilmDetailsControlsComponent from "./components/popupFilmDetails/controls.js";
import FormDetailsBottomContainerComponent from "./components/popupFilmDetails/bottomContainer.js";
import FilmDetailsCommentsWrapComponent from "./components/popupFilmDetails/commentsWrap.js";
import FilmDetailsCommentsListComponent from "./components/popupFilmDetails/commentList.js";
import FilmDetailsNewCommentComponent from "./components/popupFilmDetails/newComment.js";
// import PopupCardFilmComponent from "./components/popupCardFilm.js";
import CommentComponent from "./components/popupFilmDetails/comment.js";

const CARD__TOP_RATED_COUNT = 2;
const CARD__MOST_COMMENTED_COUNT = 2;
const siteHeaderElement = document.querySelector(".header");
const siteMainElement = document.querySelector(".main");

const menu = generateMenu();
const topRatedFilms = generateTopRatedFilms(CARD__TOP_RATED_COUNT);
const mostCommentedFilms = generateMostCommentedFilms(CARD__MOST_COMMENTED_COUNT);

render(siteHeaderElement, new HeaderProfileComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MenuComponent(menu).getElement(), RenderPosition.BEFOREEND);

render(siteMainElement, new FilterComponent().getElement(), RenderPosition.BEFOREEND);

render(siteMainElement, new FilmsContainerComponent().getElement(), RenderPosition.BEFOREEND);
const filmsContainer = siteMainElement.querySelector(".films");
render(filmsContainer, new FilmsListComponent().getElement(), RenderPosition.BEFOREEND);

// const renderFilm = (filmListElement, film) => {
//     const replaceFilmToPopup = () => {
//       filmListElement.replaceChild(filmPopupComponent.getElement(), filmComponent.getElement());
//     };

//     const replacePopupToFilm = () => {
//       filmListElement.replaceChild(filmComponent.getElement(), filmPopupComponent.getElement());
//     };

//     const onEscKeyDown = (evt) => {
//       const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

//       if (isEscKey) {
//         replacePopupToFilm();
//         document.removeEventListener(`keydown`, onEscKeyDown);
//       }
//     };

//     const filmComponent = new TaskComponent(film);
//     const editButton = filmComponent.getElement().querySelector(".card__btn--edit");
//     editButton.addEventListener(`click`, () => {
//       replaceFilmToPopup();
//       document.addEventListener(`keydown`, onEscKeyDown);
//     });

//     const filmPopupComponent = new TaskEditComponent(film);
//     const editForm = filmPopupComponent.getElement().querySelector(`form`);
//     editForm.addEventListener(`submit`, (evt) => {
//       evt.preventDefault();
//       replacePopupToFilm();
//       document.removeEventListener(`keydown`, onEscKeyDown);
//     });

//     render(filmListElement, filmComponent.getElement(), RenderPosition.BEFOREEND);
//   };

const renderPopupFilm = () => {
    const filmDetailsInner = document.querySelector(".film-details__inner");
    const comments = generateComments(COMMENTS);
    render(filmDetailsInner, new FormDetailsTopContainerComponent().getElement(), RenderPosition.BEFOREEND);
    const formDetailsTopContainer = filmDetailsInner.querySelector(".form-details__top-container");

    render(formDetailsTopContainer, new FilmDetailsCloseButtonComponent().getElement(), RenderPosition.BEFOREEND);
    render(formDetailsTopContainer, new FilmDetailsInfoWrap().getElement(), RenderPosition.BEFOREEND);
    render(formDetailsTopContainer, new FilmDetailsControlsComponent().getElement(), RenderPosition.BEFOREEND);

    render(filmDetailsInner, new FormDetailsBottomContainerComponent().getElement(), RenderPosition.BEFOREEND);
    const filmDetailsCommentsWrap = filmDetailsInner.querySelector(".form-details__bottom-container");
    render(filmDetailsCommentsWrap, new FilmDetailsCommentsWrapComponent(comments).getElement(), RenderPosition.BEFOREEND);
    render(filmDetailsCommentsWrap, new FilmDetailsCommentsListComponent().getElement(), RenderPosition.BEFOREEND);
    // отрисовка списка комментариев
    const filmDetailsCommentsList = filmDetailsInner.querySelector(".film-details__comments-list");
    for (let i = 0; i < comments.length; i++) {
        render(filmDetailsCommentsList, new CommentComponent(comments[i]).getElement(),RenderPosition.BEFOREEND);
    }
    render(filmDetailsCommentsWrap, new FilmDetailsNewCommentComponent().getElement(), RenderPosition.BEFOREEND);
};

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
        render(topRatedContainerElement, new CardTopRatedComponent(topRatedFilms[i]).getElement(), RenderPosition.BEFOREEND);
    }
    let controlsCardFilm = topRatedContainerElement.querySelectorAll(".film-card");
    controlsCardFilm.forEach((film) => render(film, new ControlsComponent().getElement(), RenderPosition.BEFOREEND));

    // Most commented films
    render(filmsContainer, new MostCommentedContainerComponent().getElement(), RenderPosition.BEFOREEND);
    const mostCommentedContainerElement = filmsContainer.querySelectorAll(".films-list__container")[2];
    for (let i = 0; i < CARD__MOST_COMMENTED_COUNT; i++) {
        render(mostCommentedContainerElement, new CardMostCommentedComponent(mostCommentedFilms[i]).getElement(), RenderPosition.BEFOREEND);
    }
    controlsCardFilm = mostCommentedContainerElement.querySelectorAll(".film-card");
    controlsCardFilm.forEach((film) => render(film, new ControlsComponent().getElement(), RenderPosition.BEFOREEND));
};

renderBoard();
renderPopupFilm();

// // popup window
// const filmDetailsInner = document.querySelector(".film-details__inner");
// const comments = generateComments(COMMENTS);
// render(filmDetailsInner, new FormDetailsTopContainerComponent().getElement(), RenderPosition.BEFOREEND);
// const formDetailsTopContainer = filmDetailsInner.querySelector(".form-details__top-container");

// render(formDetailsTopContainer, new FilmDetailsCloseButtonComponent().getElement(), RenderPosition.BEFOREEND);
// render(formDetailsTopContainer, new FilmDetailsInfoWrap().getElement(), RenderPosition.BEFOREEND);
// render(formDetailsTopContainer, new FilmDetailsControlsComponent().getElement(), RenderPosition.BEFOREEND);

// render(filmDetailsInner, new FormDetailsBottomContainerComponent().getElement(), RenderPosition.BEFOREEND);
// const filmDetailsCommentsWrap = filmDetailsInner.querySelector(".form-details__bottom-container");
// render(filmDetailsCommentsWrap, new FilmDetailsCommentsWrapComponent().getElement(), RenderPosition.BEFOREEND);
// render(filmDetailsCommentsWrap, new FilmDetailsCommentsListComponent().getElement(), RenderPosition.BEFOREEND);
// render(filmDetailsCommentsWrap, new FilmDetailsNewCommentComponent().getElement(), RenderPosition.BEFOREEND);

// renderPopupFilm();