import {AbstractComponent} from "./absctract-component";

export class Films extends AbstractComponent {
  getTemplate() {
    return `<section class="films">
                <section class="films-list">
                 <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
                </section>
            </section>`;
  }
}
