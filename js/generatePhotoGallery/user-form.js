import { scaleForm } from './scale.js';

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_DESCRIPTION_LENGTH = 140;
const MAX_HASHTAGS_COUNT = 5;
const imgUpload = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__form');
const imgUploadForm = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const imgFormCancelButton = imgUploadForm.querySelector('.img-upload__cancel');
const descriptionField = imgUploadForm.querySelector('.text__description');
const hashtagsField = imgUploadForm.querySelector('.text__hashtags');

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeImgForm();
  }
};

const onFieldKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

function openImgForm() {
  imgUploadForm.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  body.classList.add('modal-open');
  scaleForm();
}

function closeImgForm() {
  imgUploadForm.classList.add('hidden');
  form.reset();
  pristine.reset();
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

imgFormCancelButton.addEventListener('keydown', (evt) => {
  if (evt.key === 'Enter') {
    closeImgForm();
  }
});

imgUpload.addEventListener('change', () => openImgForm());

imgFormCancelButton.addEventListener('click', () => closeImgForm());

descriptionField.addEventListener(('keydown'), (evt) => onFieldKeydown(evt));

hashtagsField.addEventListener(('keydown'), (evt) => onFieldKeydown(evt));

const hashtagsValidCount = (hashtags) => hashtags.length <= MAX_HASHTAGS_COUNT;

const hashtagUnique = (hashtags) => hashtags.length === new Set(hashtags).size;

const isHashtagValid = (hashtag) => HASHTAG_REGEX.test(hashtag);

const validateHashtags = (value) => {
  const hashtags = value
    .trim()
    .split(/\s/);
  return hashtagsValidCount(hashtags) && hashtagUnique(hashtags) && hashtags.every(isHashtagValid);
};

pristine.addValidator(
  hashtagsField,
  validateHashtags,
  'Неправильно указаны хэш-теги'
);

const descriptionValid = (value) => value.length <= MAX_DESCRIPTION_LENGTH;

pristine.addValidator(
  descriptionField,
  descriptionValid,
  'Максимальная длина 140 символов'
);

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
