import AbstractComponent from "./abstract-component.js";

export default class AbstractSmartComponent extends AbstractComponent {
    recoveryListeners() {
        throw new Error(`Abstract method not implemented: recoveryListeners`);
    }

    // 1)в parent нет списка комментариев, только первоначальная разметка!
    rerender() {
        const oldElement = this.getElement();
        const parent = oldElement.parentElement;

        this.removeElement();

        const newElement = this.getElement();
        console.log(newElement);

        parent.replaceChild(newElement, oldElement);
        this.recoveryListeners();
    }
}