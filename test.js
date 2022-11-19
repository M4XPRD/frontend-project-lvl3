import * as yup from 'yup';

const coll = [{ postTitle: 'hi', postLink: 'https://ya.ru/' }, { postTitle: 'hi', postLink: 'http2' }, { postTitle: 'hi', postLink: 'http3' }];

// const res = [...coll.map(({postLink}) => postLink)];

// const schema1 = yup.string().notOneOf(coll.map(({ postLink }) => postLink));
const schema2 = yup.string().notOneOf(coll);

// try {
//   schema1.validateSync('https://ya.ru/');
//   console.log('Всё ок!');
// } catch (error) {
//   console.log('Ссылка есть в фиде');
// }

try {
  schema2.validateSync('https://ya.ru/');
  console.log('Всё ок!');
} catch (error) {
  console.log('Ссылка есть в фиде');
}
