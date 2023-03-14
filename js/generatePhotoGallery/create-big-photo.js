const bigPictureImg = document.querySelector('.big-picture__img');
const bigPictureInfo = document.querySelector('.big-picture__social');

const createPhoto = (evt) => {
  const bigImg = bigPictureImg.querySelector('img');
  bigImg.src = evt.target.src;

  const likesCount = bigPictureInfo.querySelector('.likes-count');
  const likes = evt.target.closest('.picture').querySelector('.picture__likes');
  likesCount.textContent = likes.innerHTML;

  const commentsCount = bigPictureInfo.querySelector('.comments-count');
  const comments = evt.target.closest('.picture').querySelector('.picture__comments');
  commentsCount.textContent = comments.innerHTML;
};

export { createPhoto };
