export const generateFilms = (arrayFilms, count) => {
  return count === arrayFilms.length
    ? arrayFilms.slice()
    : arrayFilms.slice(0, count);
};
