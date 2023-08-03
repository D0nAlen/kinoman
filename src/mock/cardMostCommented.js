import { FILMS_CARDS } from "../const.js";

export const generateMostCommentedFilms = (count) => {
  const filmsArray = new Array(count);
  // return new Array(count).fill(``).map(generateFilm);
  return Object.assign(filmsArray, FILMS_CARDS);
};
