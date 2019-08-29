import {AbstractComponent} from "./absctract-component";
import {createElement} from "../utils";

export class Footer extends AbstractComponent {
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
  createFooter({count}) {
    return `<p>${count} movies inside</p>`;
  }
  getTemplate(filters) {
    return `
        <footer class="footer">
          <section class="footer__logo logo logo--smaller">Cinemaddict</section>
            <section class="footer__statistics">
              ${filters.map((filter) => this.createFooter(filter)).slice(0, 1).join(``)}
            </section>
        </footer>
  `.trim();
  }
}

