export default class FilmComponent {
    constructor(film) {
        this._film = film;
    }

    getFilmName(){
        return  this._film.filmName;
    }

    getRating(){
        return  this._film.rating;
    }

    getYear(){
        return  this._film.year;
    }

    getDuration(){
        return  this._film.duration;
    }

    getGenre(){
        return  this._film.genre;
    }

    getPoster(){
        return  this._film.poster;
    }

    getDescription(){
        return  this._film.description;
    }

    getComment(){
        return  this._film.comment;
    }
};
