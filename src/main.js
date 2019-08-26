import {Menu} from "./../src/components/site-menu.js";
import {renderComponent, isDeactivateEvent} from "./utils";
import {Button} from "./components/btn-show-more";
import {Card} from "./components/film-card";
import {Popup} from "./components/popup";
import {SearchBar} from "./components/search";
import {UserRank} from "./components/user-rank";
import {SortTemplate} from "./components/sort-filter";
import {Content} from "./components/content";
import {TopRatedFilms} from "./components/top-rated-films";
import {MostCommented} from "./components/most-commented-films";
import {getFilmCard, getFilterNum, getCards} from "./components/data";
import {Footer} from "./components/footer";


const CARD_NUM = 30;
const MAX_RENDER_CARDS = 5;
const CARDS = getCards(CARD_NUM);

const headerSite = document.querySelector(`.header`);
const mainSite = document.querySelector(`.main`);


const search = new SearchBar();
const userRank = new UserRank(getFilterNum(CARDS));
const menuFilters = new Menu(getFilterNum(CARDS));
const sortTpl = new SortTemplate();
const contentTpl = new Content();
const btnShowMore = new Button();
const topRatedFilms = new TopRatedFilms();
const mostCommentedFilms = new MostCommented();
const footerOfSite = new Footer(getFilterNum(CARDS));

renderComponent(headerSite, search.getElement(), `beforeend`);
renderComponent(headerSite, userRank.getElement(getFilterNum(CARDS)), `beforeend`);
renderComponent(mainSite, menuFilters.getElement(getFilterNum(CARDS)), `beforeend`);
renderComponent(mainSite, sortTpl.getElement(), `beforeend`);
renderComponent(mainSite, contentTpl.getElement(), `beforeend`);
const filmsNode = document.querySelector(`.films`);
const filmContainer = document.querySelector(`.films-list__container`);
const filmList = document.querySelector(`.films-list`);

const cardsMocks = new Array(MAX_RENDER_CARDS).fill(``).map(getFilmCard);
const cardToTopRated = new Array(2).fill(``).map(getFilmCard);
const cardToMostComm = new Array(2).fill(``).map(getFilmCard);

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
  cardDetails.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, closeNodeHandler);

  renderComponent(container, card.getElement(), `beforeend`);
}
cardsMocks.forEach((cardTpl) => renderCards(filmContainer, cardTpl));


renderComponent(filmList, btnShowMore.getElement(), `beforeend`);
renderComponent(filmsNode, topRatedFilms.getElement(), `beforeend`);
renderComponent(filmsNode, mostCommentedFilms.getElement(), `beforeend`);

const filmLeftContainer = document.querySelector(`.films-list--left .films-list__container`);
const filmRightContainer = document.querySelector(`.films-list--right .films-list__container`);

cardToTopRated.forEach((card) => renderCards(filmLeftContainer, card));
cardToMostComm.forEach((card) => renderCards(filmRightContainer, card));
renderComponent(mainSite, footerOfSite.getElement(getFilterNum(CARDS)), `beforeend`);

let cardsOnPage = MAX_RENDER_CARDS;
let leftCardToRender = CARDS.length - cardsOnPage;
const loadMoreButton = mainSite.querySelector(`.films-list__show-more`);

const getFilmCards = (cards) => {
  return cards.map((cardData) => {
    const card = new Card(cardData);
    return card.getElement();
  });
};

const renderLeftCards = () => {
  const myCards = getFilmCards(CARDS.slice(cardsOnPage, (cardsOnPage + MAX_RENDER_CARDS)));
  for (let i = 0; i < myCards.length; i++) {
    renderComponent(filmContainer, myCards[i], `beforeend`);
  }
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
