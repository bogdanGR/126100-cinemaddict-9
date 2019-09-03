import {AbstractComponent} from "./absctract-component";

export class Popup extends AbstractComponent {
  constructor({title, poster, descriptions, genre, rating, year, isInWatchList, isWatched, isFavorite, durationMin, director, country, comment, authorOfComment, writer, actor, ageRestriction}) {
    super();
    this._title = title;
    this._poster = poster;
    this._descriptions = descriptions;
    this._genre = genre;
    this._rating = rating;
    this._year = year;
    this._isInWatchList = isInWatchList;
    this._isWatched = isWatched;
    this._isFavorite = isFavorite;
    this._durationMin = durationMin;
    this._director = director;
    this._writer = writer;
    this._actor = actor;
    this._country = country;
    this._comment = comment;
    this._authorOfComment = authorOfComment;
    this._ageRestiction = ageRestriction;
    this._element = null;
  }
  getTemplate() {
    return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${this._poster}" alt="">

          <p class="film-details__age">${this._ageRestiction}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${this._title}</h3>
              <p class="film-details__title-original">Original: ${this._title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${this._rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${this._director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${this._writer.size > 1 ? `Writers` : `Writer`}</td>
              <td class="film-details__cell">${Array.from(this._writer).map((writerItem) => writerItem).join(`, `)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${this._actor.size > 1 ? `Actors` : `Actor`}</td>
              <td class="film-details__cell">${Array.from(this._actor).map((actorItem) => actorItem).join(`, `)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">30 March ${this._year}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">1h ${this._durationMin}m</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${this._country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${this._genre.size > 1 ? `Genres` : `Genre`}</td>
              <td class="film-details__cell">
                 ${Array.from(this._genre).map((genre) => `
                    <span class="film-details__genre">
                     ${genre}
                    </span>
                  `).join(``)}
                 </td>
            </tr>
          </table>

          <p class="film-details__film-description">${Array.from(this._descriptions).map((descr) => descr).join(``)}</p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist ${this._isInWatchList ? `film-details__control-input:checked + .film-details__control-label"` : ``}">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
        <label for="watched" class="film-details__control-label film-details__control-label--watched ${this._isWatched ? `film-details__control-input:checked + .film-details__control-label"` : ``}">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite ${this._isFavorite ? `film-details__control-input:checked + .film-details__control-label"` : ``}">Add to favorites</label>
      </section>
    </div>

    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._comment.size}</span></h3>

        <ul class="film-details__comments-list">
          ${Array.from(this._comment).map((item) => `
            <li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="${item.img}" width="55" height="55" alt="emoji">
              </span>
              <div>
                <p class="film-details__comment-text">${item.text}</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">${item.author}</span>
                  <span class="film-details__comment-day">${item.date} days ago</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
            </li>
          `).join(``)}
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
            <label class="film-details__emoji-label" for="emoji-gpuke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
  }
}
