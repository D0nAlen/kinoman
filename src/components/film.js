export default class FilmComponent {
    constructor(film) {
        this._film = film;
    }

    getFilmName(){
        return  this._film.filmName;
    }

    getOriginalFilmName(){
        return  this._film.originalFilmName;
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

    getGenres(){
        return  this._film.genres;
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

    getAge(){
        return  this._film.age;
    }

    getDirector(){
        return  this._film.director;
    }

    getWriters(){
        return  this._film.writers;
    }
    getActors(){
        return  this._film.actors;
    }

    getReleaseDate(){
        return this._film.releaseDate;
    }

    getCountry(){
        return this._film.country;
    }
};
