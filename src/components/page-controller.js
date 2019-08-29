import {getCards, getFilmCard} from "./data";
import {Card} from "./film-card";
import {Popup} from "./popup";
import {isDeactivateEvent, renderComponent} from "../utils";
import {NoFilms} from "./no-films";
import {Button} from "./btn-show-more";
import {TopRatedFilms} from "./top-rated-films";
import {MostCommented} from "./most-commented-films";

export class PageController {
  constructor(container, cardData) {
    this._container = container;
    this._cardData = cardData;
  }
  init() {
    const CARD_NUM = 30;
    const MAX_RENDER_CARDS = 5;
    const CARDS = getCards(CARD_NUM);
    const mainSite = document.querySelector(`.main`);
    const filmsNode = document.querySelector(`.films`);
    const filmContainer = document.querySelector(`.films-list__container`);
    const filmList = document.querySelector(`.films-list`);
    const cardsMocks = new Array(MAX_RENDER_CARDS).fill(``).map(getFilmCard);
    const cardToTopRated = new Array(2).fill(``).map(getFilmCard);
    const cardToMostComm = new Array(2).fill(``).map(getFilmCard);

    const btnShowMore = new Button();
    const topRatedFilms = new TopRatedFilms();
    const mostCommentedFilms = new MostCommented();

    const renderCards = (container, cardsTpl) => {
      const card = new Card(cardsTpl);
      const cardDetails = new Popup(cardsTpl);
      const closeByEscHandler = (evt) => {
        if (isDeactivateEvent(evt)) {
          container.replaceChild(card.getElement(), cardDetails.getElement());
          document.removeEventListener(`keydown`, closeByEscHandler);
        }
      };
      const openNodeHandler = () => {
        container.replaceChild(cardDetails.getElement(), card.getElement());
        document.addEventListener(`keydown`, closeByEscHandler);
      };
      const closeNodeHandler = () => {
        container.replaceChild(card.getElement(), cardDetails.getElement());
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
      if (CARD_NUM) {
        renderComponent(container, card.getElement(), `beforeend`);
      }
    };

    if (CARD_NUM) {
      cardsMocks.forEach((cardTpl) => renderCards(filmContainer, cardTpl));

      renderComponent(filmList, btnShowMore.getElement(), `beforeend`);
      renderComponent(filmsNode, topRatedFilms.getElement(), `beforeend`);
      renderComponent(filmsNode, mostCommentedFilms.getElement(), `beforeend`);
    } else {
      const noFilms = new NoFilms();
      renderComponent(filmContainer, noFilms.getElement(), `beforeend`);
    }
    const filmLeftContainer = document.querySelector(`.films-list--left .films-list__container`);
    const filmRightContainer = document.querySelector(`.films-list--right .films-list__container`);

    cardToTopRated.forEach((card) => renderCards(filmLeftContainer, card));
    cardToMostComm.forEach((card) => renderCards(filmRightContainer, card));


    let cardsOnPage = MAX_RENDER_CARDS;
    let leftCardToRender = CARDS.length - cardsOnPage;
    const loadMoreButton = mainSite.querySelector(`.films-list__show-more`);

    const renderLeftCards = () => {
      const cardsMocksMore = new Array(MAX_RENDER_CARDS).fill(``).map(getFilmCard);
      cardsMocksMore.forEach((cardTpl) => renderCards(filmContainer, cardTpl));
      cardsOnPage += MAX_RENDER_CARDS;
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

  }
}
