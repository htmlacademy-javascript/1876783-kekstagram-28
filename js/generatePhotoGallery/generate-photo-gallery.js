import { photoDescriptions, commentMessages, commentNames } from './data.js';

const numberOfAvatars = 6;

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getUniqueInteger = () => {
  let lastGeneratedInteger = 0;

  return function () {
    lastGeneratedInteger += 1;
    return lastGeneratedInteger;
  };
};

const generateCommentId = getUniqueInteger();

const generateComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, numberOfAvatars)}.svg`,
  message: `${commentMessages[getRandomInteger(0, commentMessages.length - 1)]} ${commentMessages[getRandomInteger(0, commentMessages.length - 1)]}`,
  name: commentNames[getRandomInteger(0, commentNames.length - 1)],
});

const generatePhoto = (integer) => ({
  id: integer,
  url: `photos/${integer}.jpg`,
  description: photoDescriptions[getRandomInteger(0, photoDescriptions.length - 1)],
  likes: getRandomInteger(15, 200),
  comments: []
});

export { getRandomInteger, generateComment, generatePhoto };
