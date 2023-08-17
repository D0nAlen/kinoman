import { FILMS_CARDS } from "../const.js";
import { WATCHLIST_CARDS } from "../const.js";

export const generateFilms = (count) => {
  let getFilmsArray = new Array();
 return Object.assign(FILMS_CARDS);
  // return getFilmsArray.slice(count);
};

export const generateWatchlistFilms = (count) => {
  let getFilmsArray = new Array();
 return Object.assign(WATCHLIST_CARDS);
  // return getFilmsArray.slice(count);
};
