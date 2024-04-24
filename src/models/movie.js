export default class MovieModel {
    constructor(data) {
        this.id = data.id;
        this.filmName = data.filmName;
        this.originalFilmName = data.originalFilmName;
        this.director = data.director;
        this.writers = data.writers;
        this.actors = data.actors;
        this.releaseDate = data.releaseDate;
        this.country = data.country;
        this.genres = data.genres;
        this.rating = data.rating;
        this.year = data.year;
        this.duration = data.duration;
        this.poster = data.poster;
        this.description = data.description;
        this.comment = data.comment;
        this.age = data.age;
        this.isAddToWatchlist = data.isAddToWatchlist;
        this.isMarkAsFavorite = data.isMarkAsFavorite;
        this.isMarkAsWatched = data.isMarkAsWatched;
        this.isCardTopRated = data.isCardTopRated;
        this.isCardMostCommented = data.isCardMostCommented;
    }

    toRAW() {
        return {
            // "id": this.id,
            // "description": this.description,
            // "due_date": this.dueDate ? this.dueDate.toISOString() : null,
            // "repeating_days": this.repeatingDays,
            // "color": this.color,
            // "is_favorite": this.isFavorite,
            // "is_archived": this.isArchive,

            "id": this.id,
            "filmName": this.filmName,
            "originalFilmName": this.originalFilmName,
            "director": this.director,
            "writers": this.writers,
            "actors": this.actors,
            "releaseDate": this.releaseDate,
            "country": this.country,
            "genres": this.genres,
            "rating": this.rating,
            "year": this.year,
            "duration": this.duration,
            "poster": this.poster,
            "description": this.description,
            "comment": this.comment,
            "age": this.age,
            "isAddToWatchlist": this.isAddToWatchlist,
            "isMarkAsFavorite": this.isMarkAsFavorite,
            "isMarkAsWatched": this.isMarkAsWatched,
            "isCardTopRated": this.isCardTopRated,
            "isCardMostCommented": this.isCardMostCommented,
        };
    }

    static parseFilm(data) {
        return new MovieModel(data);
    }

    static parseFilms(data) {
        return data.map(MovieModel.parseFilm);
    }

    static clone(data) {
        return new MovieModel(data.toRAW());
    }
}