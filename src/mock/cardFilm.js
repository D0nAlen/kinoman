// import { FILM_NAME } from "../const.js";
import { FILMS_CARDS } from "../const.js";

// const getRandomIntegerNumber = (min, max) => {
//   return min + Math.floor(Math.random() * max - min);
// };

// const getRandomArrayItem = (array) => {
//   const randomIndex = getRandomIntegerNumber(0, array.length);

//   return array[randomIndex];
// };

export const generateFilms = (count) => {
  const filmsArray = new Array(count);
  // return new Array(count).fill(``).map(generateFilm);
  return Object.assign(filmsArray, FILMS_CARDS);
};
