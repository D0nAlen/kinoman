import AbstractComponent from "../abstract-component.js";

const createEmojiTemplate = (emoji) => {
  return `<div><input class="film-details__emoji-item visually-hidden" name="comment-emoji" 
              type="radio" id="emoji-${emoji.type}" value=${emoji.type}>
             
          <label class="film-details__emoji-label" for="emoji-${emoji.type}">
              <img src="${emoji.src}" width="30" height="30" alt="emoji">
          </label></div>`;
}

export default class EmojiComponent extends AbstractComponent {

  constructor(emoji) {
    super();
    this._emoji = emoji;
  }

  getTemplate() {
    return createEmojiTemplate(this._emoji);
  }
}