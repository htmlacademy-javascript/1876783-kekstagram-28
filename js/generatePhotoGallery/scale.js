const DEFAULT_VALUE = 100;
const STEP_SCALE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_IN_PERCENT = 100;
const RADIX = 10;

const changingSizeInput = document.querySelector('.scale__control--value');
const image = document.querySelector('.img-upload__preview img');

const scaleImg = (value) => {
  image.style.transform = `scale(${(value / SCALE_IN_PERCENT)})`;
  changingSizeInput.value = `${value}%`;
};

function onButtonScaleClick(evt) {
  const currentValue = parseInt(changingSizeInput.value, RADIX);
  let newValue;

  if (evt.target.matches('.scale__control--smaller')) {
    newValue = currentValue - STEP_SCALE;

    if (newValue < MIN_SCALE) {
      newValue = MIN_SCALE;
    }
  }

  if (evt.target.matches('.scale__control--bigger')) {
    newValue = currentValue + STEP_SCALE;

    if (newValue > MAX_SCALE) {
      newValue = MAX_SCALE;
    }
  }
  scaleImg(newValue);
}

const scaleForm = () => scaleImg(DEFAULT_VALUE);

export { scaleForm, onButtonScaleClick };
