import { cardFilmTemplate } from "../components/cardFilm.js";

const render = (container, template, place = "beforeend") => {
    container.insertAdjacentHTML(place, template);
  };

export const showMoreButtonElement = (showMoreButton, showingFilmsCount, cardFilmsCount,showingFilmsCountByButton, films, filmsListContainer) => {
    showMoreButton.addEventListener(`click`, () => {
      const prevFilmsCount = showingFilmsCount;
      let remainingCards = cardFilmsCount - showingFilmsCount;
      if (remainingCards < showingFilmsCountByButton)
        showingFilmsCountByButton = remainingCards;
      showingFilmsCount = showingFilmsCount + showingFilmsCountByButton;
      films
        .slice(prevFilmsCount, showingFilmsCount)
        .forEach((film) =>
          render(filmsListContainer, cardFilmTemplate(film), `beforeend`)
        );
  
      if (showingFilmsCount >= cardFilmsCount) {
        showMoreButton.remove();
      }
    });
  };