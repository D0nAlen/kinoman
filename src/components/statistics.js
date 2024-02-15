import AbstractSmartComponent from "./abstract-smart-component.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const createStatisticsTemplate = (films) => {

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
      <p class="statistic__item-text">22 <span class="statistic__item-description">movies</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
      <p class="statistic__item-text">130 <span class="statistic__item-description">h</span> 22 <span class="statistic__item-description">m</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Top genre</h4>
      <p class="statistic__item-text">Sci-Fi</p>
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

    this._renderCharts();

  }

  getTemplate() {
    return createStatisticsTemplate({ films: this._films.getFilms() });
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

  recoveryListeners() { }

  // 2)комментарии, сделать отдельный класс, отрендерить в попап фильма 
  // 3)(случайными комментариями, сделать в mock генерацию комментариев)
  // 4)сделать комментарии удаляемыми
  _renderCharts() {
    const BAR_HEIGHT = 50;
    const element = this.getElement();

    const daraArray = this._getDataCharts();
    const statisticCtx = element.querySelector(`.statistic__chart`);

    statisticCtx.height = BAR_HEIGHT * 5;
    const myChart = new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: [`Film-Noir`, `Mystery`, `Drama`, `Musical`, `Western`, `Comedy`, `Cartoon`],
        datasets: [{
          data: daraArray, 
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
    const counterGenres = { "Film-Noir": 0, "Mystery": 0, "Drama": 0, "Musical": 0, "Western": 0, "Comedy": 0, "Cartoon": 0 };
    const films = this._films.getFilms();

    Object.entries(counterGenres).forEach(([key, value]) => films.forEach((film) => film.genres.includes(key) ? counterGenres[key]++ : ``));

    // console.log(counterGenres);
    return Object.values(counterGenres);
  }
}