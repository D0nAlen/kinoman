"use strict";
// import { filmDetailsCloseButtonTemplate } from "./popup/closeButton.js";
// import { filmDetailsInfoTemplate } from "./popup/filmInfo.js";
import { filmDetailsControlsTemplate } from "./popupFilmDetails/controls.js";
import { commentsListTemplate } from "./popupFilmDetails/commentsList.js";
import { generateComments } from "./mock/comment.js";
// import { commentTemplate } from "./components/comment.js";
import { addNewCommentTemplate } from "./popupFilmDetails/newComment.js";
import CommentComponent from "./components/comment.js";
import FilmDetailsCloseButtonComponent from "./popupFilmDetails/closeButton.js";
import FilmDetailsInfoComponent from "./popupFilmDetails/filmInfo.js";
import { COMMENTS } from "./const.js";
import { render, RenderPosition } from "./utils.js";

// const COMMENTS_COUNT = 4;

// const formDetailsTopContainer = document.querySelector(".form-details__top-container");

// const comments = generateComments(COMMENTS);
// render(formDetailsTopContainer, new FilmDetailsCloseButtonComponent().getElement(), RenderPosition.BEFOREEND);
// render(formDetailsTopContainer, new FilmDetailsInfoComponent().getElement(), RenderPosition.BEFOREEND);
// render(formDetailsTopContainer, filmDetailsControlsTemplate(), RenderPosition.BEFOREEND);

// const formDetailsContainer = document.querySelector(
//   ".form-details__bottom-container"
// );
// render(formDetailsContainer, commentsListTemplate(), RenderPosition.BEFOREEND);

// const commentList = document.querySelector(".film-details__comments-list");
// for (let i = 0; i < COMMENTS_COUNT; i++) {
//   render(commentList, new CommentComponent(comments[i]).getElement(), RenderPosition.BEFOREEND);
// }

// const commentsWrap = document.querySelector(".film-details__comments-wrap");
// render(commentsWrap, addNewCommentTemplate(), RenderPosition.BEFOREEND);
