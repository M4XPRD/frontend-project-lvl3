/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
import * as yup from 'yup';
import _ from 'lodash';
import onChange from 'on-change';

// const render = (state) => state.test += 1;

// const state = {
//   valid: true,
//   test: 0,
// };

// const watchedState = onChange(state, (path) => {
//   if (path === 'valid') {
//     render(state);
//   }
// });

// watchedState.valid = false;
// watchedState.valid = true;
// console.log(state);

yup.setLocale({
  mixed: {
    default: 'default',
  },
  string: {
    url: 'invalid link',
  },
});

const errors = [];

const validateURL = (url) => {
  const schema = yup.string().url().required();
  try {
    schema.notOneOf(['https://ya.ru/']).validateSync(url, { abortEarly: false });
    console.log('success');
    return true;
  } catch (error) {
    console.log(error.errors);
    return false;
  }
};

validateURL('htt');

validateURL('https://ya.ru/');

validateURL('https://ya.rssssu/');

// console.log(errors);

// setLocale({

//   string: {
//     min: 'Wtf dude lol 2',
//   },
// });

// // now use Yup schemas AFTER you defined your custom dictionary
// const schema = yup.object().shape({
//   name: yup.string().required().min(20),
//   age: yup.number().min(18),
// });

// const test = [];

// try {
//   schema.validateSync({ name: 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww', age: 19 });
// } catch (err) {
//   console.log(err.name); // => 'ValidationError'
//   test.push(...err.errors); // => ['Deve ser maior que 18']
// }

// console.log(_.isEmpty(test));
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
