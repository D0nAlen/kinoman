import AbstractComponent from "./abstract-component";

export const MenuItem = {
    ALL: `All`,
    WATCHLIST: `Watchlist`,
    HISTORY: `History`,
    FAVORITES: `Favorites`,
    STATISTICS: `Statistic`,
};

const createSiteMenuTemplate = () => {
    return (
        `<nav class="main-navigation">
    
        <a href="#stats" class="main-navigation__additional" id="Statistic">Stats</a>
        </nav>`
    );
};

export default class SiteMenuComponent extends AbstractComponent {
    getTemplate() {
        return createSiteMenuTemplate();
    }

    setOnChange(handler) {

        this.getElement().addEventListener(`click`, (evt) => {
            // if (evt.target.tagName !== `INPUT`) {
            //     return;
            // }

            const menuItem = evt.target.id;

            handler(menuItem);
        });
    }
}


