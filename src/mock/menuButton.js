export const menuButtonElement = (buttonElement, cardFilmsCount, setCardFilmsCount) => {
  buttonElement.addEventListener(`click`, () => {
    cardFilmsCount = setCardFilmsCount;
    showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    showingFilmsCountByButton = SHOWING_FILMS_COUNT_BY_BUTTON;
    if (cardFilmsCount <= showingFilmsCount) {
      showingFilmsCount = cardFilmsCount;
      showMoreButton.remove();
    }
  
    filmsListContainer.innerHTML = "";
  
    for (let i = 0; i < showingFilmsCount; i++) {
      render(filmsListContainer, cardFilmTemplate(films[i]));
    }
    const controlsCardFilm = filmsListContainer.querySelectorAll(".film-card");
    controlsCardFilm.forEach((film) => render(film, controlsTemplate()));
    showMoreButtonRendering();
  });
};