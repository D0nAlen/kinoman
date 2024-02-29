export default class CommentsModel {

    constructor(film) {
        this._film = film;
        this._comments = [];
        this._dataChangeHandlers = [];
    }

    getComments() {
        return this._film.comment;
        // return getFilmsByFilter(this._films, this._activeFilterType);
    }

    addComment(comment) {
        this._comments = [].concat(comment, this._comments);
        this._callHandlers(this._dataChangeHandlers);
    }

    deleteComment(comment) {
        // this._comments = [].concat(comment, this._comments);
        // this._callHandlers(this._dataChangeHandlers);
    }

    setDataChangeHandler(handler) {
        this._dataChangeHandlers.push(handler);
    }

    _callHandlers(handlers) {
        handlers.forEach((handler) => handler());
    }



}