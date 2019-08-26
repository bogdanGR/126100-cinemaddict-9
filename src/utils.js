const getRandomItemFrom = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};
const getRandomBoolean = () => {
  return Boolean(Math.round(Math.random()));
};
const getRandomNumberInRange = (min, max) => {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
};
const position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};
const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

// Рендер и анрендер для компонент
const renderComponent = (container, element, place) => {
  switch (place) {
    case position.AFTERBEGIN:
      container.prepend(element);
      break;
    case position.BEFOREEND:
      container.append(element);
      break;
  }
};
const removeElement = (elem) => {
  elem = null;
};

const unRenderComponent = (element) => {
  if (element) {
    element.remove();
    removeElement(element);
  }
};
const isDeactivateEvent = (evt) => {
  const ESC_KEYCODE = 27;
  return evt.keyCode && evt.keyCode === ESC_KEYCODE;
};
export {getRandomBoolean, getRandomItemFrom, getRandomNumberInRange, renderComponent, createElement, unRenderComponent, removeElement, isDeactivateEvent};
