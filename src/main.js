import {Menu} from "./../src/components/site-menu.js";
import {renderComponent} from "./utils";
import {SearchBar} from "./components/search";
import {UserRank} from "./components/user-rank";
import {SortTemplate} from "./components/sort-filter";
import {Content} from "./components/content";
import {getFilmCard, getFilterNum, getCards} from "./components/data";
import {Footer} from "./components/footer";
import {PageController} from "./components/page-controller";

const CARD_NUM = 30;
const CARDS = getCards(CARD_NUM);

const headerSite = document.querySelector(`.header`);
const mainSite = document.querySelector(`.main`);

const search = new SearchBar();
const userRank = new UserRank(getFilterNum(CARDS));
const menuFilters = new Menu(getFilterNum(CARDS));
const sortTpl = new SortTemplate();
const contentTpl = new Content();
const footerOfSite = new Footer(getFilterNum(CARDS));

renderComponent(headerSite, search.getElement(), `beforeend`);
renderComponent(headerSite, userRank.getElement(getFilterNum(CARDS)), `beforeend`);
renderComponent(mainSite, menuFilters.getElement(getFilterNum(CARDS)), `beforeend`);
renderComponent(mainSite, sortTpl.getElement(), `beforeend`);
const films = document.querySelector(`.films`);
renderComponent(mainSite, contentTpl.getElement(), `beforeend`);

const cardTpl = new Array(5).fill(` `).map(getFilmCard);
const filmsContainer = document.querySelector(`.films-list__container`);
const controllerContent = new PageController(mainSite, cardTpl);
controllerContent.init();

renderComponent(mainSite, footerOfSite.getElement(getFilterNum(CARDS)), `beforeend`);


