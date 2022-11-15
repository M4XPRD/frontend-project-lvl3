// import _ from 'lodash';
// import * as yup from 'yup';

// yup.setLocale({
//   mixed: {
//     notOneOf: 'DUPLICATION ERROR',
//   },
//   string: {
//     url: 'URL ERROR',
//   },
// });

// const validateURL = (url, watchedState) => {
//   const schema = yup
//     .string()
//     .url()
//     .notOneOf(watchedState.rssFeedLinks)
//     .required();

//   try {
//     schema.validateSync(url);
//     watchedState.valid = true;
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// const watchedState = {
//   errors: [],
//   valid: '',
//   rssFeedLinks: ['http://ya.ru/'],
// };

// const url1 = 'http://ya/ru';

// validateURL(url1, watchedState);

// console.log(watchedState.errors);

// const test = {
//   errors: '',
// };

// test.errors = ['test1'];
// test.errors = ['test2'];

// console.log(test);

// let error = [];

// try {
//   const num = 1;
//   if (num === 1) {
//     throw new Error();
//   }
// } catch (err) {
//   error = 'wtf';
// }

// console.log(error);

// const err = '';
// const err2 = [];
// const err3 = 'hi';
// const err4 = [1];

// console.log(_.isEmpty(err));
// console.log(_.isEmpty(err2));
// console.log(_.isEmpty(err3));
// console.log(_.isEmpty(err4));

// try {
//   try {
//     const num = 1;
//     num + word;
//   } catch (err) {
//     throw new Error('wtf');
//   }
// } catch (err) {
//   console.log(err.name);
// }

// const test1 = _.uniqueId();
// const test2 = _.uniqueId();
// const test3 = _.uniqueId();
// const test4 = _.uniqueId();
// const test5 = _.uniqueId();

// console.log(test1);
// console.log(test2);
// console.log(test3);
// console.log(test4);
// console.log(test5);
