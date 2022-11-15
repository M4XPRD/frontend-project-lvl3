/* eslint-disable max-len */
// import _ from 'lodash';
// import { parseURL, parseRSS } from './parser.js';

// const renderFrame = (elements, state) => {
//   switch (true) {
//     case !state.valid:
//       elements.input.classList.add('is-invalid');
//       elements.feedback.classList.replace('text-success', 'text-danger');
//       break;
//     case state.processState === 'parser error':
//       elements.input.classList.remove('is-invalid');
//       elements.feedback.classList.replace('text-success', 'text-danger');
//       break;
//     default:
//       elements.input.classList.remove('is-invalid');
//       elements.feedback.classList.replace('text-danger', 'text-success');
//       break;
//   }
// };

// const renderInput = (elements, state, i18n) => {
//   switch (true) {
//     case (state.valid && state.processState === 'parser error'):
//       elements.feedback.textContent = i18n.t('validation.invalid.noRSS');
//       elements.feedback.setAttribute('data-link-message', 'validation.invalid.noRSS');
//       renderFrame(elements, state);
//       break;
//     case (!state.valid && !state.rssFeedLinks.includes(state.field.url)):
//       elements.feedback.textContent = i18n.t(`${state.errors}`);
//       elements.feedback.setAttribute('data-link-message', `${state.errors}`);
//       renderFrame(elements, state);
//       state.processState = 'invalid link error';
//       break;
//     case (!state.valid && state.rssFeedLinks.includes(state.field.url)):
//       elements.feedback.textContent = i18n.t('validation.invalid.duplicate');
//       elements.feedback.setAttribute('data-link-message', 'validation.invalid.duplicate');
//       renderFrame(elements, state);
//       state.processState = 'duplication error';
//       break;
//     default:
//       state.errors = '';
//       state.rssFeedLinks.push(state.field.url);
//       elements.feedback.textContent = i18n.t('validation.valid.success');
//       elements.feedback.setAttribute('data-link-message', 'validation.valid.success');
//       renderFrame(elements, state);
//       state.processState = 'success';
//       elements.form.reset();
//       elements.input.focus();
//       break;
//   }
// };

// const renderFeedsContainer = (elements, i18n) => {
//   elements.feeds.textContent = '';
//   const feedsCard = document.createElement('div');
//   const feedsCardBody = document.createElement('div');
//   const feedsCardTitle = document.createElement('h2');
//   const feedsListGroup = document.createElement('ul');

//   feedsCard.classList.add('card', 'border-0');
//   feedsCardBody.classList.add('card-body');
//   feedsCardTitle.classList.add('card-title', 'h4');
//   feedsListGroup.classList.add('list-group', 'border-0', 'rounded-0');

//   feedsCardTitle.textContent = i18n.t('interface.feeds');

//   feedsCardBody.append(feedsCardTitle);
//   feedsCard.append(feedsCardBody);
//   feedsCard.append(feedsListGroup);

//   elements.feeds.append(feedsCard);
// };

// const renderFeedsList = (feed) => {
//   const { feedsTitle, feedsDescription } = feed;

//   const feedsListGroupItem = document.createElement('li');
//   const feedsListGroupItemTitle = document.createElement('h3');
//   const feedsListGroupItemDescription = document.createElement('p');
//   const feedsListGroup = document.querySelector('.feeds > .card > ul');

//   feedsListGroupItem.classList.add('list-group-item', 'border-0', 'border-end-0');
//   feedsListGroupItemTitle.classList.add('h6', 'm-0');
//   feedsListGroupItemDescription.classList.add('m-0', 'small', 'text-black-50');

//   feedsListGroupItemTitle.textContent = feedsTitle.textContent;
//   feedsListGroupItemDescription.textContent = feedsDescription.textContent;

//   feedsListGroupItem.append(feedsListGroupItemTitle, feedsListGroupItemDescription);
//   feedsListGroup.append(feedsListGroupItem);
// };

// const renderFeed = (elements, state, i18n) => {
//   if (state.processState === 'success') {
//     renderFeedsContainer(elements, i18n);
//     state.parsedFeeds.forEach((feed) => {
//       renderFeedsList(feed);
//     });
//   }
// };

// const renderPostsContainer = (elements, i18n) => {
//   elements.posts.textContent = '';
//   const postsCard = document.createElement('div');
//   const postsCardBody = document.createElement('div');
//   const postsCardTitle = document.createElement('h2');
//   const postsListGroup = document.createElement('ul');

//   postsCard.classList.add('card', 'border-0');
//   postsCardBody.classList.add('card-body');
//   postsCardTitle.classList.add('card-title', 'h4');
//   postsListGroup.classList.add('list-group', 'border-0', 'rounded-0');

//   postsCardTitle.textContent = i18n.t('interface.posts');

//   postsCardBody.append(postsCardTitle);
//   postsCard.prepend(postsCardBody, postsListGroup);

//   elements.posts.prepend(postsCard);
// };

// const renderPostsList = (state, post, i18n) => {
//   const { postTitle, postLink, postID } = post;

//   const li = document.createElement('li');
//   const a = document.createElement('a');
//   const modalButton = document.createElement('button');
//   const postsListGroup = document.querySelector('.posts > .card > ul');

//   if (state.uiState.viewedLinks.includes(postLink)) {
//     a.classList.add('fw-normal', 'link-secondary');
//   } else {
//     a.classList.add('fw-bold');
//   }

//   li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
//   a.setAttribute('href', postLink);
//   a.setAttribute('data-id', postID);
//   a.setAttribute('target', '_blank');
//   a.setAttribute('rel', 'noopener noreferrer');

//   a.textContent = postTitle;

//   modalButton.classList.add('btn', 'btn-outline-primary', 'btn-sm');
//   modalButton.setAttribute('type', 'button');
//   modalButton.setAttribute('data-id', postID);
//   modalButton.setAttribute('data-bs-toggle', 'modal');
//   modalButton.setAttribute('data-bs-target', '#modal');

//   modalButton.textContent = i18n.t('interface.view');

//   li.append(a);
//   li.append(modalButton);
//   postsListGroup.append(li);
// };

// const renderPosts = (elements, state, watchedState, i18n) => {
//   if (state.processState === 'success') {
//     renderPostsContainer(elements, i18n);
//     state.parsedPosts.forEach((post) => {
//       renderPostsList(state, post, i18n);
//     });
//   }
//   watchedState.postsUpdateState = true;
// };

// const updatePosts = (elements, state, watchedState, i18n) => {
//   state.rssFeedLinks.forEach((rssLink) => {
//     parseURL(rssLink)
//       .then((responce) => {
//         const parsedData = parseRSS(responce);
//         const newPosts = _.differenceBy(parsedData.loadedPosts, state.parsedPosts, 'postTitle');
//         if (newPosts.length > 0) {
//           watchedState.parsedPosts = [...newPosts, ...state.parsedPosts];
//         }
//       }).then(setTimeout(() => { updatePosts(elements, state, watchedState, i18n); }, 5000));
//   });
// };

// const renderModals = (elements, state) => {
//   const {
//     modalTitle, modalBody, modalFullArticle,
//   } = elements.interface.modalWindow;

//   const findPost = state.parsedPosts
//     .filter(({ postLink }) => postLink === state.uiState.clickedPostLink);
//   const [{ postTitle, postDescription, postLink }] = findPost;

//   modalTitle.textContent = postTitle;
//   modalBody.textContent = postDescription;
//   modalFullArticle.href = postLink;
// };

// const renderLanguage = (elements, value, previousValue, i18n) => {
//   const previousLangButton = document.querySelector(`[data-lng="${previousValue}"]`);
//   const activeLangButton = document.querySelector(`[data-lng="${value}"]`);
//   const feedbackMessage = document.querySelector('[data-link-message]');

//   previousLangButton.classList.replace('btn-primary', 'btn-outline-primary');
//   activeLangButton.classList.replace('btn-outline-primary', 'btn-primary');

//   const feedbackMessageDataset = feedbackMessage.dataset.linkMessage;
//   elements.interface.title.textContent = i18n.t('interface.title');
//   elements.interface.subtitle.textContent = i18n.t('interface.subtitle');
//   elements.interface.inputPlaceholder.textContent = i18n.t('interface.placeholder');
//   elements.interface.buttonText.textContent = i18n.t('interface.button');
//   elements.interface.example.textContent = i18n.t('interface.example');
//   elements.interface.hexlet.textContent = i18n.t('interface.hexlet');
//   elements.feedback.textContent = i18n.t(feedbackMessageDataset);

//   const feeds = document.querySelector('.feeds > .card > .card-body > .card-title');
//   const posts = document.querySelector('.posts > .card > .card-body > .card-title');
//   feeds.textContent = i18n.t('interface.feeds');
//   posts.textContent = i18n.t('interface.posts');
//   const modalButtons = document.querySelectorAll('[data-bs-toggle="modal"]');
//   modalButtons.forEach((button) => {
//     button.textContent = i18n.t('interface.view');
//   });
//   const modalFullArticle = document.querySelector('[data-full-article]');
//   const modalCloseButton = document.querySelector('[data-close-button]');
//   modalFullArticle.textContent = i18n.t('interface.modalWindow.fullArticle');
//   modalCloseButton.textContent = i18n.t('interface.modalWindow.closeModal');
// };

// export {
//   renderInput, renderLanguage, renderPosts, renderFeed, renderModals, updatePosts,
// };