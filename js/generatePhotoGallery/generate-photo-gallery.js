import { getRandomInteger, getRandomUnicueInteger, getUniqueInteger } from '../util.js';

import {
  COUNT_PHOTOS, COUNT_AVATARS, COUNT_MIN_LIKES, COUNT_MAX_LIKES,
  PHOTO_DESCRIPTIONS, COMMENT_MESSAGES, COMMENT_NAMES
} from './data.js';

const generatePhotoId = getRandomUnicueInteger(1, COUNT_PHOTOS);
const generatePhotoUrl = getRandomUnicueInteger(1, COUNT_PHOTOS);
const generateCommentId = getUniqueInteger();

const generateCommentMessage = () => {
  const messages = [];
  for (let i = 1; i <= (getRandomInteger(1, 2)); i++) {
    messages.push(COMMENT_MESSAGES[getRandomInteger(0, COMMENT_MESSAGES.length - 1)]);
  }
  return messages;
};

const generateComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, COUNT_AVATARS)}.svg`,
  message: generateCommentMessage().join(' '),
  name: COMMENT_NAMES[getRandomInteger(0, COMMENT_NAMES.length - 1)]
});

const generatePhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoUrl()}.jpg`,
  description: PHOTO_DESCRIPTIONS[getRandomInteger(0, PHOTO_DESCRIPTIONS.length - 1)],
  likes: getRandomInteger(COUNT_MIN_LIKES, COUNT_MAX_LIKES),
  comments: []
});

const generatePhotoGallery = (count) => {
  const photos = [];
  for (let i = 1; i <= count; i++) {
    const photo = generatePhoto();
    for (let j = 1; j <= (getRandomInteger(0, 3)); j++) {
      photo.comments.push(generateComment());
    }
    photos.push(photo);
  }
  return photos;
};

export { generatePhotoGallery };
