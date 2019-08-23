import {getFilters} from "./../src/components/site-menu.js";
import {renderComponent} from "./components/utils";
import {createBtnShowMoreTemplate} from "./components/btn-show-more";
import {createCardOfFilmTemplate} from "./components/film-card";
import {createSearchTemplate} from "./components/search";
import {getUserRank} from "./components/user-rank";
import {createSortTemplate} from "./components/sort-filter";
import {createContentTemplate} from "./components/content";
import {createTopRatedTemplate} from "./components/top-rated-films";
import {createMostCommentedTemplate} from "./components/most-commented-films";
import {getFilmCard, getFilterNum, getCards} from "./components/data";
import {getFooterTemplate} from "./components/footer";

const CARD_NUM = 30;
const MAX_RENDER_CARDS = 5;
const CARDS = getCards(CARD_NUM);

const getFilmCards = (cards) => {
  return cards.map((card) => createCardOfFilmTemplate(card)).join(``);
};
const renderCards = (container, count) => {
  container.insertAdjacentHTML(`beforeend`, new Array(count)
    .fill(``)
    .map(getFilmCard)
    .map(createCardOfFilmTemplate)
    .join(``));
};

const headerSite = document.querySelector(`.header`);
const mainSite = document.querySelector(`.main`);

renderComponent(headerSite, createSearchTemplate());
renderComponent(headerSite, getUserRank(getFilterNum(CARDS)));
renderComponent(mainSite, getFilters(getFilterNum(CARDS)));
renderComponent(mainSite, createSortTemplate());
renderComponent(mainSite, createContentTemplate());

const filmsNode = document.querySelector(`.films`);
renderComponent(filmsNode, createBtnShowMoreTemplate());
renderComponent(filmsNode, createTopRatedTemplate());
renderComponent(filmsNode, createMostCommentedTemplate());
const filmLeft = document.querySelector(`.films-list--left`);
const filmRight = document.querySelector(`.films-list--right`);

renderComponent(filmLeft, `<div class="films-list__container"></div>`);
renderComponent(filmRight, `<div class="films-list__container"></div>`);
const filmContainer = document.querySelector(`.films-list__container`);
renderCards(filmContainer, 5);

const filmLeftContainer = document.querySelector(`.films-list--left .films-list__container`);
const filmRightContainer = document.querySelector(`.films-list--right .films-list__container`);

renderCards(filmLeftContainer, 2);
renderCards(filmRightContainer, 2);

let cardsOnPage = MAX_RENDER_CARDS;
let leftCardToRender = CARDS.length - cardsOnPage;
const loadMoreButton = mainSite.querySelector(`.films-list__show-more`);
const renderLeftCards = () => {
  renderComponent(filmContainer, getFilmCards(CARDS.slice(cardsOnPage, (cardsOnPage + MAX_RENDER_CARDS))));

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
renderComponent(mainSite, getFooterTemplate(getFilterNum(CARDS)));
