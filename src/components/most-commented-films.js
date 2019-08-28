import {AbstractComponent} from "./absctract-component";

export class MostCommented extends AbstractComponent {
  constructor() {
    super();
  }
  getTemplate() {
    return `
          <section class="films-list--extra  films-list--right">
            <h2 class="films-list__title">Most commented</h2>
            <div class="films-list__container"></div>
          </section>
 `.trim();
  }
}
