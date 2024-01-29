import AbstractComponent from "./abstract-component.js";

const FILTER_ID_PREFIX = `filter__`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
}

// 1)вместо метки isChecked должен добавляться класс "main-navigation__item--active"(или убираться) по клику на кнопку
const createFilterMarkup = (filter, isChecked) => {
  const { name, count } = filter;

  return `<a 
  href="#${name}" class="main-navigation__item ${isChecked ? ` main-navigation__item--active` : ``}" 
        id="${name}">${name === "All" ? `All movies` : name} ${name !== "All" ? `<span class="main-navigation__item-count">${count}` : ``}</span>
  </a>`;
};

const createFilterTemplate = (filters) => {
  const filterMarkup = filters.map((it) => createFilterMarkup(it, it.checked)).join(`\n`);
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${filterMarkup}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class FilterComponent extends AbstractComponent {
  constructor(filterButtons) {
    super();
    this._filterButtons = filterButtons;
  }

  getTemplate() {
    return createFilterTemplate(this._filterButtons);
  }

  setFilterComponentClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }
};
