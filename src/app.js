import * as yup from 'yup';
import _ from 'lodash';
import onChange from 'on-change';
import i18next from 'i18next';
import {
  renderFeed, renderPosts, renderLanguage, renderInput, updatePosts, renderModals, handleButton,
} from './view.js';
import resources from './locales/index.js';
import { parseRSS, parseURL } from './parser.js';

export default () => {
  const defaultLanguage = 'ru';
  const i18n = i18next.createInstance();
  i18n.init({
    lng: defaultLanguage,
    debug: true,
    resources,
  }).then(() => {
    yup.setLocale({
      mixed: {
        notOneOf: 'validation.invalid.duplicate',
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
      title: document.querySelector('h1'),
      subtitle: document.querySelector('.lead'),
      inputPlaceholder: document.querySelector('[data-label]'),
      button: document.querySelector('[data-button]'),
      example: document.querySelector('[data-example]'),
      hexlet: document.querySelector('[data-hexlet'),
      modalWindow: {
        modalTitle: document.querySelector('.modal-title'),
        modalBody: document.querySelector('.modal-body'),
        modalFullArticle: document.querySelector('.full-article'),
        modalCloseSecondary: document.querySelector('.btn-secondary'),
        modalCloseButtons: document.querySelectorAll('[data-bs-dismiss="modal"]'),
      },
    };

    const state = {
      lng: defaultLanguage,
      processState: 'ready to load',
      valid: '',
      errors: '',
      field: {
        url: '',
      },
      uiState: {
        viewedLinks: [],
        clickedPostLink: '',
      },
      rssFeedLinks: [],
      parsedFeeds: [],
      parsedPosts: [],
      postsUpdateState: false,
    };

    const watchedState = onChange(state, (path, value, previousValue) => {
      switch (path) {
        case 'processState':
          handleButton(elements, watchedState);
          renderInput(elements, state, i18n);
          break;
        case 'parsedFeeds':
          renderFeed(elements, state, i18n);
          break;
        case 'parsedPosts':
        case 'uiState.viewedLinks':
          renderPosts(elements, state, watchedState, i18n);
          break;
        case 'postsUpdateState':
          updatePosts(elements, state, watchedState, i18n);
          break;
        case 'uiState.clickedPostLink':
          renderModals(elements, state);
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
      watchedState.processState = 'loading';
      validateURL(currentUrl, watchedState)
        .then(() => {
          parseURL(watchedState.field.url).then((responce) => {
            const parserErrorCheck = parseRSS(responce).isParseError;
            const feeds = parseRSS(responce).loadedFeeds;
            const posts = parseRSS(responce).loadedPosts;

            posts.forEach((post) => {
              post.postID = _.uniqueId();
            });
            watchedState.processState = parserErrorCheck;
            watchedState.parsedFeeds.unshift(feeds);
            watchedState.parsedPosts.unshift(...posts);
          });
        });
    });

    elements.languageButtons.forEach((languageButton) => {
      languageButton.addEventListener('click', () => {
        watchedState.lng = languageButton.dataset.lng;
      });
    });

    elements.posts.addEventListener('click', (e) => {
      const { target } = e;
      switch (target.tagName) {
        case 'A':
          watchedState.uiState.viewedLinks.push(target.href);
          break;
        case 'BUTTON':
          watchedState.uiState.viewedLinks.push(target.previousSibling.href);
          watchedState.uiState.clickedPostLink = target.previousSibling.href;
          break;
        default:
          break;
      }
    });
  });
};
