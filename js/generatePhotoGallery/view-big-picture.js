import { createPhoto } from './create-big-photo.js';
import { showComments, hiddenComments } from './create-comments.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const socialCaption = bigPicture.querySelector('.social__caption');
const body = document.querySelector('body');

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture() {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  body.classList.add('modal-open');
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  body.classList.remove('modal-open');
  hiddenComments();
}

const renderBigPicture = (photoGallery) => {

  const pictures = document.querySelectorAll('.picture');

  pictures.forEach((picture, index) => {
    picture.addEventListener('click', (evt) => {
      openBigPicture();
      const { comments: currentComments, description: currentDescription } = photoGallery[index];
      createPhoto(evt);
      socialCaption.textContent = currentDescription;
      showComments(currentComments);
    });
  });
};

bigPictureCancel.addEventListener('click', () => closeBigPicture());

bigPictureCancel.addEventListener('keydown', (evt) => {
  if (evt.key === 'Enter') {
    closeBigPicture();
  }
});

export { renderBigPicture };
