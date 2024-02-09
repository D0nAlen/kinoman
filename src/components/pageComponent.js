import AbstractComponent from "./abstract-component.js";

const createPageTemplate = () => {
    return `<div class="pageBody"></div>`;
};

export default class PageComponent extends AbstractComponent {
    getTemplate() {
        return createPageTemplate();
    }
}