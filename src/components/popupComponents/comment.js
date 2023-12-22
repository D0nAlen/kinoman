import AbstractComponent from "../abstract-component.js";

const createCommentTemplate = (comment) => {
    const { text, emotion, author, date } = comment;
  
    return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src=${emotion} width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${date}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
  };
  
  export default class CommentComponent extends AbstractComponent{
    constructor(comment) {
      super();
      this._comment = comment;
      this._element = null;
    }
  
    getTemplate() {
      return createCommentTemplate(this._comment);
    }
  
    // getElement() {
    //   if (!this._element) {
    //     this._element = createElement(this.getTemplate());
    //   }
    //   return this._element;
    // }
  
    // removeElement() {
    //   this._element = null;
    // }
  };
  