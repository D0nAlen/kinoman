import AbstractComponent from "../abstract-component.js";

// const createEmojiTemplate = (emoji) => {
//     return `<div class="film-details__emoji-list">
//     <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
//     <label class="film-details__emoji-label" for="emoji-smile">
//       <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
//     </label>

//     <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
//     <label class="film-details__emoji-label" for="emoji-sleeping">
//       <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
//     </label>

//     <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
//     <label class="film-details__emoji-label" for="emoji-puke">
//       <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
//     </label>

//     <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
//     <label class="film-details__emoji-label" for="emoji-angry">
//       <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
//     </label>
//     </div>
//     `;
// }

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