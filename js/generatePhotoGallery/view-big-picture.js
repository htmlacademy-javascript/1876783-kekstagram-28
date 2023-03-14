import { photogallery } from './pictures-container.js';
import { createPhoto } from './create-big-photo.js';
import { createComments } from './create-comments.js';

const bigPicture = document.querySelector('.big-picture');
const pictures = document.querySelectorAll('.picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const body = document.querySelector('body');

const isEscapeKey = (evt) => evt.key === 'Escape';

const isEnterKey = (evt) => evt.key === 'Enter';

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture() {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  body.classList.add('modal-open');
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  body.classList.remove('modal-open');
}

pictures.forEach((picture, index) => {
  picture.addEventListener('click', (evt) => {
    const { comments: currentComments, description: currentDescription } = photogallery[index];
    openBigPicture();
    createPhoto(evt);
    socialCaption.textContent = currentDescription;
    createComments(currentComments);
  });
});

bigPictureCancel.addEventListener('click', () => {
  closeBigPicture();
});

bigPictureCancel.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeBigPicture();
  }
});
