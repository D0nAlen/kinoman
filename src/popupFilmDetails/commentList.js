import { createElement } from "../utils.js";

const createFilmDetailsCommentsList = () => {
    return `<ul class="film-details__comments-list">
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/smile.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">Interesting setting and a good cast</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">Tim Macoveev</span>
          <span class="film-details__comment-day">2019/12/31 23:59</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/sleeping.png" width="55" height="55" alt="emoji-sleeping">
      </span>
      <div>
        <p class="film-details__comment-text">Booooooooooring</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">John Doe</span>
          <span class="film-details__comment-day">2 days ago</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/puke.png" width="55" height="55" alt="emoji-puke">
      </span>
      <div>
        <p class="film-details__comment-text">Very very old. Meh</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">John Doe</span>
          <span class="film-details__comment-day">2 days ago</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/angry.png" width="55" height="55" alt="emoji-angry">
      </span>
      <div>
        <p class="film-details__comment-text">Almost two hours? Seriously?</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">John Doe</span>
          <span class="film-details__comment-day">Today</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>
  </ul>
    `;
};

export default class FilmDetailsCommentsListComponent {
    constructor() {
      this._element = null;
    }
  
    getTemplate() {
      return createFilmDetailsCommentsList();
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
