const getRandomItemFrom = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};
const getRandomBoolean = () => {
  return Boolean(Math.round(Math.random()));
};
const getRandomNumberInRange = (min, max) => {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
};
const renderComponent = (container, template) => {
  container.insertAdjacentHTML(`beforeend`, template);
};
export {getRandomBoolean, getRandomItemFrom, getRandomNumberInRange, renderComponent};
