import {Menu} from "./../src/components/site-menu.js";
import {renderComponent} from "./utils";
import {SearchBar} from "./components/search";
import {UserRank} from "./components/user-rank";
import {getFilterNum, getCards} from "./components/data";
import {Footer} from "./components/footer";
import {PageController} from "./components/page-controller";
import {Statistic} from "./components/statistic";

const CARD_NUM = 30;
const CARDS = getCards(CARD_NUM);
const headerSite = document.querySelector(`.header`);
const mainSite = document.querySelector(`.main`);

const search = new SearchBar();
const userRank = new UserRank(getFilterNum(CARDS));
const menuFilters = new Menu(getFilterNum(CARDS));
const footerOfSite = new Footer(getFilterNum(CARDS));
const stats = new Statistic().getElement();

renderComponent(headerSite, search.getElement(), `beforeend`);
renderComponent(headerSite, userRank.getElement(getFilterNum(CARDS)), `beforeend`);
renderComponent(mainSite, menuFilters.getElement(getFilterNum(CARDS)), `beforeend`);
renderComponent(mainSite, stats, `beforeend`);
const controllerContent = new PageController(mainSite, CARDS);
controllerContent.init();


const mainNav = document.querySelector(`.main-navigation`);
stats.classList.add(`visually-hidden`);
controllerContent._showContent();
mainNav.addEventListener(`click`, (evt) => {
  evt.preventDefault();

  if (!evt.target.classList.contains(`main-navigation__item`)) {
    return;
  }

  const targetHrefCurrent = evt.target.href;
  const conditionSwitch = targetHrefCurrent.substr(targetHrefCurrent.lastIndexOf(`#`) + 1);

  const removeActiveItem = () => {
    mainNav.querySelectorAll(`.main-navigation__item`).forEach((item) => {
      item.classList.remove(`main-navigation__item--active`);
    });
  };

  removeActiveItem();
  evt.target.classList.add(`main-navigation__item--active`);

  switch (conditionSwitch) {
    case `all`:
      stats.classList.add(`visually-hidden`);
      controllerContent._showContent();
      break;
    case `Watchlist`:
      stats.classList.add(`visually-hidden`);
      controllerContent._showContent();
      break;
    case `History`:
      stats.classList.add(`visually-hidden`);
      controllerContent._showContent();
      break;
    case `Favorites`:
      stats.classList.add(`visually-hidden`);
      controllerContent._showContent();
      break;
    case `stats`:
      controllerContent._hideContent();
      stats.classList.remove(`visually-hidden`);
      break;
    default:
      break;
  }
});
renderComponent(mainSite, footerOfSite.getElement(getFilterNum(CARDS)), `afterend`);

