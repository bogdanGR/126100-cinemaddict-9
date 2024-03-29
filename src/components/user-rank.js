import {createElement} from "../utils";
import {AbstractComponent} from "./absctract-component";

export class UserRank extends AbstractComponent {
  constructor({count}) {
    super();
    this._count = count;
  }
  getElement(filters) {
    if (!this._element) {
      this._element = createElement(this.getTemplate(filters));
    }

    return this._element;
  }
  createUserProfileTemplate({count}) {
    return `<p class="profile__rating">${count}</p>`.trim();
  }
  getTemplate(filters) {
    return `<section class="header__profile profile">
              ${filters.map((filter) => this.createUserProfileTemplate(filter)).slice(2, 3).join(``)}
              <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
            </section>`;
  }
}
