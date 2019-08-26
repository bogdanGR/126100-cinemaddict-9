import {createElement} from "../utils";

export class Menu {
  constructor({title, count}) {
    this._title = title;
    this._count = count;
    this._element = null;
  }
  getElement(filters) {
    if (!this._element) {
      this._element = createElement(this.getTemplate(filters));
    }

    return this._element;
  }
  createMenuTemplate({title, count}) {
    return `<a href="#${title}" class="main-navigation__item">${title} <span class="main-navigation__item-count">${count}</span></a>`;
  }
  getTemplate(filters) {
    return `
          <nav class="main-navigation"> 
           <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
              ${filters.map((filter) => this.createMenuTemplate(filter)).slice(1, 4).join(``)}
                  <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
          </nav>
  `.trim();
  }
}
