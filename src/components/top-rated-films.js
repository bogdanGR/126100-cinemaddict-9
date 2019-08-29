import {AbstractComponent} from "./absctract-component";

export class TopRatedFilms extends AbstractComponent {
  constructor() {
    super();
  }
  getTemplate() {
    return `
          <section class="films-list--extra  films-list--left">
            <h2 class="films-list__title">Top rated</h2>
            <div class="films-list__container"></div>
          </section>
 `.trim();
  }
}
