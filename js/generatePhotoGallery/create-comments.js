import { makeElement } from '../util.js';

const COUNT_PER_SHOW = 5;
const PICTURE_WIDTH = 35;
const PICTURE_HEIGHT = 35;


const socialComments = document.querySelector('.social__comments');
const commentsLoaderButton = document.querySelector('.comments-loader');
const socialCommentCount = document.querySelector('.social__comment-count');
let showenComments = 0;
let comments = [];

const createComments = ({ avatar, name, message }) => {
  socialComments.innerHTML = '';
  const listItem = makeElement('li', 'social__comment');

  const picture = makeElement('img', 'social__picture');
  picture.src = avatar;
  picture.alt = name;
  picture.width = PICTURE_WIDTH;
  picture.height = PICTURE_HEIGHT;
  listItem.append(picture);

  const commentText = makeElement('p', 'social__text', message);
  listItem.append(commentText);
  return listItem;
};

const showComments = (currentComments) => {
  comments = currentComments;
  showenComments += COUNT_PER_SHOW;
  if (showenComments >= comments.length) {
    commentsLoaderButton.classList.add('hidden');
    showenComments = comments.length;
  } else {
    commentsLoaderButton.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < showenComments; i++) {
    const commentItem = createComments(comments[i]);
    fragment.append(commentItem);
  }
  socialComments.innerHtml = '';
  socialComments.append(fragment);
  socialCommentCount.textContent = `${showenComments} из ${comments.length} комментариев`;
};

commentsLoaderButton.addEventListener('click', () => showComments(comments));

const hiddenComments = () => {
  showenComments = 0;
};

export { createComments, showComments, hiddenComments };
