import { RenderPosition, render } from "../utils/render.js";
import AbstractSmartComponent from "./abstract-smart-component.js";

// const createPopupTemplate = (film) => {
//   return `<section class="film-details">
//     <form class="film-details__inner" action="" method="get">
//       <div class="form-details__top-container">
//         <div class="film-details__close">
//           <button class="film-details__close-btn" type="button">close</button>
//         </div>
//         <div class="film-details__info-wrap">
//           <div class="film-details__poster">
//             <img class="film-details__poster-img" src=${film.poster} alt="">
  
//             <p class="film-details__age">${film.age}</p>
//           </div>
  
//           <div class="film-details__info">
//             <div class="film-details__info-head">
//               <div class="film-details__title-wrap">
//                 <h3 class="film-details__title">${film.filmName}</h3>
//                 <p class="film-details__title-original">Original: ${film.originalFilmName}</p>
//               </div>
  
//               <div class="film-details__rating">
//                 <p class="film-details__total-rating">${film.rating}</p>
//               </div>
//             </div>
  
//             <table class="film-details__table">
//               <tr class="film-details__row">
//                 <td class="film-details__term">Director</td>
//                 <td class="film-details__cell">${film.director}</td>
//               </tr>
//               <tr class="film-details__row">
//                 <td class="film-details__term">Writers</td>
//                 <td class="film-details__cell">${film.writers}</td>
//               </tr>
//               <tr class="film-details__row">
//                 <td class="film-details__term">Actors</td>
//                 <td class="film-details__cell">${film.actors}</td>
//               </tr>
//               <tr class="film-details__row">
//                 <td class="film-details__term">Release Date</td>
//                 <td class="film-details__cell">${film.releaseDate}</td>
//               </tr>
//               <tr class="film-details__row">
//                 <td class="film-details__term">Runtime</td>
//                 <td class="film-details__cell">${film.duration}</td>
//               </tr>
//               <tr class="film-details__row">
//                 <td class="film-details__term">Country</td>
//                 <td class="film-details__cell">${film.country}</td>
//               </tr>
//               <tr class="film-details__row">
//                 <td class="film-details__term">Genres</td>
//                 <td class="film-details__cell film-details-genres">
     
//               </tr>
//             </table>
  
//             <p class="film-details__film-description">
//               ${film.description}
//             </p>
//           </div>
//         </div>
  
//         <section class="film-details__controls">
//           <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
//           <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
  
//           <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
//           <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
  
//           <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
//           <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
//         </section>
//       </div>
  
//       <div class="form-details__bottom-container">
//         <section class="film-details__comments-wrap">
//           <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comment.length}</span></h3>
  
//           <ul class="film-details__comments-list">
//           </ul>
  
//           <div class="film-details__new-comment">
//             <div for="add-emoji" class="film-details__add-emoji-label">
//             </div>
  
//             <label class="film-details__comment-label">
//               <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
//             </label>
  
//             <div class="film-details__emoji-list">
//             <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
//             <label class="film-details__emoji-label" for="emoji-smile">
//               <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
//             </label>

//             <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
//             <label class="film-details__emoji-label" for="emoji-sleeping">
//               <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
//             </label>

//             <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
//             <label class="film-details__emoji-label" for="emoji-puke">
//               <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
//             </label>

//             <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
//             <label class="film-details__emoji-label" for="emoji-angry">
//               <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
//             </label>
//             </div>
//           </div>
//         </section>
//       </div>
//     </form>
//   </section>`;
// };

const createPopupTemplate = (film) => {
  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src=${film.poster} alt="">
  
            <p class="film-details__age">${film.age}</p>
          </div>
  
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${film.filmName}</h3>
                <p class="film-details__title-original">Original: ${film.originalFilmName}</p>
              </div>
  
              <div class="film-details__rating">
                <p class="film-details__total-rating">${film.rating}</p>
              </div>
            </div>
  
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${film.director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${film.writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${film.actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${film.releaseDate}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${film.duration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${film.country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell film-details-genres">
     
              </tr>
            </table>
  
            <p class="film-details__film-description">
              ${film.description}
            </p>
          </div>
        </div>
  
        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
  
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
  
          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>
  
      <div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comment.length}</span></h3>
  
          <ul class="film-details__comments-list">
          </ul>
  
          <div class="film-details__new-comment">
            <div for="add-emoji" class="film-details__add-emoji-label">
            </div>
  
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>
  
            <div class="film-details__emoji-list">
            </div>

          </div>
        </section>
      </div>
    </form>
  </section>`;
};




// 1) нужно вставить эмодзи по клику, с таким размером:  <img src="./images/emoji/smile.png" width="70" height="70" alt="emoji">

export default class PopupComponent extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createPopupTemplate(this._film);
  }

  recoveryListeners() {

  }

  setAddToWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, handler);
  }

  setMarkAsWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, handler);
  }

  setMarkAsFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, handler);
  }

  // 1)нужно, чтобы по клику на эмодзи, смайлик подставлялся в кружок слева от поля с комментарием.
  // 2)emoji должен быть объектом класса!!!
  // setEmotionButtonClickHandler() {
  //   let emojiIcon = this.getElement().querySelector(".film-details__add-emoji-label");
  //   this.getElement().querySelectorAll(`.film-details__emoji-label`).forEach(emoji => {
  //     emoji.addEventListener(`click`, () => {
  //       render(emojiIcon, emoji, RenderPosition.BEFOREEND);
  //           });
  //   });
  // }
};