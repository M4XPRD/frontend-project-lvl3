import * as yup from 'yup';

const array = ['i', 'https://ya.ru/'];

const validateURL = (url) => {
  const schema = yup.string().url().required();
  try {
    schema.notOneOf(array).validateSync(url, { abortEarly: false });
    return true;
  } catch (error) {
    return 'Ссылка не содержит валидный URL';
  }
};

const ex1 = 'i';
const ex2 = 'https://ru.hexl';
const ex3 = 'https://ya.ru/';

console.log(validateURL(ex1));
console.log(validateURL(ex2));
console.log(validateURL(ex3));
