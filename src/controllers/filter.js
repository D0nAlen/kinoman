import { FilterType } from "../const.js";
import FilterComponent from "../components/filter.js";
import { render, replace, RenderPosition } from "../utils/render.js";
import { getFilmsByFilter } from "../utils/filter.js";

export default class FilterController {
    constructor(container, moviesModel) {
        this._container = container;
        this._moviesModel = moviesModel;

        this._activeFilterType = FilterType.ALL;

        this._filterComponent = null;
        this._onDataChange = this._onDataChange.bind(this);
        this._onFilterChange = this._onFilterChange.bind(this);

        this._moviesModel.setDataChangeHandler(this._onDataChange);

    }
    // 1)нужно вызвать повторную перерисовку при изменении числа карточек по фильтру!!!
    render() {
        const container = this._container;
        const allFilms = this._moviesModel.getFilmsAll();
        const filters = Object.values(FilterType).map((filterType) => {
            return {
                name: filterType,
                count: getFilmsByFilter(allFilms, filterType).length,
                checked: filterType === this._activeFilterType,
            };
        });
        
        const oldComponent = this._filterComponent;

        this._filterComponent = new FilterComponent(filters);
        this._filterComponent.setFilterComponentClickHandler(this._onFilterChange);

        if (oldComponent) {
            replace(this._filterComponent, oldComponent);
        } else {
            render(container, this._filterComponent, RenderPosition.BEFOREEND);
        }
    }

    _onFilterChange(filterType) {
        this._moviesModel.setFilter(filterType);
        this._activeFilterType = filterType;
        this.render();
    }

    _onDataChange() {
        this.render();
    }
}