const createMenuMarkup = (menu) => {
  const { title, count } = menu;

  return `
  <a href="#watchlist" class="main-navigation__item">${title} <span class="main-navigation__item-count">${count}</span></a>
  <a href="#history" class="main-navigation__item">${title} <span class="main-navigation__item-count">${count}</span></a>
  <a href="#favorites" class="main-navigation__item">${title} <span class="main-navigation__item-count">${count}</span></a>
  `;
};

export const menuTemplate = (menuButtons) => {
  // const menuMarkup = menuButtons
  // .map((it) =>
  // createMenuMarkup(it)).join(`\n`);

  const menuMarkup = createMenuMarkup(menuButtons);

  return `
    <nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${menuMarkup}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>
      `;
};