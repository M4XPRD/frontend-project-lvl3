import * as yup from 'yup';
import onChange from 'on-change';
import i18next from 'i18next';
import {
  renderFeed, renderPosts, renderLanguage, renderInput, updatePosts, renderModals,
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
      const schema = yup
        .string()
        .url()
        .notOneOf([...watchedState.rssFeedLinks])
        .required();
      return schema.validate(url)
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
        modalWindow: {
          modalBlock: document.querySelector('#modal'),
          modalTitle: document.querySelector('.modal-title'),
          modalBody: document.querySelector('.modal-body'),
          modalFullArticle: document.querySelector('.full-article'),
          modalCloseSecondary: document.querySelector('.btn-secondary'),
          modalCloseButtons: document.querySelectorAll('[data-bs-dismiss="modal"]'),
        },
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
      currentFeeds: [],
      currentPosts: [],
      idCounter: 1,
      modalID: '',
      errors: '',
    };

    const watchedState = onChange(state, (path, value, previousValue) => {
      switch (path) {
        case 'processState':
          renderInput(elements, state, i18n);
          console.log(elements.modalButtons);
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
        // case 'modalID':
        //   renderModals(elements, watchedState, i18n, id);
        //   break;
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

    elements.languageButtons.forEach((languageButton) => {
      languageButton.addEventListener('click', () => {
        watchedState.lng = languageButton.dataset.lng;
      });
    });

    elements.modalButtons.forEach((modalButton) => {
      modalButton.addEventListener('click', (e) => {
        const { id } = e.target;
        watchedState.modalID = id;
        renderModals(elements, watchedState, i18n);
      });
    });
  });
};
