const DEFOLT_VALUE = 100;
const STEP_SCALE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const smallerElementButton = document.querySelector('.scale__control--smaller');
const biggerElementButton = document.querySelector('.scale__control--bigger');
const elementInputValue = document.querySelector('.scale__control--value');
const elementImg = document.querySelector('.img-upload__preview img');

const scaleImg = (value) => {
  elementImg.style.transform = `scale(${(value / 100)})`;
  elementInputValue.value = `${value}%`;
};

const smallerrButtonClick = () => {
  const currentValue = parseInt(elementInputValue.value, 10);
  let newValue = currentValue - STEP_SCALE;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scaleImg(newValue);
};

const biggerButtonClick = () => {
  const currentValue = parseInt(elementInputValue.value, 10);
  let newValue = currentValue + STEP_SCALE;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scaleImg(newValue);
};

smallerElementButton.addEventListener('click', () => smallerrButtonClick());
biggerElementButton.addEventListener('click', () => biggerButtonClick());

const scaleForm = () => scaleImg(DEFOLT_VALUE);

export { scaleForm };
