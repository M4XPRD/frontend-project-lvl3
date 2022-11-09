import * as yup from 'yup';
import onChange from 'on-change';
import i18next from 'i18next';
import {
  renderFeed, renderPosts, renderLanguage, renderInput, updatePosts,
} from './view.js';
import resources from './locales/index.js';
import { loadFeed } from './parser.js';

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
        default: 'validation.invalid.defaultMessage',
      },
      string: {
        url: 'validation.invalid.nonvalidURL',
      },
    });

    const validateURL = async (url, watchedState) => {
      const schema = yup.string().url().required();
      return schema.notOneOf(watchedState.rssFeedLinks).validate(url)
        .then(() => {
          watchedState.valid = true;
        })
        .catch((error) => {
          watchedState.errors = error.errors;
          watchedState.valid = false;
        });
    };

    const elements = {
      form: document.querySelector('.rss-form'),
      input: document.querySelector('#url-input'),
      feedback: document.querySelector('.feedback'),
      posts: document.querySelector('.posts'),
      feeds: document.querySelector('.feeds'),
      languageButtons: document.querySelectorAll('[data-lng]'),
      modalButtons: document.querySelectorAll('[data-bs-toggle="modal"]'),
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
      processState: 'ready to load',
      postsUpdateState: false,
      valid: '',
      field: {
        url: '',
      },
      rssFeedLinks: [],
      parsedFeeds: [],
      parsedPosts: [],
      newPosts: [],
      currentFeeds: [],
      currentPosts: [],
      idCounter: 1,
      errors: '',
    };

    const watchedState = onChange(state, (path, value, previousValue) => {
      switch (path) {
        case 'processState':
          renderInput(elements, state, i18n);
          break;
        case 'parsedFeeds':
          renderFeed(elements, state, i18n);
          break;
        case 'parsedPosts':
          renderPosts(elements, state, watchedState, i18n);
          break;
        case 'postsUpdateState':
          updatePosts(elements, state, watchedState, i18n);
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
      validateURL(currentUrl, watchedState)
        .then(() => loadFeed(watchedState.field.url, watchedState));
    });

    elements.languageButtons.forEach((button) => {
      button.addEventListener('click', () => {
        watchedState.lng = button.dataset.lng;
      });
    });

    // elements.modalButtons.forEach((modalButton) => {
    //   modalButton.addEventListener('click', () => {

    //   });
    // });
  });
};
