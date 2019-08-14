import {createMenuTemplate} from "./../src/components/site-menu.js";
import {createBtnShowMoreTemplate} from "./components/btn-show-more";
import {createCardOfFilmTemplate} from "./components/film-card";
import {createSearchTemplate} from "./components/search";
import {createUserProfileTemplate} from "./components/user-rank";
import {createSortTemplate} from "./components/sort-filter";
import {createContentTemplate} from "./components/content";
import {createTopRatedTemplate} from "./components/top-rated-films";
import {createMostCommentedTemplate} from "./components/most-commented-films";

const renderComponent = (container, template, place) => {
  const domContainer = document.querySelector(container);
  domContainer.insertAdjacentHTML(place, template);
};
const renderCards = (container, amoutOfCards) => {
  for (let i = 0; i < amoutOfCards; i++) {
    renderComponent(container, createCardOfFilmTemplate(), `beforeEnd`);
  }
};
const showComponent = () => {
  renderComponent(`.header`, createSearchTemplate(), `beforeEnd`);
  renderComponent(`.header`, createUserProfileTemplate(), `beforeEnd`);
  renderComponent(`.main`, createMenuTemplate(), `beforeEnd`);
  renderComponent(`.main`, createSortTemplate(), `beforeEnd`);
  renderComponent(`.main`, createContentTemplate(), `beforeEnd`);
  renderComponent(`.films`, createBtnShowMoreTemplate(), `beforeend`);
  renderComponent(`.films`, createTopRatedTemplate(), `beforeEnd`);
  renderComponent(`.films`, createMostCommentedTemplate(), `beforeEnd`);
  renderComponent(`.films-list--left`, `<div class="films-list__container">`, `beforeEnd`);
  renderComponent(`.films-list--right`, `<div class="films-list__container"></div>`, `beforeEnd`);
  renderCards(`.films-list__container`, 5);
  renderCards(`.films-list--left .films-list__container`, 2);
  renderCards(`.films-list--right .films-list__container`, 2);
};
showComponent();
