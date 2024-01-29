import { FilterType } from "../const.js";

// как правильно оформить этот фильтр?
export const getAllFilms = (films) => {
    return films;
};

// 1)// добавить фильтры для экстра разделов
export const getWatchlistFilms = (films) => {
    return films.filter((film) => !film.isAddToWatchlist);
};

export const getHistoryFilms = (films) => {
    return films.filter((film) => film.isMarkAsWatched);
};

export const getFavoriteFilms = (films) => {
    return films.filter((film) => film.isMarkAsFavorite);
};

export const getFilmsByFilter = (films, filterType) => {
    switch (filterType) {
        case FilterType.ALL:
            return getAllFilms(films);
        case FilterType.WATCHLIST:
            return getWatchlistFilms(films);
        case FilterType.HISTORY:
            return getHistoryFilms(films);
        case FilterType.FAVORITES:
            return getFavoriteFilms(films);
    }

    return films;
};