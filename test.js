import * as yup from 'yup';

import { setLocale } from 'yup';

setLocale({

  string: {
    min: 'Wtf dude lol 2',
  },
});

// now use Yup schemas AFTER you defined your custom dictionary
const schema = yup.object().shape({
  name: yup.string().required().min(20),
  age: yup.number().min(18),
});

try {
  schema.validateSync({ name: 'ww', age: 19 });
} catch (err) {
  console.log(err.name); // => 'ValidationError'
  console.log(...err.errors); // => ['Deve ser maior que 18']
}

// const array = ['i', 'https://ya.ru/'];

// const validateURL = (url) => {
//   const schema = yup.string().url().required();
//   try {
//     schema.notOneOf(array).validateSync(url, { abortEarly: false });
//     return true;
//   } catch (error) {
//     return 'Ссылка не содержит валидный URL';
//   }
// };

// const ex1 = 'i';
// const ex2 = 'https://ru.hexl';
// const ex3 = 'https://ya.ru/';

// console.log(validateURL(ex1));
// console.log(validateURL(ex2));
// console.log(validateURL(ex3));
