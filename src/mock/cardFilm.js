import { FILM_NAME } from "../const.js";
import { FILMS_CARDS } from "../const.js";

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * max - min);
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

// const generateFilm = () => {
//   return {
//     filmName: getRandomArrayItem(FILM_NAME),
//     rating: 3.2,
//     year: 1933,
//     duration: "54m",
//     genre: "Western",
//     poster: `"./images/posters/made-for-each-other.png"`,
//     description: `Lorem ipsum dolor sit amet,
//       consectetur adipiscing elit. Cras aliquet
//       varius magna, non porta ligula feugiat
//       eget. Fusce tristique felis at fermentum
//       pharetra. Aliquam id orci ut lectus varius
//       viverra. Nullam nunc ex, convallis sed
//       finibus eget, sollicitudin eget ante.
//       Phasellus eros mauris, condimentum sed
//       nibh vitae, sodales efficitur ipsum. Sed
//       blandit, eros vel aliquam faucibus, purus
//       ex euismod diam, eu luctus nunc ante ut
//       dui. Sed sed nisi sed augue convallis
//       suscipit in sed felis. Aliquam erat
//       volutpat. Nunc fermentum tortor ac porta
//       dapibus. In rutrum ac purus sit amet
//       tempus.`,
//     comment: COMMENTS,
//   };
// };

const generateFilms = (count) => {
  let filmsArray = new Array(count);
  // return new Array(count).fill(``).map(generateFilm);
  return Object.assign(filmsArray, FILMS_CARDS);
};

export { generateFilms };
