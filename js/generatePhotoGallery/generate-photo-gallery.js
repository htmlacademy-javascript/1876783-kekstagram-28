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

export {getRandomInteger, generateCommentId};

