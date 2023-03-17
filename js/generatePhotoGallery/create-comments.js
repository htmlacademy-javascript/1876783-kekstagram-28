import { makeElement } from '../util.js';

const socialComments = document.querySelector('.social__comments');
const commentsLoaderButton = document.querySelector('.comments-loader');
const socialCommentCount = document.querySelector('.social__comment-count');

const createComments = (comments) => {
  socialComments.textContent = '';
  comments.forEach((item) => {
    const listItem = makeElement('li', 'social__comment');
    listItem.classList.add('hidden');

    const picture = makeElement('img', 'social__picture');
    picture.src = item.avatar;
    picture.alt = item.name;
    picture.width = 35;
    picture.height = 35;
    listItem.append(picture);

    const commentText = makeElement('p', 'social__text', item.message);
    listItem.append(commentText);
    socialComments.append(listItem);
  });
};

const showComments = () => {
  const userComments = socialComments.querySelectorAll('.social__comment');
  let availabilityHidden = false;
  let countPerShow = 0;
  const hiddenCommets = socialComments.querySelectorAll('.hidden');
  if (userComments.length === hiddenCommets.length) {
    availabilityHidden = true;
  }
  for (let i = 0; i < userComments.length; i++) {
    if (!(userComments[i].classList.contains('hidden'))) {
      userComments[i].classList.add('hidden');
      availabilityHidden = true;
    } else if (countPerShow < 5 && availabilityHidden) {
      userComments[i].classList.remove('hidden');
      userComments[i].classList.add('showen');
      countPerShow++;
    }
  }

  const showenCommets = socialComments.querySelectorAll('.showen');
  socialCommentCount.textContent = `${showenCommets.length} из ${userComments.length} `;

  if (showenCommets.length === userComments.length) {
    commentsLoaderButton.classList.add('hidden');
  } else {
    commentsLoaderButton.classList.remove('hidden');
  }
};

commentsLoaderButton.addEventListener('click', () => {
  showComments();
});

export { createComments, showComments };
