import { getSortRandomly, getSortByComments } from '../utils.js';


const PICTURE_COUNT = 10;

const FilterType = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

let currentFilter = FilterType.DEFAULT;
let pictures = [];

const imgFilter = document.querySelector('.img-filters');

const getSortedPictures = () => {
  switch (currentFilter) {
    case FilterType.RANDOM:
      return [...pictures].sort(getSortRandomly).slice(0, PICTURE_COUNT);
    case FilterType.DISCUSSED:
      return [...pictures].sort(getSortByComments);
    default:
      return [...pictures];
  }
};

const onClickImgFilter = (cb) => {
  imgFilter.addEventListener('click', (evt) => {

    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedButton = evt.target;
    if (clickedButton.id === currentFilter) {
      return;
    }

    imgFilter
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    currentFilter = clickedButton.id;
    cb();
  });
};

const activateFilter = (loadedPictures) => {
  imgFilter.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
};

export { onClickImgFilter, getSortedPictures, activateFilter };
