import './generatePhotoGallery/img-upload.js';
import { getData } from './api.js';
import { renderPhotoGallery } from './generatePhotoGallery/pictures-container.js';
import { onClickImgFilter, getSortedPictures, activateFilter } from './generatePhotoGallery/sort.js';
import { debounce, showAlert } from './utils.js';
import { submitUserForm, closeImgForm } from './generatePhotoGallery/user-form.js';

const RERENDER_DELAY = 500;

getData()
  .then((pictures) => {
    renderPhotoGallery(pictures);
    activateFilter(pictures);
    onClickImgFilter(debounce(() => renderPhotoGallery(getSortedPictures()), RERENDER_DELAY));

  })
  .catch((err) => {
    showAlert(err.message);
  });

submitUserForm(closeImgForm);
