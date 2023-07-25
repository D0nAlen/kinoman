import { FILM_NAME } from "../const.js";

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * max - min);
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const generateFilm = () => {
  return {
    filmName: getRandomArrayItem(FILM_NAME),
    poster: `../public/images/posters/sagebrush-trail.jpg`,
    description: `Lorem ipsum dolor sit amet, 
      consectetur adipiscing elit. Cras aliquet 
      varius magna, non porta ligula feugiat 
      eget. Fusce tristique felis at fermentum 
      pharetra. Aliquam id orci ut lectus varius 
      viverra. Nullam nunc ex, convallis sed 
      finibus eget, sollicitudin eget ante. 
      Phasellus eros mauris, condimentum sed 
      nibh vitae, sodales efficitur ipsum. Sed 
      blandit, eros vel aliquam faucibus, purus 
      ex euismod diam, eu luctus nunc ante ut 
      dui. Sed sed nisi sed augue convallis 
      suscipit in sed felis. Aliquam erat 
      volutpat. Nunc fermentum tortor ac porta 
      dapibus. In rutrum ac purus sit amet 
      tempus.`,
    comment: {
      emotion: `^_^`,
      date: `04-05-2023`,
      author: `Gage`,
      message: `It's wonderful! I like it!`,
    },
  };
};

const generateFilms = (count) => {
  return new Array(count).fill(``).map(generateFilm);
};

export { generateFilm, generateFilms };
