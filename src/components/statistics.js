import AbstractSmartComponent from "./abstract-smart-component.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const counterGenres = { "Film-Noir": 0, "Mystery": 0, "Drama": 0, "Musical": 0, "Western": 0, "Comedy": 0, "Cartoon": 0 };

const createStatisticsTemplate = (films) => {
  let watchedFilms = 0;
  films.forEach((film) => {
    film.isMarkAsWatched ? watchedFilms++ : ``;
  });


  let totalDuration = 0;
  films.forEach((film) => {
    totalDuration += film.duration;
  });
  let hours = Math.trunc(totalDuration / 60);
  let minutes = totalDuration % 60;


  const maxGenre = Math.max(...Object.values(counterGenres));
  const topGenre = Object.keys(counterGenres).find(key => counterGenres[key] === maxGenre);

  return `<section class="statistic statistic__chart">
  <p class="statistic__rank">
    Your rank
    <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    <span class="statistic__rank-label">Sci-Fighter</span>
  </p>
  
  <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>
  
    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
    <label for="statistic-all-time" class="statistic__filters-label">All time</label>
  
    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
    <label for="statistic-today" class="statistic__filters-label">Today</label>
  
    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
    <label for="statistic-week" class="statistic__filters-label">Week</label>
  
    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
    <label for="statistic-month" class="statistic__filters-label">Month</label>
  
    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
    <label for="statistic-year" class="statistic__filters-label">Year</label>
  </form>
  
  <ul class="statistic__text-list">
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">You watched</h4>
      <p class="statistic__item-text">${watchedFilms} <span class="statistic__item-description">movies</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
      <p class="statistic__item-text">${hours} <span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span></p>

      </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Top genre</h4>
      <p class="statistic__item-text">${topGenre}</p>
    </li>
  </ul>
  
  <div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000"></canvas>
  </div>
  
  </section>`;
};


export default class StatisticsComponent extends AbstractSmartComponent {

  constructor({ films }) {
    super();

    this._films = films;
    this.dataArray = this._getDataCharts();
    console.log(counterGenres);
    this._renderCharts();
  }

  getTemplate() {
    // return createStatisticsTemplate({ films: this._films.getFilms() });
    return createStatisticsTemplate(this._films.getFilms());
  }

  show() {
    super.show();

    this.rerender(this._films);
  }

  rerender(films) {
    this._films = films;

    super.rerender();

    this._renderCharts();
  }

  recoveryListeners() {
    // this.setSubmitHandler(this._submitHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    // super.rerender();
    //   // const genres = generateGenres(this._film.genres);
    //   // const comments = generateComments(COMMENTS);

    //   // // render(this._popup, this._popupComponent, RenderPosition.BEFOREEND);
    //   // render(this._popup, this._popupComponent, RenderPosition.BEFOREEND);

    //   // // 1)список комментов и жанров стирается при перерисовке!!!
    //   // //genres rendering
    //   // const filmDetailsGenres = this._popup.querySelector(".film-details-genres");
    //   // for (let i = 0; i < genres.length; i++) {
    //   //     render(filmDetailsGenres, new GenreTemplateComponent(genres[i]), RenderPosition.BEFOREEND);
    //   // }

    //   // // comments rendering
    //   // const commentsList = this._popup.querySelector(".film-details__comments-list");
    //   // for (let i = 0; i < comments.length; i++) {
    //   //     render(commentsList, new CommentComponent(comments[i]), RenderPosition.BEFOREEND);
    //   // }
    //   // this._applyFlatpickr();
  }

  // reset() {
  // const film = this._film;
  // this.rerender();
  // }

  // setSubmitHandler(handler) {
  //   this.getElement().querySelector(`form`)
  //     .addEventListener(`submit`, handler);

  //   this._submitHandler = handler;
  // }

  _subscribeOnEvents() {
    const element = this.getElement();

    // element.querySelector(`.film-details__control-label--watchlist`)
    //   .addEventListener(`click`, () => {
    //     // this._isAddToWatchlist = !this._isAddToWatchlist;
    //     this.rerender();
    //   });

    // element.querySelector(`.film-details__control-label--watched`)
    //   .addEventListener(`click`, () => {
    //     this._isMarkAsWatched = !this._isMarkAsWatched;
    //     this.rerender();
    //   });

    // element.querySelector(`.film-details__control-label--favorite`)
    //   .addEventListener(`click`, () => {
    //     this._isMarkAsFavorite = !this._isMarkAsFavorite;
    //     this.rerender();
    //   });


    // element.querySelector(`.film-details__close`)
    //   .addEventListener('click', () => {
    //     remove(this);
    //     this.rerender();
    //   });
  }


  // 1)исправить обновление страницы после нажатия statistics(навесить обработчики на другие кнопки снова при перерисовке!!!)
  // 2)комментарии, сделать отдельный класс, отрендерить в попап фильма 
  // 3)(случайными комментариями, сделать в mock генерацию комментариев)
  // 4)сделать комментарии удаляемыми
  _renderCharts() {
    const BAR_HEIGHT = 50;
    const element = this.getElement();

    // const daraArray = this._getDataCharts();
    const statisticCtx = element.querySelector(`.statistic__chart`);
// console.log(this.dataArray);
    statisticCtx.height = BAR_HEIGHT * 5;
    const myChart = new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: [`Film-Noir`, `Mystery`, `Drama`, `Musical`, `Western`, `Comedy`, `Cartoon`],
        datasets: [{
          data: this.dataArray,
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: 'start',
            align: 'start',
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 24
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });
  }

  _getDataCharts() {
    const films = this._films.getFilms();

    Object.entries(counterGenres).forEach(([key, value]) => films.forEach((film) => film.genres.includes(key) ? counterGenres[key]++ : ``));

    // console.log(counterGenres);
    return Object.values(counterGenres);
  }
}