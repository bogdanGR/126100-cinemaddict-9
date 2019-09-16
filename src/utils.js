const getRandomItemFromArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};
const getRandomArray = (lengthOfItems, array) => {
  let arrayNew = [];
  new Array(lengthOfItems).fill(``).forEach(() => arrayNew.push(array[Math.floor(Math.random() * array.length)]));
  return arrayNew;
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

const unRenderComponent = (element) => {
  if (element) {
    element.remove();
  }
};
const isDeactivateEvent = (evt) => {
  const ESC_KEYCODE = 27;
  return evt.keyCode && evt.keyCode === ESC_KEYCODE;
};
const isActivationEvent = (evt) => {
  const ENTER_KEY_CODE = 13;
  return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
};
export {getRandomBoolean, getRandomItemFromArray, getRandomNumberInRange, renderComponent, createElement, unRenderComponent, isDeactivateEvent, getRandomArray, isActivationEvent};
