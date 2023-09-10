import { createElement } from "../utils.js";

const createFilmDetailsCommentTemplate = () => {
  return `<li class="film-details__comment">
<span class="film-details__comment-emoji">
  <img src="./images/emoji/smile.png" width="55" height="55" alt="emoji-smile" />
</span>
<div>
  <p class="film-details__comment-text">
    Interesting setting and a good cast
  </p>
  <p class="film-details__comment-info">
    <span class="film-details__comment-author">Tim Macoveev</span>
    <span class="film-details__comment-day">2019/12/31 23:59</span>
    <button class="film-details__comment-delete">Delete</button>
  </p>
</div>
</li>`;
};

export default class CreateFilmDetailsCommentTemplateComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmDetailsCommentTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
