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

//   return schema.validateSync(url);

//   // try {
//   //   schema.validateSync(url);
//   //   watchedState.valid = true;
//   // } catch (err) {
//   //   err.message = 'test error';
//   //   console.log(err.message);
//   // }
// };

// const watchedState = {
//   errors: [],
//   valid: '',
//   rssFeedLinks: ['http://ya.ru/'],
// };

// const url1 = 'http://ya.ru/';

// try {
//   validateURL(url1, watchedState);
// } catch (err) {
//   console.log(err.message);
// }

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
// import _ from 'lodash';

// try {
//   try {
//     const num = 1;
//     if (num === 2) {
//       throw new Error('num');
//     }
//   } catch (err) {
//     err.type = 'FIRST';
//     throw new Error('wtf');
//   } try {
//     num + example;
//   } catch (err) {
//     err.type = 'SECOND';
//     throw new Error('hi');
//   }
// } catch (err) {
//   console.log(err.message);
// }

try {
  try {
    const one = 1;
    if (one === 1) {
      const error = new Error('number');
      error.message = 'test completed';
      throw error;
    }
  } catch (err) {
    console.log('almost');
  }
} catch (err) {
  console.log('done!');
}

/*
if (errorNode) {
  const error = new Error(errorNode);
  error.type = 'parseError';
  throw error;
}
*/
