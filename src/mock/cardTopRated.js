import { FILMS_CARDS } from "../const.js";

export const generateTopRatedFilms = (count) => {
  const filmsArray = new Array(count);
  return Object.assign(filmsArray, FILMS_CARDS);
};
