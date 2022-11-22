import axios from 'axios';
import * as yup from 'yup';
import _ from 'lodash';
import onChange from 'on-change';
import i18next from 'i18next';
import resources from './locales/index.js';
import parseRSS from './parser.js';
import {
  renderFeed,
  renderPosts,
  renderLanguage, renderFeedback,
  renderModals,
  handleFormAccessibility,
  renderErrors,
} from './view.js';

const parseURL = (url) => axios
  .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
  .then((responce) => responce.data.contents);

const updatePosts = (rssLink, state, watchedState, i18n) => {
  parseURL(rssLink)
    .then((responce) => {
      const parsedData = parseRSS(responce);
      const newPosts = _.differenceBy(parsedData.loadedPosts, state.parsedPosts, 'postTitle');
      if (newPosts.length > 0) {
        watchedState.parsedPosts = [...newPosts, ...state.parsedPosts];
      }
    }).then(setTimeout(() => { updatePosts(rssLink, state, watchedState, i18n); }, 5000));
};

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
        notOneOf: 'Duplication Error',
      },
      string: {
        url: 'Nonvalid URL Error',
      },
    });

    const validateURL = async (url, watchedState) => {
      const schema = yup
        .string()
        .url()
        .notOneOf(watchedState.loadedURLs)
        .required();
      return schema.validate(url);
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
      loadingProcess: 'ready to load feed',
      valid: false,
      error: '',
      uiState: {
        viewedLinks: [],
        clickedPostLink: '',
      },
      loadedURLs: [],
      parsedFeeds: [],
      parsedPosts: [],
    };

    const watchedState = onChange(state, (path, value, previousValue) => {
      switch (path) {
        case 'loadingProcess':
        case 'error':
          handleFormAccessibility(elements, watchedState);
          renderErrors(state.error, state);
          renderFeedback(elements, state, i18n);
          break;
        case 'parsedFeeds':
          renderFeed(elements, state, i18n);
          break;
        case 'parsedPosts':
        case 'uiState.viewedLinks':
          renderPosts(elements, state, i18n);
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
      watchedState.loadingProcess = 'loading';
      validateURL(currentUrl, watchedState)
        .then(() => parseURL(currentUrl))
        .then((responce) => {
          const parsedResponce = parseRSS(responce);
          const feeds = parsedResponce.loadedFeeds;
          const posts = parsedResponce.loadedPosts;

          posts.forEach((post) => {
            post.postID = _.uniqueId();
          });
          watchedState.valid = true;
          watchedState.loadingProcess = 'success';
          watchedState.loadedURLs.push(currentUrl);
          watchedState.parsedFeeds.unshift(feeds);
          watchedState.parsedPosts.unshift(...posts);
          updatePosts(currentUrl, state, watchedState, i18n);
        })
        .catch((error) => {
          watchedState.valid = false;
          watchedState.loadingProcess = 'failed loading';
          renderErrors(error.message, watchedState);
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
