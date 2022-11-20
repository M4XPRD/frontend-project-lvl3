import * as yup from 'yup';

let valid = false;

yup.setLocale({
  mixed: {
    notOneOf: 'Duplication Error',
  },
  string: {
    url: 'Nonvalid URL Error',
  },
});

const validate = (url) => {
  const schema = yup
    .string()
    .url()
    .notOneOf(['https://ya.ru/'])
    .required();

  if (schema.validateSync(url)) {
    valid = true;
  } else {
    valid = false;
  }
  return schema.validateSync(url);
  // return schema.validateSync(url);
};

validate('https://ya.ru');
// console.log(validate('https://ya.ru/'));
console.log(valid);
