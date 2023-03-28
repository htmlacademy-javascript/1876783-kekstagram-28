import './generatePhotoGallery/scale.js';
import './generatePhotoGallery/effect.js';
import { renderPhotoGallery } from './generatePhotoGallery/pictures-container.js';
import { setUserFormSubmit, closeImgForm } from './generatePhotoGallery/user-form.js';
import { renderBigPicture } from './generatePhotoGallery/view-big-picture.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

getData()
  .then((pictures) => {
    renderPhotoGallery(pictures);
    renderBigPicture(pictures);
  })
  .catch((err) => {
    showAlert(err.message);
  });

setUserFormSubmit(closeImgForm);
