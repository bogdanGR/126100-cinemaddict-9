import {Card} from "./film-card";
import {Popup} from "./popup";
import {isDeactivateEvent, renderComponent, unRenderComponent} from "../utils";

export class MovieController {
  constructor(container, data, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
    this._moviePopup = new Popup();
  }
  init() {
    const card = new Card(cardsTpl);
    const cardDetails = new Popup(cardsTpl);

    const closeByEscHandler = (evt) => {
      if (isDeactivateEvent(evt)) {
        localContainer.replaceChild(card.getElement(), cardDetails.getElement());
        document.removeEventListener(`keydown`, closeByEscHandler);
      }
    };
    const openNodeHandler = () => {
      localContainer.replaceChild(cardDetails.getElement(), card.getElement());
      document.addEventListener(`keydown`, closeByEscHandler);
    };
    const closeNodeHandler = () => {
      localContainer.replaceChild(card.getElement(), cardDetails.getElement());
    };
    card.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, openNodeHandler);
    card.getElement().querySelector(`.film-card__title`).addEventListener(`click`, openNodeHandler);
    card.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, openNodeHandler);
    cardDetails.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, closeByEscHandler);
      });
    cardDetails.getElement().querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, closeByEscHandler);
      });
    cardDetails.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, closeNodeHandler);
    if (this._numberOfCards) {
      renderComponent(localContainer, card.getElement(), `beforeend`);
    }
  }
  setDefaultView() {
    if (document.body.contains(this._moviePopup.getElement())) {
      unRenderComponent(this._moviePopup.getElement());
      this._moviePopup.removeElement();
    }
  }
}
