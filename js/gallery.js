const photoDescriptions = [
  'Если смогу, я сделаю это. Конец истории.',
  'Моя жизнь меняется, потому что меняю ее я.',
  'Всегда начинайте свой день с хороших людей и кофе.',
  'Все только начинает становиться действительно хорошим.',
  'Утром только одна хорошая мысль меняет смысл целого дня.'
];

const commentMessages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const commentNames = [
  'Анастасия',
  'Арина',
  'Иван',
  'Лев',
  'Егор',
  'Ксения',
  'Константин',
  'Владимир'
];

const numberOfPhotos = 25;
const numberOfAvatars = 6;

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function createRandomIdFromRangeGenerator(min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const generatePhotoId = createRandomIdFromRangeGenerator(1, numberOfPhotos);
const generatePhotoUrl = createRandomIdFromRangeGenerator(1, numberOfPhotos);
const generateCommentId = createRandomIdFromRangeGenerator(1, 300);

const generateComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, numberOfAvatars)}.svg`,
  message: `${commentMessages[getRandomInteger(0, commentMessages.length - 1)]} ${commentMessages[getRandomInteger(0, commentMessages.length - 1)]}`,
  name: commentNames[getRandomInteger(0, commentNames.length - 1)]
});

const generatePhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoUrl()}.jpg`,
  description: photoDescriptions[getRandomInteger(0, photoDescriptions.length - 1)],
  likes: getRandomInteger(15, 200),
  comments: []
});

const galleryPhoto = (count) => {
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
galleryPhoto(25);
