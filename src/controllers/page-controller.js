import {getCards} from "../data/data";
import {renderComponent, unRenderComponent} from "../utils";
import {NoFilms} from "../components/no-films";
import {Button} from "../components/btn-show-more";
import {TopRatedFilms} from "../components/top-rated-films";
import {MostCommented} from "../components/most-commented-films";
import {SortTemplate} from "../components/sort-filter";
import {Films} from "../components/films";
import {FilmsList} from "../components/filmsList";
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
    this._getCardsToTopRated = getCards(NUM_OF_RENDERING_TO_CATEGORIES);
    this._getCardsToMostCommented = getCards(NUM_OF_RENDERING_TO_CATEGORIES);
    this._numCardsToRender = this._cardData.slice(0, MAX_RENDER_CARDS);
    this._sortedFilm = [];
    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }
  init() {
    if (this._numberOfCards) {
      renderComponent(this._container, this._sort.getElement(), `beforeend`);
      renderComponent(this._container, this._films.getElement(), `beforeend`);
      this._renderBoard();
    } else {
      const noFilms = new NoFilms();
      renderComponent(this._container, noFilms.getElement(), `beforeend`);
    }
    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }
  _showContent() {
    this.init();
  }
  _hideContent() {
    unRenderComponent(this._sort.getElement());
    unRenderComponent(this._films.getElement());
    this._sort.removeElement();
    this._films.removeElement();
  }
  _renderBoard() {
    unRenderComponent(this._filmsList.getElement());
    this._filmsList.removeElement();
    renderComponent(this._films.getElement().querySelector(`.films-list`), this._filmsList.getElement(), `beforeend`);
    renderComponent(this._films.getElement(), this._topRatedFilms.getElement(), `beforeend`);
    renderComponent(this._films.getElement(), this._mostCommentedFilms.getElement(), `beforeend`);

    this._renderFilms(this._filmsList.getElement(), this._numCardsToRender);
    this._renderFilms(this._topRatedFilms.getElement().querySelector(`.films-list--left .films-list__container`), this._getCardsToTopRated);
    this._renderFilms(this._mostCommentedFilms.getElement().querySelector(`.films-list--right .films-list__container`), this._getCardsToMostCommented);

    if ((this._cardData.length - this._getCountCurrentCards()) > 0) {
      this._renderBtn();
    }
  }
  _renderBtn() {
    renderComponent(this._films.getElement().querySelector(`.films-list`), this._btnShowMore.getElement(), `beforeend`);
    const loadMoreButton = document.querySelector(`.films-list__show-more`);

    const onLoadMoreButtonClick = (evt) => {
      evt.preventDefault();
      const countCurrentCards = this._getCountCurrentCards();

      const cards = (this._sortedFilm.length > 0) ? this._sortedFilm : this._cardData;
      const renderMoreCards = cards.slice(0, countCurrentCards + MAX_RENDER_CARDS);
      this._renderFilms(this._filmsList.getElement(), renderMoreCards);
      let leftCardToRender = renderMoreCards.length - countCurrentCards < MAX_RENDER_CARDS;
      if (leftCardToRender) {
        unRenderComponent(this._btnShowMore.getElement());
        this._btnShowMore.removeElement();
      }
    };
    loadMoreButton.addEventListener(`click`, onLoadMoreButtonClick);
  }
  _renderFilms(container, data) {
    container.innerHTML = ``;
    data.forEach((filmsMock) => this._renderCard(container, filmsMock));
  }
  _renderCard(container, card) {
    const movieController = new MovieController(container, card, this._onDataChange, this._onChangeView);
    movieController.init();
    this._subscriptions.push(movieController.setDefaultView.bind(movieController));
  }
  _getCountCurrentCards() {
    return this._container.querySelector(`.films-list__container`).querySelectorAll(`.film-card`).length;
  }
  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }
  _onDataChange(newData, oldData, isNewComment = false) {
    // if(newData === null) {
    //
    // }
    if (isNewComment) {
      this._cardData[this._cardData.findIndex((it) => it === oldData)].comment.push(newData);
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
}
