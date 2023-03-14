import { makeElement } from '../util.js';

const socialComments = document.querySelector('.social__comments');

const createComments = (comments) => {
  socialComments.textContent = '';
  comments.forEach((item) => {
    const listItem = makeElement('li', 'social__comment');

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

export { createComments };
