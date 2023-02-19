// Функция для проверки длины строки
const isValidLength = (string, value) => string.length <= value;
isValidLength('проверяемая строка', 10);

// Функция для проверки, является ли строка палиндромом.
const isPalindrome = (string) => {
  let newString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    newString += string[i];
  }
  return string.toLowerCase().replaceAll(' ', '') === newString.toLowerCase().replaceAll(' ', '');
};
isPalindrome('Лёша на полке клопа нашёл ');

// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
// и возвращает их в виде целого положительного числа.
const extractNumbersFromString = (value) => {
  value = String(value);
  let result = '';
  for (let i = 0; i <= value.length; i++) {
    if (parseInt(value[i], 10) >= 0) {
      result += value[i];
    }
  }
  return parseInt(result, 10);
};
extractNumbersFromString(1.5);

// Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами
// — и возвращает исходную строку, дополненную указанными символами до заданной длины.
// Символы добавляются в начало строки. Если исходная строка превышает заданную длину,
// она не должна обрезаться. Если «добивка» слишком длинная, она обрезается с конца.
const failAddress = (string, minLength, addString) => {
  let newString = '';
  while (newString.length + string.length < minLength) {
    let newAddString = '';
    for (let i = 0; i < addString.length; i++) {
      if (newAddString.length + newString.length + string.length < minLength) {
        newAddString += addString[i];
      }
    }
    newString = newAddString + newString;
  }
  return newString + string;
};
failAddress('q', 4, 'we');
