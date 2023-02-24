const DESCRIPTION = [
  'Если смогу, я сделаю это. Конец истории.',
  'Моя жизнь меняется, потому что меняю ее я.',
  'Всегда начинайте свой день с хороших людей и кофе.',
  'Все только начинает становиться действительно хорошим.',
  'Утром только одна хорошая мысль меняет смысл целого дня.'
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAME = [
  'Анастасия',
  'Арина',
  'Иван',
  'Лев',
  'Егор',
  'Ксения',
  'Константин',
  'Владимир'
];

const PHOTOS = 25;
const AVATAR = 6;

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomIntegerFromGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    for (let i = min; i <= max; i++) {
      let currentValue = getRandomInteger(min, max);
      if (previousValues.length >= (max - min + 1)) {
        return null;
      }
      while (previousValues.includes(currentValue)) {
        currentValue = getRandomInteger(min, max);
      }
      previousValues.push(currentValue);
    }
    return previousValues;
  };
};

const getLastElement = (arr) => {
  const arrLastElement = arr[arr.length - 1];
  arr.pop();
  return arrLastElement;
};

const arrRandomPhotoId = (getRandomIntegerFromGenerator(1, PHOTOS)());
const arrRandomPhotoUrl = (getRandomIntegerFromGenerator(1, PHOTOS)());
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];
// генерирует количество комментариев и их id
let commentId = 1;
const getCommentsGenerator = ()=> {
  const maxComment = getRandomInteger(1, 2);
  const arrComments = [];
  for (let i = 1; i <= maxComment; i++) {
    arrComments.push({
      id: commentId,
      avatar: `img/avatar-${getRandomInteger(1, AVATAR)}.svg`,
      message: getRandomArrayElement(MESSAGE),
      name: getRandomArrayElement(NAME)
    });
    commentId ++;
  }
  return arrComments;
};
// описание 1 фото
const createPhoto = () => ({
  id: getLastElement(arrRandomPhotoId),
  url: `photos/${getLastElement(arrRandomPhotoUrl)}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(15, 200),
  comments: getCommentsGenerator()
});

const descriptionPhotos = Array.from({ length: PHOTOS }, createPhoto);
