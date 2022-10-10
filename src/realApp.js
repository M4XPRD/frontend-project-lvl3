/* eslint-disable max-len */
import * as yup from 'yup';
import onChange from 'on-change';
// import { isEmpty } from 'lodash';
import {
  renderInputFrame,
  renderFeed,
} from './view.js';

const validateURL = (url, watchedState) => {
  const schema = yup.string('Такой ты крендель!').url('Мдааа').required();
  try {
    schema.notOneOf(watchedState.rssFeed).validateSync(url);
    return true;
  } catch (error) {
    return false;
  }
};

export default () => {
  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('#url-input'),
    feedback: document.querySelector('.feedback'),
    feed: document.querySelector('.posts'),
  };

  const state = {
    valid: true,
    fields: {
      url: '',
    },
    rssFeed: [],
    errors: [],
  };

  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'rssFeed':
        renderFeed(elements);
        break;
      case 'valid':
        renderInputFrame(elements, value);
        break;
      default:
        break;
    }
  });

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const currentUrl = data.get('url').trim();
    console.log('test');
    watchedState.fields.url = currentUrl;
    if (validateURL(currentUrl, watchedState)) {
      watchedState.rssFeed.push(currentUrl);
      watchedState.valid = true;
    } else {
      watchedState.errors.push('Error');
      watchedState.valid = false;
    }
  });

  // elements.form.addEventListener('submit', (e) => {
  //   e.preventDefault();
  //   const data = new FormData(e.target);
  //   const currentUrl = data.get('url').trim();
  //   watchedState.fields.url = currentUrl;
  //   watchedState.errors = validateURL(currentUrl, watchedState); // Выдаёт ошибку, в errors есть https://ru.hexlet.io/lessons.rss
  //   console.log(watchedState.errors);
  //   watchedState.valid = isEmpty(watchedState.errors); // valid: false
  //   if (watchedState.valid) {
  //     watchedState.rssFeed.push(currentUrl);
  //   }
  // });
};

/*
После отправки данных формы, приложение должно:

1. Производить валидацию и подсвечивать красным рамку вокруг инпута, если адрес невалидный.
2. Нужно валидировать дубли. Если урл уже есть в списке фидов, то он не проходит валидацию.
3. После того как поток добавлен, форма принимает первоначальный вид (очищается инпут, устанавливается фокус).
*/
