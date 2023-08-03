import { FILMS_CARDS } from "../const.js";

export const generateTopRatedFilms = (count) => {
  const filmsArray = new Array();
  return FILMS_CARDS.slice(filmsArray,count);

};
