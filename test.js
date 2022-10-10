import * as yup from 'yup';
import _ from 'lodash';

const validateURL = (url) => {
  const schema = yup.string().url().required();
  try {
    schema.validateSync(url);
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

const example = 's';

console.log(_.isEmpty(example));
