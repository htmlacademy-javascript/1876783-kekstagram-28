import './generatePhotoGallery/scale.js';
import './generatePhotoGallery/effect.js';
import './generatePhotoGallery/filter.js';
import './generatePhotoGallery/img-upload.js';
import { onClickImgFilter, init, getSortedPictures } from './generatePhotoGallery/filter.js';
import { renderPhotoGallery } from './generatePhotoGallery/pictures-container.js';
import { submitUserForm, closeImgForm } from './generatePhotoGallery/user-form.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

const RERENDER_DELAY = 500;

getData()
  .then((pictures) => {
    renderPhotoGallery(pictures);
    init(pictures);
    onClickImgFilter(debounce(() => renderPhotoGallery(getSortedPictures()), RERENDER_DELAY));

  })
  .catch((err) => {
    showAlert(err.message);
  });

function debounce(callback, timeoutDelay) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

submitUserForm(closeImgForm);
