import * as yup from 'yup';
import onChange from 'on-change';
import _ from 'lodash';
import {
  renderFeed,
} from './view.js';

const validateURL = (url, watchedState) => {
  const schema = yup.string().url().required();
  try {
    schema.notOneOf(watchedState.rssFeed).validateSync(url, { abortEarly: false });
    return true;
  } catch (error) {
    watchedState.errors.push(error.name);
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
    field: {
      url: '',
    },
    rssFeed: [],
    errors: [],
  };

  const watchedState = onChange(state, (path) => {
    switch (path) {
      case 'rssFeed':
        renderFeed(elements, watchedState);
        break;
      default:
        break;
    }
  });

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const currentUrl = data.get('url').trim();
    watchedState.field.url = currentUrl;
    if (validateURL(currentUrl, watchedState)) {
      watchedState.valid = true;
      renderFeed(elements, watchedState);
    } else {
      watchedState.valid = _.isEmpty(watchedState.errors);
      renderFeed(elements, watchedState);
    }
  });
};
