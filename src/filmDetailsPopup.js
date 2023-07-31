"use strict";
import { filmDetailsCloseButtonTemplate } from "./popup/closeButton.js";
import { filmDetailsInfoTemplate } from "./popup/filmInfo.js";
import { filmDetailsControlsTemplate } from "./popup/controls.js";
import { commentsListTemplate } from "./popup/commentsList.js";
import { generateComments } from "./popup/comment.js";
import { commentTemplate } from "./components/comment.js";
import { addNewCommentTemplate } from "./popup/newComment.js";

const COMMENTS_COUNT = 4;
const render = (container, template, place = "beforeend") => {
  container.insertAdjacentHTML(place, template);
};

const formDetailsTopContainer = document.querySelector(
  ".form-details__top-container"
);

const comments = generateComments(COMMENTS_COUNT);

render(formDetailsTopContainer, filmDetailsCloseButtonTemplate());
render(formDetailsTopContainer, filmDetailsInfoTemplate());
render(formDetailsTopContainer, filmDetailsControlsTemplate());

const formDetailsContainer = document.querySelector(
  ".form-details__bottom-container"
);
render(formDetailsContainer, commentsListTemplate());

const commentList = document.querySelector(".film-details__comments-list");
for (let i = 0; i < COMMENTS_COUNT; i++) {
  render(commentList, commentTemplate(comments[i]));
}

const commentsWrap = document.querySelector(".film-details__comments-wrap");
render(commentsWrap, addNewCommentTemplate());
