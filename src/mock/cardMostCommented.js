import { FILMS_CARDS } from "../const.js";

export const generateMostCommentedFilms = (count) => {
  const filmsArray = new Array(count);
  return Object.assign(filmsArray, FILMS_CARDS);
};
