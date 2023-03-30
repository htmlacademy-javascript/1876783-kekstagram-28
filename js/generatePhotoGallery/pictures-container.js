import {renderBigPicture} from './view-big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;

const renderPhotoGallery = (photogallery) => {
  picturesContainer.querySelectorAll('.picture').forEach((element)=>element.remove());
  const photoFragment = document.createDocumentFragment();

  photogallery.forEach(({ url, description, comments, likes }) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__img').alt = description;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picture.querySelector('.picture__likes').textContent = likes;
    photoFragment.append(picture);
  });
  picturesContainer.append(photoFragment);
  renderBigPicture(photogallery);
};

export { renderPhotoGallery };
