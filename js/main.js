import './generatePhotoGallery/img-upload.js';
import {
  showAlert,
  getData,
  debounce,
  renderPhotoGallery,
  onClickImgFilter,
  getSortedPictures,
  activateFilter,
  submitUserForm,
  closeImgForm
} from './generatePhotoGallery/index.js';

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
