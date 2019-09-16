import {getCards} from "./data";
import {renderComponent, unRenderComponent} from "../utils";
import {NoFilms} from "./no-films";
import {Button} from "./btn-show-more";
import {TopRatedFilms} from "./top-rated-films";
import {MostCommented} from "./most-commented-films";
import {SortTemplate} from "./sort-filter";
import {Films} from "./films";
import {FilmsList} from "./filmsList";
import {MovieController} from "./movie-controller";

const NUM_OF_RENDERING_TO_CATEGORIES = 2;
const MAX_RENDER_CARDS = 5;

export class PageController {
  constructor(container, cardData) {
    this._container = container;
    this._cardData = cardData;
    this._films = new Films();
    this._filmsList = new FilmsList();
    this._numberOfCards = 30;
    this._sort = new SortTemplate();
    this._btnShowMore = new Button();
    this._topRatedFilms = new TopRatedFilms();
    this._mostCommentedFilms = new MostCommented();
    this._getCardsToCategories = getCards(NUM_OF_RENDERING_TO_CATEGORIES);
    this._numCardsToRender = this._cardData.slice(0, MAX_RENDER_CARDS);
    this._sortedFilm = [];
    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }
  init() {
    const mainSite = document.querySelector(`.main`);
    if (this._numberOfCards) {
      renderComponent(mainSite, this._sort.getElement(), `beforeend`);
      renderComponent(this._container, this._films.getElement(), `beforeend`);
      const filmContainer = document.querySelector(`.films-list`);
      renderComponent(filmContainer, this._filmsList.getElement(), `beforeend`);
      renderComponent(filmContainer, this._btnShowMore.getElement(), `beforeend`);
      this._renderFilms(this._filmsList.getElement(), this._numCardsToRender);
      let cardsOnPage = MAX_RENDER_CARDS;
      let leftCardToRender = this._numCardsToRender.length - cardsOnPage;
      const loadMoreButton = document.querySelector(`.films-list__show-more`);

      const onLoadMoreButtonClick = () => {
        this._renderFilms(this._filmsList.getElement(), this._numCardsToRender);
        cardsOnPage += MAX_RENDER_CARDS;
        leftCardToRender = this._numberOfCards - cardsOnPage;
        if (leftCardToRender <= 0) {
          loadMoreButton.classList.add(`visually-hidden`);
          loadMoreButton.removeEventListener(`click`, onLoadMoreButtonClick);
        }
      };
      loadMoreButton.addEventListener(`click`, onLoadMoreButtonClick);
      this._renderFilms(this._topRatedFilms.getElement().querySelector(`.films-list--left .films-list__container`), this._getCardsToCategories);
      this._renderFilms(this._mostCommentedFilms.getElement().querySelector(`.films-list--right .films-list__container`), this._getCardsToCategories);
    } else {
      const noFilms = new NoFilms();
      renderComponent(this._container, noFilms.getElement(), `beforeend`);
    }
    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }
  _renderBoard() {
    const filmContainer = document.querySelector(`.films-list`);
    unRenderComponent(this._filmsList.getElement());
    this._filmsList.removeElement();
    renderComponent(filmContainer, this._filmsList.getElement(), `beforeend`);
    renderComponent(this._films.getElement(), this._topRatedFilms.getElement(), `beforeend`);
    renderComponent(this._films.getElement(), this._mostCommentedFilms.getElement(), `beforeend`);
  }
  _getCountCurrentCards() {
    return this._container.querySelector(`.films-list__container`).querySelectorAll(`.film-card`).length;
  }
  _onSortLinkClick(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== `A`) {
      return;
    }
    const countCurrentCards = this._getCountCurrentCards();
    this._filmsList.getElement().innerHTML = ``;
    switch (evt.target.dataset.sortType) {
      case `date`:
        const sortFilmsByDate = this._cardData.slice().sort((a, b) => a.year - b.year);
        const sortedByDateCards = sortFilmsByDate.slice(0, countCurrentCards);
        this._renderFilms(this._filmsList.getElement(), sortedByDateCards);
        break;
      case `rating`:
        const sortFilmsByRating = this._cardData.slice().sort((a, b) => a.rating - b.rating);
        const sortedByRating = sortFilmsByRating.slice(0, countCurrentCards);
        this._renderFilms(this._filmsList.getElement(), sortedByRating);
        break;
      case `default`:
        const sortByDefault = this._cardData.slice(0, countCurrentCards);
        this._renderFilms(this._filmsList.getElement(), sortByDefault);
        break;
    }
  }

  _renderFilms(container, data) {
    unRenderComponent(this._filmsList.getElement());
    this._filmsList.removeElement();
    renderComponent(this._films.getElement(), this._filmsList.getElement(), `beforeend`);
    container.innerHTML = ``;
    data.forEach((filmsMock) => this._renderCard(container, filmsMock));
  }
  _renderCard(container, card) {
    const movieController = new MovieController(container, card, this._onChangeView, this._onDataChange);
    movieController.init();

    this._subscriptions.push(movieController.setDefaultView.bind(movieController));
  }
  _onDataChange(newData, oldData, isNewComment = false) {
    if (isNewComment) {
      this._cardData[this._cardData.findIndex((it) => it === oldData)].comments.push(newData);
    } else {
      if (this._sortedFilm.length) {
        this._sortedFilm[this._sortedFilm.findIndex((it) => it === oldData)].controls = newData.controls;
        this._cardData[this._cardData.findIndex((it) => it === oldData)].controls = newData.controls;
        this._renderBoard();
      } else {
        this._cardData[this._cardData.findIndex((it) => it === oldData)].controls = newData.controls;
        this._renderBoard();
      }
    }
  }
  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }
}
