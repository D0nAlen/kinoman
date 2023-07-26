"use strict";
import { filmDetailsCloseButton } from "./components/popup/closeButton.js";
import { filmDetailsInfo } from "./components/popup/infoWrap.js";
import { filmDetailsControls } from "./components/popup/controls.js";

const render = (container, template, place = "beforeend") => {
  container.insertAdjacentHTML(place, template);
};

const formDetailsTopContainer = document.querySelector(
  ".form-details__top-container"
);
render(formDetailsTopContainer, filmDetailsCloseButton());
render(formDetailsTopContainer, filmDetailsInfo());
render(formDetailsTopContainer, filmDetailsControls());
