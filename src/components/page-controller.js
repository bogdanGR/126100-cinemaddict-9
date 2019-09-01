import {getCards, getFilmCard} from "./data";
import {Card} from "./film-card";
import {Popup} from "./popup";
import {isDeactivateEvent, renderComponent} from "../utils";
import {NoFilms} from "./no-films";
import {Button} from "./btn-show-more";
import {TopRatedFilms} from "./top-rated-films";
import {MostCommented} from "./most-commented-films";
import {SortTemplate} from "./sort-filter";
import {Films} from "./films";
import {FilmsList} from "./filmsList";

export class PageController {
  constructor(container, cardData) {
    this._container = container;
    this._cardData = cardData;
    this._films = new Films();
    this._filmsList = new FilmsList();
    this._numberOfCards = 30;
    this._sort = new SortTemplate();
  }
  init() {
    const NUM_OF_RENDERING_TO_CATEGORIES = 2;
    const MAX_RENDER_CARDS = 5;
    const getCardsToCategories = getCards(NUM_OF_RENDERING_TO_CATEGORIES);
    const btnShowMore = new Button();
    const topRatedFilms = new TopRatedFilms();
    const mostCommentedFilms = new MostCommented();
    if (this._numberOfCards) {
      const numCardsToRender = this._cardData.slice(0, MAX_RENDER_CARDS);
      renderComponent(this._container, this._films.getElement(), `beforeend`);
      const filmContainer = document.querySelector(`.films-list`);
      renderComponent(filmContainer, this._filmsList.getElement(), `beforeend`);
      renderComponent(filmContainer, btnShowMore.getElement(), `beforeend`);
      renderComponent(this._films.getElement(), topRatedFilms.getElement(), `beforeend`);
      renderComponent(this._films.getElement(), mostCommentedFilms.getElement(), `beforeend`);
      numCardsToRender.forEach((cardTpl) => this._renderCard(this._filmsList.getElement(), cardTpl));
      const mainSite = document.querySelector(`.main`);
      let cardsOnPage = MAX_RENDER_CARDS;
      let leftCardToRender = numCardsToRender.length - cardsOnPage;
      const loadMoreButton = mainSite.querySelector(`.films-list__show-more`);

      const onLoadMoreButtonClick = () => {
        const cardsMocksMore = new Array(MAX_RENDER_CARDS).fill(``).map(getFilmCard);
        cardsMocksMore.forEach((cardTpl) => this._renderCard(this._filmsList.getElement(), cardTpl));
        cardsOnPage += MAX_RENDER_CARDS;
        leftCardToRender = this._numberOfCards - cardsOnPage;

        if (leftCardToRender <= 0) {
          loadMoreButton.classList.add(`visually-hidden`);
          loadMoreButton.removeEventListener(`click`, onLoadMoreButtonClick);
        }
      };
      loadMoreButton.addEventListener(`click`, onLoadMoreButtonClick);
      getCardsToCategories.forEach((card) => this._renderCard(topRatedFilms.getElement().querySelector(`.films-list--left .films-list__container`), card));
      getCardsToCategories.forEach((card) => this._renderCard(mostCommentedFilms.getElement().querySelector(`.films-list--right .films-list__container`), card));
      this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
    } else {
      const noFilms = new NoFilms();
      renderComponent(this._container, noFilms.getElement(), `beforeend`);
    }

  }
  _renderCard(localContainer, cardsTpl) {
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
  _onSortLinkClick(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== `A`) {
      return;
    }
    this._filmsList.getElement().innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case `date`:
        const sortedByDateCards = this._cardData.slice().sort((a, b) => a.year - b.year);
        sortedByDateCards.forEach((card) => this._renderCard(this._filmsList.getElement(), card));
        break;
      case `rating`:
        const sortedByRating = this._cardData.slice().sort((a, b) => a.rating - b.rating);
        sortedByRating.forEach((card) => this._renderCard(this._filmsList.getElement(), card));
        break;
      case `default`:
        this._cardData.forEach((cardTpl) => this._renderCard(this._filmsList.getElement(), cardTpl));
        break;
    }
  }
}
