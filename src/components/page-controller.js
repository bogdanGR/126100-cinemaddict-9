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
    this._CARD_NUM = 0;
    this._MAX_RENDER_CARDS = 5;
    this._sort = new SortTemplate();
    this._filmContainer = document.querySelector(`.films-list`);
  }
  init() {
    const cardsMocks = new Array(this._MAX_RENDER_CARDS).fill(``).map(getFilmCard);
    const cardToTopRated = new Array(2).fill(``).map(getFilmCard);
    const cardToMostComm = new Array(2).fill(``).map(getFilmCard);

    const btnShowMore = new Button();
    const topRatedFilms = new TopRatedFilms();
    const mostCommentedFilms = new MostCommented();
    if (this._CARD_NUM) {
      renderComponent(this._container, this._films.getElement(), `beforeend`);
      renderComponent(this._films.getElement(), this._filmsList.getElement(), `beforeend`);
      renderComponent(this._filmContainer, btnShowMore.getElement(), `beforeend`);
      renderComponent(this._films.getElement(), topRatedFilms.getElement(), `beforeend`);
      renderComponent(this._films.getElement(), mostCommentedFilms.getElement(), `beforeend`);


      const filmLeftContainer = document.querySelector(`.films-list--left .films-list__container`);
      const filmRightContainer = document.querySelector(`.films-list--right .films-list__container`);
      cardsMocks.forEach((cardTpl) => this._renderCards(this._filmsList.getElement(), cardTpl));
      const CARDS = getCards(this._CARD_NUM);
      const mainSite = document.querySelector(`.main`);
      let cardsOnPage = this._MAX_RENDER_CARDS;
      let leftCardToRender = CARDS.length - cardsOnPage;
      const loadMoreButton = mainSite.querySelector(`.films-list__show-more`);

      const renderLeftCards = () => {
        const cardsMocksMore = new Array(this._MAX_RENDER_CARDS).fill(``).map(getFilmCard);
        cardsMocksMore.forEach((cardTpl) => this._renderCards(this._filmsList.getElement(), cardTpl));
        cardsOnPage += this._MAX_RENDER_CARDS;
        leftCardToRender = CARDS.length - cardsOnPage;

        if (leftCardToRender <= 0) {
          loadMoreButton.classList.add(`visually-hidden`);
          loadMoreButton.removeEventListener(`click`, onLoadMoreButtonClick);
        }
      };
      const onLoadMoreButtonClick = () => {
        renderLeftCards();
      };
      loadMoreButton.addEventListener(`click`, onLoadMoreButtonClick);
      cardToTopRated.forEach((card) => this._renderCards(filmLeftContainer, card));
      cardToMostComm.forEach((card) => this._renderCards(filmRightContainer, card));

    } else {
      const noFilms = new NoFilms();
      renderComponent(this._filmContainer, noFilms.getElement(), `beforeend`);
    }
   // this._sort.getElement().querySelector(`.sort`).addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }
  _renderCards(localContainer, cardsTpl) {
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
    if (this._CARD_NUM) {
      renderComponent(localContainer, card.getElement(), `beforeend`);
    }
  }
  // _onSortLinkClick(evt) {
  //   console.log(`active`)
  //   evt.preventDefault();
  //   console.log(`NOT active`)
  //   if (evt.target.tagName !== `A`) {
  //     return;
  //   }
  //
  //   this._taskList.getElement().innerHTML = ``;
  //
  //   switch (evt.target.dataset.sortType) {
  //     case `date`:
  //       const sortedByDateCards = this._cardData.slice().sort((a, b) => a.year - b.year);
  //       sortedByDateCards.forEach((card) => this._renderCards(this._filmContainer, card));
  //       break;
  //     case `rating`:
  //       const sortedByRating = this._cardData.slice().sort((a, b) => a.rating - b.rating);
  //       sortedByRating.forEach((card) => this._renderCards(this._filmContainer, card));
  //       break;
  //     case `default`:
  //       this._cardData.forEach((cardTpl) => this._renderCards(this._filmContainer, cardTpl));
  //       break;
  //   }
  // }
}
