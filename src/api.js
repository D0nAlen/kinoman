import MovieModel from "./models/movie.js";
import CommentModel from "./models/comment.js";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};


const API = class {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({ url: `movies` })
      .then((response) => response.json())
      .then(MovieModel.parseFilms);
  }

  updateFilm(id, data) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({ "Content-Type": `application/json` })
    })
      .then((response) => response.json())
      .then(MovieModel.parseFilm);
  }

  getComments() {
    return this._load({ url: `comments` })
      .then((response) => response.json())
      .then(CommentModel.parseComments);
  }

  // 1)parseComments переделать, чтобы вычленял массив комментов с объекта
  getCommentsByIdFilm(movieId) {
    return this._load({ url: `comments/:movieId` })
      .then((response) => response.json())
      .then(CommentModel.parseComments);
  }


  _load({ url, method = Method.GET, body = null, headers = new Headers() }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, { method, body, headers })
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
};

export default API;
