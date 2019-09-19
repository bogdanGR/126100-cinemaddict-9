import {Card} from "./film-card";
import {Popup} from "./popup";
import {isDeactivateEvent, renderComponent, unRenderComponent, isActivationEvent, createElement} from "../utils";
import {Comment} from "./comment";
import {UserRating} from "./user-rating";

export class MovieController {
  constructor(container, data, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
    this._card = new Card(this._data);
    this._moviePopup = new Popup(this._data);
    this._userRating = new UserRating(this._data);
    this._onClickControlsCard();
  }

  init() {
    const cardElement = this._card.getElement();
    const cardPoster = cardElement.querySelector(`.film-card__poster`);
    const cardTitle = cardElement.querySelector(`.film-card__title`);
    const cardComments = cardElement.querySelector(`.film-card__comments`);

    cardPoster.addEventListener(`click`, this._renderPopup.bind(this, MovieController));
    cardTitle.addEventListener(`click`, this._renderPopup.bind(this, MovieController));
    cardComments.addEventListener(`click`, this._renderPopup.bind(this, MovieController));
    renderComponent(this._container, cardElement, `beforeend`);
  }

  _renderPopup() {
    this._onChangeView();

    const popupElement = this._moviePopup.getElement();
    const footerElement = document.querySelector(`footer`);
    renderComponent(footerElement, popupElement, `afterend`);

    if (this._getStateOfControl().controls.isWatched) {
      this._renderUserRating();
    }

    const commentsContainer = popupElement.querySelector(`.film-details__comments-list`);
    this._data.comment.forEach((comment) => {
      renderComponent(commentsContainer, new Comment(comment).getElement(), `beforeend`);
    });

    popupElement.querySelectorAll(`.film-details__emoji-label`).forEach((elem) => {
      elem.addEventListener(`click`, () => {
        const img = elem.querySelector(`img`);
        popupElement.querySelector(`.film-details__add-emoji-label`).innerHTML = ``;
        popupElement.querySelector(`.film-details__add-emoji-label`)
          .appendChild(createElement(`<img src="${img.src}" width="55" height="55" alt="emoji">`));
      });
    });

    const onEscKeyDown = (evt) => {
      if (isDeactivateEvent(evt)) {
        unRenderComponent(popupElement);
        this._moviePopup.removeElement();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    document.addEventListener(`keydown`, onEscKeyDown);

    popupElement.querySelector(`.film-details__controls`)
      .addEventListener(`click`, (evt) => this._onClickControlsInPopup(evt));

    popupElement.querySelector(`.film-details__comment-input`)
      .addEventListener(`keydown`, (evt) => this._sendComment(evt));

    popupElement.querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        unRenderComponent(popupElement);
        this._moviePopup.removeElement();
      });

    popupElement.querySelector(`.film-details__comment-input`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    popupElement.querySelector(`.film-details__comment-input`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });
  }

  _renderUserRating() {
    unRenderComponent(this._userRating.getElement());
    this._userRating.removeElement();

    renderComponent(this._moviePopup.getElement().querySelector(`.form-details__top-container`), this._userRating.getElement(), `afterend`);
    this._renderUserRating.getElement().querySelector(`.film-details__user-rating-score`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
    });
  }

  _getStateOfControl() {
    return {
      controls: {
        isInWatchList: this._data.controls.isInWatchList,
        isWatched: this._data.controls.isWatched,
        isFavorite: this._data.controls.isFavorite
      }
    };
  }

  _onClickControlsCard() {
    const cardElement = this._card.getElement();

    cardElement.querySelector(`.film-card__controls`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const entry = this._getStateOfControl();

      if (evt.target.classList.contains(`film-card__controls-item--add-to-watchlist`)) {
        cardElement.querySelector(`.film-card__controls-item--add-to-watchlist`).classList.toggle(`film-card__controls-item--active`);
        entry.controls.isAddedToWatchlist = !entry.controls.isAddedToWatchlist;
      }

      if (evt.target.classList.contains(`film-card__controls-item--mark-as-watched`)) {
        cardElement.querySelector(`.film-card__controls-item--mark-as-watched`).classList.toggle(`film-card__controls-item--active`);
        entry.controls.isMarkedAsWatched = !entry.controls.isMarkedAsWatched;
      }

      if (evt.target.classList.contains(`film-card__controls-item--favorite`)) {
        cardElement.querySelector(`.film-card__controls-item--favorite`).classList.toggle(`film-card__controls-item--active`);
        entry.controls.isFavorite = !entry.controls.isFavorite;
      }

      this._onDataChange(entry, this._data);
    });
  }

  setDefaultView() {
    if (document.body.contains(this._moviePopup.getElement())) {
      unRenderComponent(this._moviePopup.getElement());
      this._moviePopup.removeElement();
    }
  }

  _onClickControlsInPopup(evt) {
    evt.preventDefault();
    const entry = this._getStateOfControl();

    if (evt.target.classList.contains(`film-details__control-label--watchlist`)) {
      this._moviePopup.getElement().querySelector(`#watchlist`).checked = !this._moviePopup.getElement().querySelector(`#watchlist`).checked;
      entry.controls.isAddedToWatchlist = !entry.controls.isAddedToWatchlist;
    }

    if (evt.target.classList.contains(`film-details__control-label--watched`)) {
      this._moviePopup.getElement().querySelector(`#watched`).checked = !this._moviePopup.getElement().querySelector(`#watched`).checked;
      entry.controls.isMarkedAsWatched = !entry.controls.isMarkedAsWatched;
    }

    if (evt.target.classList.contains(`film-details__control-label--favorite`)) {
      this._moviePopup.getElement().querySelector(`#favorite`).checked = !this._moviePopup.getElement().querySelector(`#favorite`).checked;
      entry.controls.isFavorite = !entry.controls.isFavorite;
    }

    this._onDataChange(entry, this._data);
  }

  _sendComment(evt) {
    if (isActivationEvent(evt)) {
      const popupElement = this._moviePopup.getElement();

      const commentsList = popupElement.querySelector(`.film-details__comments-list`);
      const commentTextarea = popupElement.querySelector(`.film-details__comment-input`);

      let smileImg = `smile.png`;

      if (popupElement.querySelector(`.film-details__add-emoji-label img`)) {
        const smileSrc = popupElement.querySelector(`.film-details__add-emoji-label img`).src || `/smile.png`;
        smileImg = smileSrc.substr(smileSrc.lastIndexOf(`/`) + 1);
      }

      const commentData = {
        author: `Unknown`,
        text: commentTextarea.value,
        date: new Date(Date.now()),
        smile: smileImg,
      };

      renderComponent(commentsList, new Comment(commentData).getElement(), `beforeend`);

      commentTextarea.value = ``;
      const isNewComment = true;
      this._onDataChange(commentData, this._data, isNewComment);
    }
  }
}
