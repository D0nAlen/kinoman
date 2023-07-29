"use strict";
import { filmDetailsCloseButtonTemplate } from "./popup/closeButton.js";
import { filmDetailsInfoTemplate } from "./popup/filmInfo.js";
import { filmDetailsControlsTemplate } from "./popup/controls.js";
import { commentsListTemplate } from "./popup/commentsList.js";
import { commentTemplate } from "./popup/comment.js";
import { addNewCommentTemplate } from "./popup/newComment.js";

const render = (container, template, place = "beforeend") => {
  container.insertAdjacentHTML(place, template);
};

const formDetailsTopContainer = document.querySelector(
  ".form-details__top-container"
);

render(formDetailsTopContainer, filmDetailsCloseButtonTemplate());
render(formDetailsTopContainer, filmDetailsInfoTemplate());
render(formDetailsTopContainer, filmDetailsControlsTemplate());

const formDetailsContainer = document.querySelector(
  ".form-details__bottom-container"
);
render(formDetailsContainer, commentsListTemplate());

const comment = {
  text: "Interesting setting and a good cast",
  emotion: "./images/emoji/smile.png",
  author: "Tim Macoveev",
  date: "2019/12/31 23:59",
};
const commentList = document.querySelector(".film-details__comments-list");
render(commentList, commentTemplate(comment));

const commentsWrap = document.querySelector(".film-details__comments-wrap");
render(commentsWrap, addNewCommentTemplate());
