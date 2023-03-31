const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const imgUpload = document.querySelector('.img-upload__input');
const imgPreview = document.querySelector('.img-upload__preview img');

imgUpload.addEventListener('change', () => {
  const file = imgUpload.files[0];
  const fileName = file.name.toLowerCase();
  const typeFileSelected = FILE_TYPES.some((fileType) => fileName.endsWith(fileType));

  if (typeFileSelected) {
    imgPreview.src = URL.createObjectURL(file);
  }
});
