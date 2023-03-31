const ALERT_SHOW_TIME = 5000;

const isEscPressed = (evt) => evt.key === 'Escape';

const makeElement = (tegName, className, text) => {
  const element = document.createElement(tegName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

function debounce(callback, timeoutDelay) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const getSortRandomly = () => Math.random() - 0.5;

const getSortByComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

export {
  isEscPressed,
  makeElement,
  showAlert,
  debounce,
  getSortRandomly,
  getSortByComments
};
