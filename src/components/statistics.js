import AbstractComponent from "./abstract-component.js";
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

// const BAR_HEIGHT = 50;
// const statisticCtx = document.querySelector(`.statistic__chart`);
// // Обязательно рассчитайте высоту canvas, она 
// // зависит от количества элементов диаграммы
// statisticCtx.height = BAR_HEIGHT * 5;
// const myChart = new Chart(statisticCtx, {
//   plugins: [ChartDataLabels],
//   type: `horizontalBar`,
//   data: {
//     labels: [`Sci-Fi`, `Animation`, `Fantasy`,
//       `Comedy`, `TV Series`],
//     datasets: [{
//       data: [11, 8, 7, 4, 3],
//       backgroundColor: `#ffe800`,
//       hoverBackgroundColor: `#ffe800`,
//       anchor: `start`
//     }]
//   },
//   options: {
//     plugins: {
//       datalabels: {
//         font: {
//           size: 20
//         },
//         color: `#ffffff`,
//         anchor: 'start',
//         align: 'start',
//         offset: 40,
//       }
//     },
//     scales: {
//       yAxes: [{
//         ticks: {
//           fontColor: `#ffffff`,
//           padding: 100,
//           fontSize: 20
//         },
//         gridLines: {
//           display: false,
//           drawBorder: false
//         },
//         barThickness: 24
//       }],
//       xAxes: [{
//         ticks: {
//           display: false,
//           beginAtZero: true
//         },
//         gridLines: {
//           display: false,
//           drawBorder: false
//         },
//       }],
//     },
//     legend: {
//       display: false
//     },
//     tooltips: {
//       enabled: false
//     }
//   }
// });

export default class StatisticsComponent extends AbstractComponent {

  constructor({ films }) {
    super();

    this._films = films;

    // this._daysChart = null;
    // this._colorsChart = null;

    // this._renderCharts();
    this._renderStatistics();

  }

  getTemplate() {
    return createStatisticsTemplate({ films: this._films.getFilms() });
  }

  show() {
    super.show();

    // this.rerender(this._films.getFilms());
    this.rerender(this._films);
  }

  rerender(films) {
    this._films = films;

    // super.rerender();

    // this._renderCharts();
  }

  // 1)сначала надо отрендерить статистику, такого класса пока нет на странице
  _renderStatistics() {
    const BAR_HEIGHT = 50;
    const element = this.getElement();
    
    const statisticCtx = element.querySelector(`.statistic__chart`);
    console.log(statisticCtx);
    // Обязательно рассчитайте высоту canvas, она 
    // зависит от количества элементов диаграммы
    statisticCtx.height = BAR_HEIGHT * 5;
    const myChart = new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: [`Sci-Fi`, `Animation`, `Fantasy`,
          `Comedy`, `TV Series`],
        datasets: [{
          data: [11, 8, 7, 4, 3],
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

    // render(container, myChart, RenderPosition.BEFOREEND);
  }

}