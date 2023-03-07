import { generatePhotoGallery } from './generate-photo-gallery.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;

const photogallery = generatePhotoGallery(25);

const photoFragment = document.createDocumentFragment();

photogallery.forEach(({ url, comments, likes }) => {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__comments').textContent = comments.length;
  picture.querySelector('.picture__likes').textContent = likes;
  photoFragment.append(picture);
});
picturesContainer.append(photoFragment);
