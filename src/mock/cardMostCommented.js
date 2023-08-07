import { FILMS_CARDS } from "../const.js";

export const generateMostCommentedFilms = (count) => {
  const filmsArray = new Array();
  return FILMS_CARDS.slice(filmsArray,count);

};
