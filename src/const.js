export const FILM_NAME = [
  `Sagebrush Trail`,
  `The Great Flamarion`,
  `The Dance of Life`,
  `The Man with the Golden Arm`,
];

export const COMMENTS = [
  {
    text: "Interesting setting and a good cast",
    emotion: "./images/emoji/smile.png",
    author: "Tim Macoveev",
    date: "2019/12/31 23:59",
  },
  {
    text: "Booooooooooring",
    emotion: "./images/emoji/sleeping.png",
    author: "John Doe",
    date: "2019/12/31 23:59",
  },
  {
    text: "Very very old. Meh",
    emotion: "./images/emoji/puke.png",
    author: "John Doe",
    date: "2019/12/31 23:59",
  },
  {
    text: "Almost two hours? Seriously?",
    emotion: "./images/emoji/angry.png",
    author: "John Doe",
    date: "2019/12/31 23:59",
  },
  {
    text: "Almost two hours? Seriously?",
    emotion: "./images/emoji/angry.png",
    author: "John Doe",
    date: "2019/12/31 23:59",
  },
];

export const EMOJIS = [
  {
    type: "smile",
    src: "./images/emoji/smile.png",
  },

  {
    type: "sleeping",
    src: "./images/emoji/sleeping.png",
  },

  {
    type: "puke",
    src: "./images/emoji/puke.png",
  },

  {
    type: "angry",
    src: "./images/emoji/angry.png",
  },
];

// 20 фильмов
export let FILMS_CARDS = [
  {
    filmName: `The Great Flamarion`,
    originalFilmName: `The Great Flamarion`,
    director: `Anthony Mann`,
    writers: `Anne Wigton, Heinz Herald, Richard Weil`,
    actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
    releaseDate: `30 March 1945`,
    country: `USA`,
    genres: [`Drama`, `Film-Noir`, `Mystery`],
    rating: 8.9,
    year: 1943,
    duration: "1h 18m",
    poster: `"./images/posters/the-great-flamarion.jpg"`,
    description: `The film opens following a murder at a cabaret in Mexico City in 1936,
    and then presents the events leading up to it in flashback. The Great Flamarion (Erich von Stroheim)
    is an arrogant, friendless, and misogynous marksman who displays his trick gunshot act in the vaudeville circuit. 
    His show features a beautiful assistant, Connie (Mary Beth Hughes) and her drunken husband Al (Dan Duryea), 
    Flamarion's other assistant. Flamarion falls in love with Connie, the movie's femme fatale, and is soon manipulated 
    by her into killing her no good husband during one of their acts.`,
    comment: COMMENTS,
    age: "18+",
    addToWatchlist: false,
    markAsFavorite: true,
    markAsWatched: true,
  },

  {
    filmName: `Sagebrush Trail`,
    originalFilmName: `Sagebrush Trail`,
    director: `Lorem ipsum dolor sit amet`,
    writers: `Anne Wigton, Heinz Herald, Richard Weil`,
    actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
    releaseDate: `30 March 1945`,
    country: `USA`,
    genres: [`Drama`, `Film-Noir`, `Mystery`],
    rating: 3.2,
    year: 1933,
    duration: "54m",
    poster: `"./images/posters/sagebrush-trail.jpg"`,
    description: `Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.Cras aliquet 
      varius magna, non porta ligula feugiat 
      eget.Fusce tristique felis at fermentum 
      pharetra.Aliquam id orci ut lectus varius 
      viverra.Nullam nunc ex, convallis sed 
      finibus eget, sollicitudin eget ante. 
      Phasellus eros mauris, condimentum sed 
      nibh vitae, sodales efficitur ipsum.Sed 
      blandit, eros vel aliquam faucibus, purus 
      ex euismod diam, eu luctus nunc ante ut 
      dui.Sed sed nisi sed augue convallis 
      suscipit in sed felis.Aliquam erat 
      volutpat.Nunc fermentum tortor ac porta 
      dapibus.In rutrum ac purus sit amet 
      tempus.`,
    comment: COMMENTS,
    age: "18+",
    addToWatchlist: true,
    markAsFavorite: true,
    markAsWatched: false,
  },

  {
    filmName: `example`,
    originalFilmName: `example`,
    writers: `Anne Wigton, Heinz Herald, Richard Weil`,
    actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
    releaseDate: `30 March 1945`,
    country: `USA`,
    genres: [`Drama`, `Film-Noir`, `Mystery`],
    rating: 5.7,
    year: 1945,
    duration: "54m",
    poster: `"./images/posters/popeye-meets-sinbad.png"`,
    description: `Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.Cras aliquet 
      varius magna, non porta ligula feugiat 
      eget.Fusce tristique felis at fermentum 
      pharetra.Aliquam id orci ut lectus varius 
      viverra.Nullam nunc ex, convallis sed 
      finibus eget, sollicitudin eget ante. 
      Phasellus eros mauris, condimentum sed 
      nibh vitae, sodales efficitur ipsum.Sed 
      blandit, eros vel aliquam faucibus, purus 
      ex euismod diam, eu luctus nunc ante ut 
      dui.Sed sed nisi sed augue convallis 
      suscipit in sed felis.Aliquam erat 
      volutpat.Nunc fermentum tortor ac porta 
      dapibus.In rutrum ac purus sit amet 
      tempus.`,
    comment: COMMENTS,
    age: "18+",
    addToWatchlist: true,
    markAsFavorite: false,
    markAsWatched: true,
  },

  {
    filmName: `example`,
    originalFilmName: `example`,
    writers: `Anne Wigton, Heinz Herald, Richard Weil`,
    actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
    releaseDate: `30 March 1945`,
    country: `USA`,
    genres: [`Drama`, `Film-Noir`, `Mystery`],
    rating: 3.9,
    year: 1998,
    duration: "54m",
    poster: `"./images/posters/the-dance-of-life.jpg"`,
    description: `Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.Cras aliquet 
      varius magna, non porta ligula feugiat 
      eget.Fusce tristique felis at fermentum 
      pharetra.Aliquam id orci ut lectus varius 
      viverra.Nullam nunc ex, convallis sed 
      finibus eget, sollicitudin eget ante. 
      Phasellus eros mauris, condimentum sed 
      nibh vitae, sodales efficitur ipsum.Sed 
      blandit, eros vel aliquam faucibus, purus 
      ex euismod diam, eu luctus nunc ante ut 
      dui.Sed sed nisi sed augue convallis 
      suscipit in sed felis.Aliquam erat 
      volutpat.Nunc fermentum tortor ac porta 
      dapibus.In rutrum ac purus sit amet 
      tempus.`,
    comment: COMMENTS,
    age: "18+",
    addToWatchlist: false,
    markAsFavorite: false,
    markAsWatched: false,
  },

  {
    filmName: `example`,
    originalFilmName: `example`,
    writers: `Anne Wigton, Heinz Herald, Richard Weil`,
    actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
    releaseDate: `30 March 1945`,
    country: `USA`,
    genres: [`Drama`, `Film-Noir`, `Mystery`],
    rating: 3.2,
    year: 1933,
    duration: "54m",
    poster: `"./images/posters/the-man-with-the-golden-arm.jpg"`,
    description: `Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.Cras aliquet 
      varius magna, non porta ligula feugiat 
      eget.Fusce tristique felis at fermentum 
      pharetra.Aliquam id orci ut lectus varius 
      viverra.Nullam nunc ex, convallis sed 
      finibus eget, sollicitudin eget ante. 
      Phasellus eros mauris, condimentum sed 
      nibh vitae, sodales efficitur ipsum.Sed 
      blandit, eros vel aliquam faucibus, purus 
      ex euismod diam, eu luctus nunc ante ut 
      dui.Sed sed nisi sed augue convallis 
      suscipit in sed felis.Aliquam erat 
      volutpat.Nunc fermentum tortor ac porta 
      dapibus.In rutrum ac purus sit amet 
      tempus.`,
    comment: COMMENTS,
    age: "18+",
    addToWatchlist: false,
    markAsFavorite: true,
    markAsWatched: true,
  },


  {
    filmName: `example`,
    originalFilmName: `example`,
    writers: `Anne Wigton, Heinz Herald, Richard Weil`,
    actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
    releaseDate: `30 March 1945`,
    country: `USA`,
    genres: [`Drama`, `Film-Noir`, `Mystery`],
    rating: 3.2,
    year: 1933,
    duration: "54m",
    genre: "Western",
    poster: `"./images/posters/santa-claus-conquers-the-martians.jpg"`,
    description: `Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.Cras aliquet 
      varius magna, non porta ligula feugiat 
      eget.Fusce tristique felis at fermentum 
      pharetra.Aliquam id orci ut lectus varius 
      viverra.Nullam nunc ex, convallis sed 
      finibus eget, sollicitudin eget ante. 
      Phasellus eros mauris, condimentum sed 
      nibh vitae, sodales efficitur ipsum.Sed 
      blandit, eros vel aliquam faucibus, purus 
      ex euismod diam, eu luctus nunc ante ut 
      dui.Sed sed nisi sed augue convallis 
      suscipit in sed felis.Aliquam erat 
      volutpat.Nunc fermentum tortor ac porta 
      dapibus.In rutrum ac purus sit amet 
      tempus.`,
    comment: COMMENTS,
    age: "18+",
    addToWatchlist: true,
    markAsFavorite: false,
    markAsWatched: true,
  },
  {
    filmName: `example`,
    originalFilmName: `example`,
    writers: `Anne Wigton, Heinz Herald, Richard Weil`,
    actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
    releaseDate: `30 March 1945`,
    country: `USA`,
    genres: [`Drama`, `Film-Noir`, `Mystery`],
    rating: 3.2,
    year: 1933,
    duration: "54m",
    poster: `"./images/posters/sagebrush-trail.jpg"`,
    description: `Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.Cras aliquet 
      varius magna, non porta ligula feugiat 
      eget.Fusce tristique felis at fermentum 
      pharetra.Aliquam id orci ut lectus varius 
      viverra.Nullam nunc ex, convallis sed 
      finibus eget, sollicitudin eget ante. 
      Phasellus eros mauris, condimentum sed 
      nibh vitae, sodales efficitur ipsum.Sed 
      blandit, eros vel aliquam faucibus, purus 
      ex euismod diam, eu luctus nunc ante ut 
      dui.Sed sed nisi sed augue convallis 
      suscipit in sed felis.Aliquam erat 
      volutpat.Nunc fermentum tortor ac porta 
      dapibus.In rutrum ac purus sit amet 
      tempus.`,
    comment: COMMENTS,
    age: "18+",
    addToWatchlist: false,
    markAsFavorite: false,
    markAsWatched: false,
  },

  {
    filmName: `example`,
    originalFilmName: `example`,
    writers: `Anne Wigton, Heinz Herald, Richard Weil`,
    actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
    releaseDate: `30 March 1945`,
    country: `USA`,
    genres: [`Drama`, `Film-Noir`, `Mystery`],
    rating: 3.2,
    year: 1933,
    duration: "54m",
    poster: `"./images/posters/made-for-each-other.png"`,
    description: `Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.Cras aliquet 
      varius magna, non porta ligula feugiat 
      eget.Fusce tristique felis at fermentum 
      pharetra.Aliquam id orci ut lectus varius 
      viverra.Nullam nunc ex, convallis sed 
      finibus eget, sollicitudin eget ante. 
      Phasellus eros mauris, condimentum sed 
      nibh vitae, sodales efficitur ipsum.Sed 
      blandit, eros vel aliquam faucibus, purus 
      ex euismod diam, eu luctus nunc ante ut 
      dui.Sed sed nisi sed augue convallis 
      suscipit in sed felis.Aliquam erat 
      volutpat.Nunc fermentum tortor ac porta 
      dapibus.In rutrum ac purus sit amet 
      tempus.`,
    comment: COMMENTS,
    age: "18+",
    addToWatchlist: false,
    markAsFavorite: false,
    markAsWatched: false,
  },

  {
    filmName: `example`,
    originalFilmName: `example`,
    writers: `Anne Wigton, Heinz Herald, Richard Weil`,
    actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
    releaseDate: `30 March 1945`,
    country: `USA`,
    genres: [`Drama`, `Film-Noir`, `Mystery`],
    rating: 3.2,
    year: 1933,
    duration: "54m",
    poster: `"./images/posters/the-dance-of-life.jpg"`,
    description: `Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.Cras aliquet 
      varius magna, non porta ligula feugiat 
      eget.Fusce tristique felis at fermentum 
      pharetra.Aliquam id orci ut lectus varius 
      viverra.Nullam nunc ex, convallis sed 
      finibus eget, sollicitudin eget ante. 
      Phasellus eros mauris, condimentum sed 
      nibh vitae, sodales efficitur ipsum.Sed 
      blandit, eros vel aliquam faucibus, purus 
      ex euismod diam, eu luctus nunc ante ut 
      dui.Sed sed nisi sed augue convallis 
      suscipit in sed felis.Aliquam erat 
      volutpat.Nunc fermentum tortor ac porta 
      dapibus.In rutrum ac purus sit amet 
      tempus.`,
    comment: COMMENTS,
    age: "18+",
    addToWatchlist: false,
    markAsFavorite: false,
    markAsWatched: false,
  },

  {
    filmName: `example`,
    originalFilmName: `example`,
    writers: `Anne Wigton, Heinz Herald, Richard Weil`,
    actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
    releaseDate: `30 March 1945`,
    country: `USA`,
    genres: [`Drama`, `Film-Noir`, `Mystery`],
    rating: 3.2,
    year: 1933,
    duration: "54m",
    poster: `"./images/posters/the-man-with-the-golden-arm.jpg"`,
    description: `Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.Cras aliquet 
      varius magna, non porta ligula feugiat 
      eget.Fusce tristique felis at fermentum 
      pharetra.Aliquam id orci ut lectus varius 
      viverra.Nullam nunc ex, convallis sed 
      finibus eget, sollicitudin eget ante. 
      Phasellus eros mauris, condimentum sed 
      nibh vitae, sodales efficitur ipsum.Sed 
      blandit, eros vel aliquam faucibus, purus 
      ex euismod diam, eu luctus nunc ante ut 
      dui.Sed sed nisi sed augue convallis 
      suscipit in sed felis.Aliquam erat 
      volutpat.Nunc fermentum tortor ac porta 
      dapibus.In rutrum ac purus sit amet 
      tempus.`,
    comment: COMMENTS,
    age: "18+",
    addToWatchlist: false,
    markAsFavorite: false,
    markAsWatched: false,
  },

  {
    filmName: `example`,
    originalFilmName: `example`,
    writers: `Anne Wigton, Heinz Herald, Richard Weil`,
    actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
    releaseDate: `30 March 1945`,
    country: `USA`,
    genres: [`Drama`, `Film-Noir`, `Mystery`],
    rating: 3.2,
    year: 1933,
    duration: "54m",
    poster: `"./images/posters/the-great-flamarion.jpg"`,
    description: `Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.Cras aliquet 
      varius magna, non porta ligula feugiat 
      eget.Fusce tristique felis at fermentum 
      pharetra.Aliquam id orci ut lectus varius 
      viverra.Nullam nunc ex, convallis sed 
      finibus eget, sollicitudin eget ante. 
      Phasellus eros mauris, condimentum sed 
      nibh vitae, sodales efficitur ipsum.Sed 
      blandit, eros vel aliquam faucibus, purus 
      ex euismod diam, eu luctus nunc ante ut 
      dui.Sed sed nisi sed augue convallis 
      suscipit in sed felis.Aliquam erat 
      volutpat.Nunc fermentum tortor ac porta 
      dapibus.In rutrum ac purus sit amet 
      tempus.`,
    comment: COMMENTS,
    age: "18+",
    addToWatchlist: false,
    markAsFavorite: false,
    markAsWatched: false,
  },
  {
    filmName: `example`,
    originalFilmName: `example`,
    writers: `Anne Wigton, Heinz Herald, Richard Weil`,
    actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
    releaseDate: `30 March 1945`,
    country: `USA`,
    genres: [`Drama`, `Film-Noir`, `Mystery`],
    rating: 3.2,
    year: 1933,
    duration: "54m",
    poster: `"./images/posters/santa-claus-conquers-the-martians.jpg"`,
    description: `Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.Cras aliquet 
      varius magna, non porta ligula feugiat 
      eget.Fusce tristique felis at fermentum 
      pharetra.Aliquam id orci ut lectus varius 
      viverra.Nullam nunc ex, convallis sed 
      finibus eget, sollicitudin eget ante. 
      Phasellus eros mauris, condimentum sed 
      nibh vitae, sodales efficitur ipsum.Sed 
      blandit, eros vel aliquam faucibus, purus 
      ex euismod diam, eu luctus nunc ante ut 
      dui.Sed sed nisi sed augue convallis 
      suscipit in sed felis.Aliquam erat 
      volutpat.Nunc fermentum tortor ac porta 
      dapibus.In rutrum ac purus sit amet 
      tempus.`,
    comment: COMMENTS,
    age: "18+",
    addToWatchlist: false,
    markAsFavorite: false,
    markAsWatched: false,
  },
  {
    filmName: `example`,
    originalFilmName: `example`,
    writers: `Anne Wigton, Heinz Herald, Richard Weil`,
    actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
    releaseDate: `30 March 1945`,
    country: `USA`,
    genres: [`Drama`, `Film-Noir`, `Mystery`],
    rating: 3.2,
    year: 1933,
    duration: "54m",
    poster: `"./images/posters/sagebrush-trail.jpg"`,
    description: `Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.Cras aliquet 
      varius magna, non porta ligula feugiat 
      eget.Fusce tristique felis at fermentum 
      pharetra.Aliquam id orci ut lectus varius 
      viverra.Nullam nunc ex, convallis sed 
      finibus eget, sollicitudin eget ante. 
      Phasellus eros mauris, condimentum sed 
      nibh vitae, sodales efficitur ipsum.Sed 
      blandit, eros vel aliquam faucibus, purus 
      ex euismod diam, eu luctus nunc ante ut 
      dui.Sed sed nisi sed augue convallis 
      suscipit in sed felis.Aliquam erat 
      volutpat.Nunc fermentum tortor ac porta 
      dapibus.In rutrum ac purus sit amet 
      tempus.`,
    comment: COMMENTS,
    age: "18+",
    addToWatchlist: false,
    markAsFavorite: false,
    markAsWatched: false,
  },

  {
    filmName: `example`,
    originalFilmName: `example`,
    writers: `Anne Wigton, Heinz Herald, Richard Weil`,
    actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
    releaseDate: `30 March 1945`,
    country: `USA`,
    genres: [`Drama`, `Film-Noir`, `Mystery`],
    rating: 3.2,
    year: 1933,
    duration: "54m",
    poster: `"./images/posters/made-for-each-other.png"`,
    description: `Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.Cras aliquet 
      varius magna, non porta ligula feugiat 
      eget.Fusce tristique felis at fermentum 
      pharetra.Aliquam id orci ut lectus varius 
      viverra.Nullam nunc ex, convallis sed 
      finibus eget, sollicitudin eget ante. 
      Phasellus eros mauris, condimentum sed 
      nibh vitae, sodales efficitur ipsum.Sed 
      blandit, eros vel aliquam faucibus, purus 
      ex euismod diam, eu luctus nunc ante ut 
      dui.Sed sed nisi sed augue convallis 
      suscipit in sed felis.Aliquam erat 
      volutpat.Nunc fermentum tortor ac porta 
      dapibus.In rutrum ac purus sit amet 
      tempus.`,
    comment: COMMENTS,
    age: "18+",
    addToWatchlist: false,
    markAsFavorite: false,
    markAsWatched: false,
  },

  {
    filmName: `example`,
    originalFilmName: `example`,
    writers: `Anne Wigton, Heinz Herald, Richard Weil`,
    actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
    releaseDate: `30 March 1945`,
    country: `USA`,
    genres: [`Drama`, `Film-Noir`, `Mystery`],
    rating: 3.2,
    year: 1933,
    duration: "54m",
    poster: `"./images/posters/the-dance-of-life.jpg"`,
    description: `Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.Cras aliquet 
      varius magna, non porta ligula feugiat 
      eget.Fusce tristique felis at fermentum 
      pharetra.Aliquam id orci ut lectus varius 
      viverra.Nullam nunc ex, convallis sed 
      finibus eget, sollicitudin eget ante. 
      Phasellus eros mauris, condimentum sed 
      nibh vitae, sodales efficitur ipsum.Sed 
      blandit, eros vel aliquam faucibus, purus 
      ex euismod diam, eu luctus nunc ante ut 
      dui.Sed sed nisi sed augue convallis 
      suscipit in sed felis.Aliquam erat 
      volutpat.Nunc fermentum tortor ac porta 
      dapibus.In rutrum ac purus sit amet 
      tempus.`,
    comment: COMMENTS,
    age: "18+",
    addToWatchlist: false,
    markAsFavorite: false,
    markAsWatched: false,
  },

  {
    filmName: `example`,
    originalFilmName: `example`,
    writers: `Anne Wigton, Heinz Herald, Richard Weil`,
    actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
    releaseDate: `30 March 1945`,
    country: `USA`,
    genres: [`Drama`, `Film-Noir`, `Mystery`],
    rating: 3.2,
    year: 1933,
    duration: "54m",
    poster: `"./images/posters/the-man-with-the-golden-arm.jpg"`,
    description: `Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.Cras aliquet 
      varius magna, non porta ligula feugiat 
      eget.Fusce tristique felis at fermentum 
      pharetra.Aliquam id orci ut lectus varius 
      viverra.Nullam nunc ex, convallis sed 
      finibus eget, sollicitudin eget ante. 
      Phasellus eros mauris, condimentum sed 
      nibh vitae, sodales efficitur ipsum.Sed 
      blandit, eros vel aliquam faucibus, purus 
      ex euismod diam, eu luctus nunc ante ut 
      dui.Sed sed nisi sed augue convallis 
      suscipit in sed felis.Aliquam erat 
      volutpat.Nunc fermentum tortor ac porta 
      dapibus.In rutrum ac purus sit amet 
      tempus.`,
    comment: COMMENTS,
    age: "18+",
    addToWatchlist: false,
    markAsFavorite: false,
    markAsWatched: false,
  },

  {
    filmName: `example`,
    originalFilmName: `example`,
    writers: `Anne Wigton, Heinz Herald, Richard Weil`,
    actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
    releaseDate: `30 March 1945`,
    country: `USA`,
    genres: [`Drama`, `Film-Noir`, `Mystery`],
    rating: 3.2,
    year: 1933,
    duration: "54m",
    poster: `"./images/posters/the-great-flamarion.jpg"`,
    description: `Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.Cras aliquet 
      varius magna, non porta ligula feugiat 
      eget.Fusce tristique felis at fermentum 
      pharetra.Aliquam id orci ut lectus varius 
      viverra.Nullam nunc ex, convallis sed 
      finibus eget, sollicitudin eget ante. 
      Phasellus eros mauris, condimentum sed 
      nibh vitae, sodales efficitur ipsum.Sed 
      blandit, eros vel aliquam faucibus, purus 
      ex euismod diam, eu luctus nunc ante ut 
      dui.Sed sed nisi sed augue convallis 
      suscipit in sed felis.Aliquam erat 
      volutpat.Nunc fermentum tortor ac porta 
      dapibus.In rutrum ac purus sit amet 
      tempus.`,
    comment: COMMENTS,
    age: "18+",
    addToWatchlist: false,
    markAsFavorite: false,
    markAsWatched: false,
  },
  {
    filmName: `example`,
    originalFilmName: `example`,
    writers: `Anne Wigton, Heinz Herald, Richard Weil`,
    actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
    releaseDate: `30 March 1945`,
    country: `USA`,
    genres: [`Drama`, `Film-Noir`, `Mystery`],
    rating: 3.2,
    year: 1933,
    duration: "54m",
    poster: `"./images/posters/santa-claus-conquers-the-martians.jpg"`,
    description: `Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.Cras aliquet 
      varius magna, non porta ligula feugiat 
      eget.Fusce tristique felis at fermentum 
      pharetra.Aliquam id orci ut lectus varius 
      viverra.Nullam nunc ex, convallis sed 
      finibus eget, sollicitudin eget ante. 
      Phasellus eros mauris, condimentum sed 
      nibh vitae, sodales efficitur ipsum.Sed 
      blandit, eros vel aliquam faucibus, purus 
      ex euismod diam, eu luctus nunc ante ut 
      dui.Sed sed nisi sed augue convallis 
      suscipit in sed felis.Aliquam erat 
      volutpat.Nunc fermentum tortor ac porta 
      dapibus.In rutrum ac purus sit amet 
      tempus.`,
    comment: COMMENTS,
    age: "18+",
    addToWatchlist: false,
    markAsFavorite: false,
    markAsWatched: false,
  },
  {
    filmName: `example`,
    originalFilmName: `example`,
    writers: `Anne Wigton, Heinz Herald, Richard Weil`,
    actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
    releaseDate: `30 March 1945`,
    country: `USA`,
    genres: [`Drama`, `Film-Noir`, `Mystery`],
    rating: 3.2,
    year: 1933,
    duration: "54m",
    poster: `"./images/posters/santa-claus-conquers-the-martians.jpg"`,
    description: `Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.Cras aliquet 
      varius magna, non porta ligula feugiat 
      eget.Fusce tristique felis at fermentum 
      pharetra.Aliquam id orci ut lectus varius 
      viverra.Nullam nunc ex, convallis sed 
      finibus eget, sollicitudin eget ante. 
      Phasellus eros mauris, condimentum sed 
      nibh vitae, sodales efficitur ipsum.Sed 
      blandit, eros vel aliquam faucibus, purus 
      ex euismod diam, eu luctus nunc ante ut 
      dui.Sed sed nisi sed augue convallis 
      suscipit in sed felis.Aliquam erat 
      volutpat.Nunc fermentum tortor ac porta 
      dapibus.In rutrum ac purus sit amet 
      tempus.`,
    comment: COMMENTS,
    age: "18+",
    addToWatchlist: false,
    markAsFavorite: false,
    markAsWatched: false,
  },
  {
    filmName: `example`,
    originalFilmName: `example`,
    writers: `Anne Wigton, Heinz Herald, Richard Weil`,
    actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
    releaseDate: `30 March 1945`,
    country: `USA`,
    genres: [`Drama`, `Film-Noir`, `Mystery`],
    rating: 3.2,
    year: 1933,
    duration: "54m",
    poster: `"./images/posters/santa-claus-conquers-the-martians.jpg"`,
    description: `Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.Cras aliquet 
      varius magna, non porta ligula feugiat 
      eget.Fusce tristique felis at fermentum 
      pharetra.Aliquam id orci ut lectus varius 
      viverra.Nullam nunc ex, convallis sed 
      finibus eget, sollicitudin eget ante. 
      Phasellus eros mauris, condimentum sed 
      nibh vitae, sodales efficitur ipsum.Sed 
      blandit, eros vel aliquam faucibus, purus 
      ex euismod diam, eu luctus nunc ante ut 
      dui.Sed sed nisi sed augue convallis 
      suscipit in sed felis.Aliquam erat 
      volutpat.Nunc fermentum tortor ac porta 
      dapibus.In rutrum ac purus sit amet 
      tempus.`,
    comment: COMMENTS,
    age: "18+",
    addToWatchlist: false,
    markAsFavorite: false,
    markAsWatched: false,
  },
];

export let WATCHLIST_CARDS = [
  FILMS_CARDS[1],
  FILMS_CARDS[2],
  FILMS_CARDS[5],
];

export let HISTORY_CARDS = [
  FILMS_CARDS[0],
  // FILMS_CARDS[1],
  FILMS_CARDS[2],
  // FILMS_CARDS[3],
  FILMS_CARDS[4],
  FILMS_CARDS[5],
  // FILMS_CARDS[6],
  // FILMS_CARDS[7],
  // FILMS_CARDS[8],
  // FILMS_CARDS[9],
  // FILMS_CARDS[10],
  // FILMS_CARDS[11],
];

export let FAVORITES_CARDS = [
  FILMS_CARDS[0],
  FILMS_CARDS[1],
  FILMS_CARDS[4],
  // FILMS_CARDS[15],
  // FILMS_CARDS[16],
  // FILMS_CARDS[17],
  // FILMS_CARDS[18],
];

export let MOST_COMMENTED_CARDS = [
  FILMS_CARDS[12],
  FILMS_CARDS[13],
  FILMS_CARDS[18],
  FILMS_CARDS[19],
];

export let TOP_RATED_CARDS = [
  FILMS_CARDS[18],
  FILMS_CARDS[19],
  FILMS_CARDS[11],
  FILMS_CARDS[7],
];