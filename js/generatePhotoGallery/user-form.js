import { scaleForm } from './scale.js';
import { resetEffects } from './effect.js';
import { showAlert } from '../util.js';
import { sendData } from '../api.js';

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_DESCRIPTION_LENGTH = 140;
const MAX_HASHTAGS_COUNT = 5;

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const imgUpload = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const imgFormCancelButton = imgUploadOverlay.querySelector('.img-upload__cancel');
const descriptionField = imgUploadOverlay.querySelector('.text__description');
const hashtagsField = imgUploadOverlay.querySelector('.text__hashtags');
const submitButton = form.querySelector('.img-upload__submit');
const sendSuccessTemplate = document.querySelector('#success').content;
const sendErrorTemplate = document.querySelector('#error').content;

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

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

function openImgForm() {
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  body.classList.add('modal-open');
  scaleForm();
}

function closeImgForm() {
  imgUploadOverlay.classList.add('hidden');
  form.reset();
  resetEffects();
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
    .split(/\s/)
    .filter((hashtag) => hashtag.trim().length);
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

const sendFragment = document.createDocumentFragment();

const renderSendSuccess = () => {
  const sendSuccess = sendSuccessTemplate.cloneNode(true);
  sendFragment.append(sendSuccess);
  document.querySelector('body').append(sendFragment);
};

const renderSendError = () => {
  const sendError = sendErrorTemplate.cloneNode(true);
  sendFragment.append(sendError);
  document.querySelector('body').append(sendFragment);
};

function closeSuccess(evt) {
  const success = document.querySelector('.success');
  const successButton = document.querySelector('.success__button');
  if (evt.target === successButton || evt.target === success || evt.key === 'Escape') {
    evt.preventDefault();
    success.remove();
    success.removeEventListener('click', closeSuccess);
  }
}

function closeError(evt) {
  const error = document.querySelector('.error');
  const errorButton = document.querySelector('.error__button');
  if (evt.target === errorButton || evt.target === error || evt.key === 'Escape') {
    error.remove();
    error.removeEventListener('click', closeError);
  }
}

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(renderSendSuccess)
        .then(document.addEventListener('keydown', closeSuccess))
        .then(document.addEventListener('click', closeSuccess))
        .catch((err) => {
          showAlert(err.message);
        })
        .finally(unblockSubmitButton);
    } else {
      renderSendError();
      form.addEventListener('keydown', closeError);
      form.addEventListener('keydown', onFieldKeydown);
      document.addEventListener('click', closeError);
    }
  });
};

export { setUserFormSubmit, closeImgForm };
