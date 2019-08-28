import {AbstractComponent} from "./absctract-component";

export class Button extends AbstractComponent {
  constructor() {
    super();
  }
  getTemplate() {
    return `<button class="films-list__show-more">Show more</button>`.trim();
  }
}

