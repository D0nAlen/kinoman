import { TOP_RATED_CARDS } from "../const.js";

export const generateTopRatedFilms = (count) => {
  return TOP_RATED_CARDS.slice(0, count);
};
