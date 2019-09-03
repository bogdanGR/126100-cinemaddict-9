import {AbstractComponent} from "./absctract-component";
export class Card extends AbstractComponent {
  constructor({title, poster, descriptions, genre, rating, year, isInWatchList, isWatched, isFavorite, durationMin, comment}) {
    super();
    this._title = title;
    this._poster = poster;
    this._descriptions = descriptions;
    this._genre = genre;
    this._rating = rating;
    this._year = year;
    this._comment = comment;
    this._isInWatchList = isInWatchList;
    this._isWatched = isWatched;
    this._isFavorite = isFavorite;
    this._durationMin = durationMin;
  }
  getTemplate() {
    return `<article class="film-card">
              <h3 class="film-card__title">${this._title}</h3>
              <p class="film-card__rating">${this._rating}</p>
              <p class="film-card__info">
                <span class="film-card__year">${this._year}</span>
                <span class="film-card__duration">1h ${this._durationMin}m</span>
                <span class="film-card__genre"> ${Array.from(this._genre).map((genre) => genre).slice(0, 1).join(``)}</span>
              </p>
              <img src="./images/posters/${this._poster}" alt="" class="film-card__poster">
              <p class="film-card__description">${Array.from(this._descriptions).map((descr) => descr).join(``)}</p>
              <a class="film-card__comments">${this._comment.size} comments</a>
              <form class="film-card__controls">
                <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._isInWatchList ? `film-card__controls-item--active"` : ``}">Add to watchlist</button>
                <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._isWatched ? `film-card__controls-item--active"` : ``}">Mark as watched</button>
                <button class="film-card__controls-item button film-card__controls-item--favorite ${this._isFavorite ? `film-card__controls-item--active"` : ``}">Mark as favorite</button>
              </form>
            </article>`;
  }
}

