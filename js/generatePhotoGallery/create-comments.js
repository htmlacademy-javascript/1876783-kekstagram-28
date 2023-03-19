import { makeElement } from '../util.js';

const socialComments = document.querySelector('.social__comments');
const commentsLoaderButton = document.querySelector('.comments-loader');
const socialCommentCount = document.querySelector('.social__comment-count');
let showenComments = 0;
let comments = [];

const createComments = (comment) => {
  socialComments.innerHTML = '';
  const listItem = makeElement('li', 'social__comment');

  const picture = makeElement('img', 'social__picture');
  picture.src = comment.avatar;
  picture.alt = comment.name;
  picture.width = 35;
  picture.height = 35;
  listItem.append(picture);

  const commentText = makeElement('p', 'social__text', comment.message);
  listItem.append(commentText);
  return listItem;
};

const showComments = (currentComments) => {
  comments = currentComments;
  const countPerShow = 5;
  showenComments += countPerShow;
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

commentsLoaderButton.addEventListener('click', () => {
  showComments(comments);
});

const hiddenComments = () => {
  showenComments = 0;
};

export { createComments, showComments, hiddenComments };
