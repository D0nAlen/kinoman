import { FILMS_CARDS } from "../const.js";

export const generateTopRatedFilms = (count) => {
  const filmsArray = new Array(count);
  // return new Array(count).fill(``).map(generateFilm);
  return Object.assign(filmsArray, FILMS_CARDS);
};
