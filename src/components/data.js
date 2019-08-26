import {getRandomBoolean, getRandomNumberInRange, getRandomItemFrom} from "../utils";
const MIN_YEAR = 1929;
const MAX_YEAR = 2019;

const MIN_RATING = 1;
const MAX_RATING = 10;
const MIN_NUM_OF_COMMENTS = 0;
const MAX_NUM_OF_COMMENTS = 200;

const MIN_DURATION_MINUTES = 10;
const MAX_DURATION_MINUTES = 59;

const MIN_NUM_OF_DESCR = 1;
const MAX_NUM_OF_DESCR = 3;

const filmsTitles = [
  `Greta`,
  `The Godfather`,
  `The Shawshank Redemption`,
  `Pulp Fiction`,
  `Star Wars`,
  `The Dark Knight`,
  `The Godfather Part II`,
  `The Matrix`,
  `Schindler's List`,
  `Fight Club`,
  `Back to the Future`,
  `Titanic`,
  `Taxi Driver`,
  `The Terminator`,
  `Terminator 2: Judgment Day`
];
const posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];
const descriptionArr = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget,`,
  `sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
];
const genre = [
  `Musical`,
  `Comedy`,
  `Action`,
  `Dramma`,
  `Thriler`
];
const directors = [
  `David Lynch`,
  `Martin Scorsese`,
  `Steven Soderbergh`,
  `Terrence Malick`,
  `Abbas Kiarostami`
];
const writers = [
  `Errol Morris`,
  `Hayao Miyazaki`,
  `David Cronenberg`,
  `Terence Davies`,
  `Lukas Moodysson`,
];
const actors = [
  `Robert De Niro`,
  `Jack Nicholson`,
  `Marlon Brando`,
  ` Tom Hanks`,
  `Leonardo DiCaprio`
];
const countries = [
  `USA`,
  `Russia`,
  `Greece`,
  `France`,
  `Spain`
];
const comments = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`
];
const authorOfComm = [
  `Tim Macoveev`,
  `John Doe`,
  `Alexia Holte`,
  `Christene Guyton`,
  `Stefan Lauderback`
];

const getRandomDescription = (descrInsert) => {
  let j;
  let temp;
  for (let i = descrInsert.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = descrInsert[j];
    descrInsert[j] = descrInsert[i];
    descrInsert[i] = temp;
  }
  return descrInsert.slice(0, getRandomNumberInRange(MIN_NUM_OF_DESCR, MAX_NUM_OF_DESCR));
};
export const getFilmCard = () => ({
  title: getRandomItemFrom(filmsTitles),
  poster: getRandomItemFrom(posters),
  descriptions: new Set(getRandomDescription(descriptionArr)),
  genre: getRandomItemFrom(genre),
  rating: getRandomNumberInRange(MIN_RATING, MAX_RATING),
  year: getRandomNumberInRange(MIN_YEAR, MAX_YEAR),
  numOfComments: getRandomNumberInRange(MIN_NUM_OF_COMMENTS, MAX_NUM_OF_COMMENTS),
  isInWatchList: getRandomBoolean(),
  isWatched: getRandomBoolean(),
  isFavorite: getRandomBoolean(),
  durationMin: getRandomNumberInRange(MIN_DURATION_MINUTES, MAX_DURATION_MINUTES),
  director: getRandomItemFrom(directors),
  writer: getRandomNumberInRange(1, 3),
  actor: getRandomNumberInRange(1, 3),
  country: getRandomItemFrom(countries),
  comment: getRandomItemFrom(comments),
  authorOfComment: getRandomItemFrom(authorOfComm)
});
export const getCards = (amoutOfCards) => {
  return new Array(amoutOfCards).fill(``).map(getFilmCard);
};
export const getFilterNum = (filmCard) => {
  const counts = {
    all: filmCard.length,
    Watchlist: 0,
    History: 0,
    Favorites: 0
  };
  filmCard.forEach((card) => {
    counts.Watchlist = card.isInWatchList ? counts.Watchlist += 1 : counts.Watchlist;
    counts.History = card.isWatched ? counts.History += 1 : counts.History;
    counts.Favorites = card.isFavorite ? counts.Favorites += 1 : counts.Favorites;
  });
  const resultFilters = [];

  for (let [key, value] of Object.entries(counts)) {
    resultFilters.push({
      title: key,
      count: value
    });
  }

  return resultFilters;
};
