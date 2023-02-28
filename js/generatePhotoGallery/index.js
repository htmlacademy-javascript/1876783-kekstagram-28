import { getRandomInteger, generatePhoto, generateComment } from './generate-photo-gallery.js';

const generatePhotoGallery = (count) => {
  const photos = [];
  for (let i = 1; i <= count; i++) {
    const photo = generatePhoto(i);
    for (let j = 1; j <= (getRandomInteger(1, 3)); j++) {
      photo.comments.push(generateComment());
    }
    photos.push(photo);
  }
  return photos;
};

export { generatePhotoGallery };
