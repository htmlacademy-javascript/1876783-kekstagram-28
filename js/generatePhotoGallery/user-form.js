import {
  isEscPressed,
  isEnterPressed,
  showAlert,
  sendData,
  scaleForm,
  resetEffects
} from './index.js';

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_DESCRIPTION_LENGTH = 140;
const MAX_HASHTAGS_COUNT = 5;

const SubmitButtonText = {
  SAVE: 'Сохранить',
  SAVING: 'Сохраняю...'
};

const ValidationErrorText = {
  ERROR_HASHTAGS: 'Неправильно указаны хэш-теги',
  ERROR_DESCRIPTION: 'Максимальная длина 140 символов'
};

const imgUpload = document.querySelector('.img-upload__input');
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
  if (isEscPressed(evt)) {
    evt.preventDefault();
    closeImgForm();
  }
};

const onFieldKeydown = (evt) => {
  if (isEscPressed(evt)) {
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
  submitButton.textContent = SubmitButtonText.SAVING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.SAVE;
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
  if (isEnterPressed(evt)) {
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
  ValidationErrorText.ERROR_HASHTAGS
);

const validateDescription = (value) => value.length <= MAX_DESCRIPTION_LENGTH;

pristine.addValidator(
  descriptionField,
  validateDescription,
  ValidationErrorText.ERROR_DESCRIPTION
);

const sendFragment = document.createDocumentFragment();

const renderSendSuccess = () => {
  const sendSuccess = sendSuccessTemplate.cloneNode(true);
  sendFragment.append(sendSuccess);
  body.append(sendFragment);
};

const renderSendError = () => {
  const sendError = sendErrorTemplate.cloneNode(true);
  sendFragment.append(sendError);
  body.append(sendFragment);
};

function closeWindowSuccessSend(evt) {
  const success = document.querySelector('.success');
  const successButton = document.querySelector('.success__button');

  if (evt.target === successButton || evt.target === success) {
    success.remove();
    document.removeEventListener('click', closeWindowSuccessSend);
  }

  if (isEscPressed(evt)) {
    evt.preventDefault();
    success.remove();
    document.removeEventListener('keydown', closeWindowSuccessSend);
  }
}

function closeWindowErrorSend(evt) {
  const error = document.querySelector('.error');
  const errorButton = document.querySelector('.error__button');

  if (evt.target === errorButton || evt.target === error) {
    error.remove();
    document.removeEventListener('click', closeWindowErrorSend);
  }

  if (isEscPressed(evt)) {
    evt.preventDefault();
    error.remove();
    form.removeEventListener('keydown', closeWindowErrorSend);
    error.removeEventListener('keydown', onFieldKeydown);
  }
}

const submitUserForm = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (!isValid) {
      renderSendError();
      form.addEventListener('keydown', closeWindowErrorSend);
      form.addEventListener('keydown', onFieldKeydown);
      document.addEventListener('click', closeWindowErrorSend);

      return;
    }

    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(onSuccess)
      .then(renderSendSuccess)
      .then(document.addEventListener('keydown', closeWindowSuccessSend))
      .then(document.addEventListener('click', closeWindowSuccessSend))
      .catch((err) => {
        showAlert(err.message);
      })
      .finally(unblockSubmitButton);
  });
};

export { submitUserForm, closeImgForm };
