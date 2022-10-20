import * as yup from 'yup';
import onChange from 'on-change';
import _ from 'lodash';
import i18next from 'i18next';
import { renderFeed, renderLanguage } from './view.js';
import resources from './locales/index.js';

export default async () => {
  const defaultLanguage = 'ru';
  const i18n = i18next.createInstance();
  i18n.init({
    lng: defaultLanguage,
    debug: true,
    resources,
  }).then(() => {
    yup.setLocale({
      mixed: {
        default: i18n.t('invalid.defaultMessage'),
      },
      string: {
        url: i18n.t('invalid.nonvalidURL'),
      },
    });

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

    const elements = {
      form: document.querySelector('.rss-form'),
      input: document.querySelector('#url-input'),
      feedback: document.querySelector('.feedback'),
      feed: document.querySelector('.posts'),
      languageButtons: document.querySelectorAll('[data-lng]'),
      interface: {
        title: document.querySelector('h1'),
        subtitle: document.querySelector('.lead'),
        inputPlaceholder: document.querySelector('[data-label]'),
        buttonText: document.querySelector('[data-button]'),
        example: document.querySelector('[data-example]'),
        hexlet: document.querySelector('[data-hexlet'),
      },
    };

    const state = {
      lng: defaultLanguage,
      valid: true,
      field: {
        url: '',
      },
      rssFeed: [],
      errors: [],
    };

    const watchedState = onChange(state, (path, value, previousValue) => {
      switch (path) {
        case 'valid':
          // renderFeed(elements, watchedState, i18n);
          break;
        case 'lng':
          i18n.changeLanguage(value);
          renderLanguage(elements, value, previousValue, i18n);
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
      } else {
        watchedState.valid = _.isEmpty(watchedState.errors);
      }
      renderFeed(elements, watchedState, i18n);
    });
    elements.languageButtons.forEach((button) => {
      button.addEventListener('click', () => {
        watchedState.lng = button.dataset.lng;
      });
    });
  });
};
