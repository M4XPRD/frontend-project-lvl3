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

const downloadFeed = (url) => axios
  .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
  .then((responce) => responce.data.contents);

const updatePosts = (state, watchedState, currentURL) => {
  const links = state.parsedFeeds.map((feed) => feed.feedsURL);
  const downloadPromises = links.map((link) => downloadFeed(link)
    .then((responce) => {
      const parsedData = parseRSS(responce, currentURL);
      const newPosts = _.differenceBy(parsedData.loadedPosts, state.parsedPosts, 'postTitle');
      if (newPosts.length > 0) {
        watchedState.parsedPosts = [...newPosts, ...state.parsedPosts];
      }
    }));
  Promise.all(downloadPromises)
    .finally(setTimeout(() => { updatePosts(state, watchedState, currentURL); }, 5000));
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

    const validateURL = async (url, parsedLinks) => {
      const schema = yup
        .string()
        .url()
        .notOneOf(parsedLinks)
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
      const currentURL = data.get('url').trim();
      watchedState.loadingProcess = 'loading';
      const parsedLinks = watchedState.parsedFeeds.map((feed) => feed.feedsURL);
      validateURL(currentURL, parsedLinks)
        .then(() => downloadFeed(currentURL))
        .then((responce) => {
          const parsedResponce = parseRSS(responce, currentURL);
          const feeds = parsedResponce.loadedFeeds;
          const posts = parsedResponce.loadedPosts;

          posts.forEach((post) => {
            post.postID = _.uniqueId();
          });
          watchedState.valid = true;
          watchedState.loadingProcess = 'success';
          watchedState.parsedFeeds.unshift(feeds);
          watchedState.parsedPosts.unshift(...posts);
          updatePosts(state, watchedState, currentURL);
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
