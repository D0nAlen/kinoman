import AbstractComponent from "./abstract-component.js";


const createFilterMarkup = (filter, isChecked) => {
  const { name, count } = filter;

  return `<a href="#${name}" class="main-navigation__item ${isChecked ? ` main-navigation__item--active` : ``}" 
  id="${name}">${name === "All" ? `All movies` : name} ${name !== "All" ? `<span class="main-navigation__item-count">${count}` : ``}</span></a>`;
};

const createFilterTemplate = (filters) => {
  const filterMarkup = filters.map((it) => createFilterMarkup(it, it.checked)).join(`\n`);
//   return `<nav class="main-navigation">
//   <div class="main-navigation__items">
//     ${filterMarkup}
//   </div>
//   <a href="#stats" class="main-navigation__additional">Stats</a>
// </nav>`;
  return `<div class="main-navigation__items">
      ${filterMarkup}
    </div>`;
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
    this.getElement().addEventListener(`click`, (evt) => {
      const filterName = evt.target.id;
      handler(filterName);
    });
  }
};
