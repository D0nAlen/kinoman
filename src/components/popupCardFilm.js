import AbstractSmartComponent from "./abstract-smart-component.js";
import { generateGenres } from "../mock/genres.js";
import { generateComments } from "../mock/comment.js";
import { COMMENTS } from "../const.js";
import GenreTemplateComponent from "./popupComponents/genres.js";
import { RenderPosition, render, remove } from "../utils/render.js";
import CommentComponent from "./popupComponents/comment.js";

const createCloseButtonTemplate = () => {
  return `<div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>`;
};

const createPopupTemplate = (film, options = {}) => {
  const buttonCloseTemplate = createCloseButtonTemplate();

  const { watchlistCheckbox, watchedCheckbox, favoriteCheckbox } = options;
  //   return `<section class="film-details">
  //       <form class="film-details__inner" action="" method="get">
  //         <div class="form-details__top-container">
  //           <div class="film-details__close">
  //             <button class="film-details__close-btn" type="button">close</button>
  //           </div>
  //           <div class="film-details__info-wrap">
  //             <div class="film-details__poster">
  //               <img class="film-details__poster-img" src=${film.poster} alt="">

  //               <p class="film-details__age">${film.age}</p>
  //             </div>

  //             <div class="film-details__info">
  //               <div class="film-details__info-head">
  //                 <div class="film-details__title-wrap">
  //                   <h3 class="film-details__title">${film.filmName}</h3>
  //                   <p class="film-details__title-original">Original: ${film.originalFilmName}</p>
  //                 </div>

  //                 <div class="film-details__rating">
  //                   <p class="film-details__total-rating">${film.rating}</p>
  //                 </div>
  //               </div>

  //               <table class="film-details__table">
  //                 <tr class="film-details__row">
  //                   <td class="film-details__term">Director</td>
  //                   <td class="film-details__cell">${film.director}</td>
  //                 </tr>
  //                 <tr class="film-details__row">
  //                   <td class="film-details__term">Writers</td>
  //                   <td class="film-details__cell">${film.writers}</td>
  //                 </tr>
  //                 <tr class="film-details__row">
  //                   <td class="film-details__term">Actors</td>
  //                   <td class="film-details__cell">${film.actors}</td>
  //                 </tr>
  //                 <tr class="film-details__row">
  //                   <td class="film-details__term">Release Date</td>
  //                   <td class="film-details__cell">${film.releaseDate}</td>
  //                 </tr>
  //                 <tr class="film-details__row">
  //                   <td class="film-details__term">Runtime</td>
  //                   <td class="film-details__cell">${film.duration}</td>
  //                 </tr>
  //                 <tr class="film-details__row">
  //                   <td class="film-details__term">Country</td>
  //                   <td class="film-details__cell">${film.country}</td>
  //                 </tr>
  //                 <tr class="film-details__row">
  //                   <td class="film-details__term">Genres</td>
  //                   <td class="film-details__cell film-details-genres">

  //                 </tr>
  //               </table>

  //               <p class="film-details__film-description">
  //                 ${film.description}
  //               </p>
  //             </div>
  //           </div>

  //           <section class="film-details__controls">
  //             <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchlistCheckbox}>
  //             <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

  //             <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${watchedCheckbox}>
  //             <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

  //             <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite"  ${favoriteCheckbox}>
  //             <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
  //           </section>
  //         </div>

  //         <div class="form-details__bottom-container">
  //           <section class="film-details__comments-wrap">
  //             <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comment.length}</span></h3>

  //             <ul class="film-details__comments-list">
  //             </ul>

  //             <div class="film-details__new-comment">
  //               <div for="add-emoji" class="film-details__add-emoji-label">
  //               </div>

  //               <label class="film-details__comment-label">
  //                 <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
  //               </label>

  //               <div class="film-details__emoji-list">
  //               <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
  //               <label class="film-details__emoji-label" for="emoji-smile">
  //                 <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
  //               </label>

  //               <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
  //               <label class="film-details__emoji-label" for="emoji-sleeping">
  //                 <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
  //               </label>

  //               <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
  //               <label class="film-details__emoji-label" for="emoji-puke">
  //                 <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
  //               </label>

  //               <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
  //               <label class="film-details__emoji-label" for="emoji-angry">
  //                 <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
  //               </label>
  //               </div>
  //             </div>
  //           </section>
  //         </div>
  //       </form>
  //     </section>`;
  // };

  return `<section class="film-details">
<form class="film-details__inner" action="" method="get">
  <div class="form-details__top-container">
    ${buttonCloseTemplate}
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
      <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchlistCheckbox}>
      <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${watchedCheckbox}>
      <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite"  ${favoriteCheckbox}>
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
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
        <label class="film-details__emoji-label" for="emoji-smile">
          <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
        <label class="film-details__emoji-label" for="emoji-sleeping">
          <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
        <label class="film-details__emoji-label" for="emoji-puke">
          <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
        </label>

        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
        <label class="film-details__emoji-label" for="emoji-angry">
          <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
        </label>
        </div>
      </div>
    </section>
  </div>
</form>
</section>`;
};

export default class PopupComponent extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;

    this._isAddToWatchlist = !!film.addToWatchlist;
    this._isMarkAsFavorite = !!film.markAsFavorite;
    this._isMarkAsWatched = !!film.markAsWatched;


    // this._isAddToWatchlist = Object.values(film.addToWatchlist).some(Boolean);

    this._flatpickr = null;
    this._submitHandler = null;

    // this._applyFlatpickr();
    this._renderPopup();
    this._subscribeOnEvents();
  }

  // 1)навесить оставшиеся обработчики событий, сделать их интерактивными
  getTemplate() {
    return createPopupTemplate(this._film, {
      watchlistCheckbox: this._isAddToWatchlist ? "checked" : "unchecked",
      watchedCheckbox: this._isMarkAsWatched ? "checked" : "unchecked",
      favoriteCheckbox: this._isMarkAsFavorite ? "checked" : "unchecked",
    });
  }

  _renderPopup() {
    // const topContainer = this.getElement().querySelector(".form-details__top-container");
    // render(topContainer, new CloseButtonComponent(), RenderPosition.AFTERBEGIN);

    const genres = generateGenres(this._film.genres);
    const comments = generateComments(COMMENTS);
    //genres rendering
    const filmDetailsGenres = this.getElement().querySelector(".film-details-genres");

    for (let i = 0; i < genres.length; i++) {
      render(filmDetailsGenres, new GenreTemplateComponent(genres[i]), RenderPosition.BEFOREEND);
    }

    // comments rendering
    const commentsList = this.getElement().querySelector(".film-details__comments-list");
    for (let i = 0; i < comments.length; i++) {
      render(commentsList, new CommentComponent(comments[i]), RenderPosition.BEFOREEND);
    }
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
    this._renderPopup();
    // const genres = generateGenres(this._film.genres);
    // const comments = generateComments(COMMENTS);

    // // render(this._popup, this._popupComponent, RenderPosition.BEFOREEND);
    // render(this._popup, this._popupComponent, RenderPosition.BEFOREEND);

    // // 1)список комментов и жанров стирается при перерисовке!!!
    // //genres rendering
    // const filmDetailsGenres = this._popup.querySelector(".film-details-genres");
    // for (let i = 0; i < genres.length; i++) {
    //     render(filmDetailsGenres, new GenreTemplateComponent(genres[i]), RenderPosition.BEFOREEND);
    // }

    // // comments rendering
    // const commentsList = this._popup.querySelector(".film-details__comments-list");
    // for (let i = 0; i < comments.length; i++) {
    //     render(commentsList, new CommentComponent(comments[i]), RenderPosition.BEFOREEND);
    // }
    // this._applyFlatpickr();
  }

  // нужен рефакторинг!
  reset() {
    // const film = this._film;

    // // this._isDateShowing = !!task.dueDate;
    // this._isRepeatingTask = Object.values(task.repeatingDays).some(Boolean);
    // this._activeRepeatingDays = Object.assign({}, task.repeatingDays);

    // this.rerender();
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`)
      .addEventListener(`submit`, handler);

    this._submitHandler = handler;
  }


  // 1)нужно заново навесить обработчики событий(только в попап),
  // 2)обработчики кнопок эмодзи,
  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, () => {
        this._isAddToWatchlist = !this._isAddToWatchlist;
        this.rerender();
      });

    element.querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, () => {
        this._isMarkAsWatched = !this._isMarkAsWatched;
        this.rerender();
      });

    element.querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, () => {
        this._isMarkAsFavorite = !this._isMarkAsFavorite;
        this.rerender();
      });


    element.querySelector(`.film-details__close`)
      .addEventListener('click', () => {
        remove(this);
      });

    // element.querySelectorAll(`.film-details__emoji-label`).forEach(emoji => {
    //   emoji.addEventListener(`click`, () => {
    //     this.rerender();
    //   });
    // });
  }

  setCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close`)
      .addEventListener(`click`, handler);
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

  // перенести логику функции в MovieController?
  setEmotionButtonClickHandler() {
    let emojiIcon = this.getElement().querySelector(".film-details__add-emoji-label");
    this.getElement().querySelectorAll(`.film-details__emoji-label`).forEach(emoji => {

      emoji.addEventListener(`click`, () => {
        let cloneEmoji = emoji.cloneNode(true);
        let emojiImage = cloneEmoji.querySelector("img");

        emojiIcon.style = `border: none;
                           background-color: rgba(255, 255, 255, 0);`;
        cloneEmoji.style = `opacity: 1; 
                            margin: 0px;`;
        emojiImage.style = `height: 70px;
                            width: 70px;`;

        emojiIcon.innerHTML = ``;
        emojiIcon.appendChild(cloneEmoji);
      });
    });
  }
};