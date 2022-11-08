/* eslint-disable max-len */
// /* eslint-disable max-len */
// import { parseRSS, parseURL } from './parser.js';

// // const parsedLinkData = (state) => {
// //   parseURL(state.field.url).then((responce) => {
// //     const isRSSError = parseRSS(responce).isParseError; // Идёт парсинг, в ответ строчка 'parser error' (даём невалидный URL)
// //     const feeds = parseRSS(responce).loadedFeeds;
// //     const posts = parseRSS(responce).loadedPosts;
// //     const postsNodes = parseRSS(responce).arrayOfPosts;
// //     return {
// //       isRSSError, feeds, posts, postsNodes,
// //     };
// //   });
// // };

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

// // const renderInput = (elements, state, i18n) => {
// //   state.processState = parsedLinkData(state).isRSSError; // Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'isRSSError')
// //   switch (true) { // В общем, ничего не возвращается ;(
// //     case (state.valid && state.processState === 'parser error'):
// //       elements.feedback.textContent = i18n.t('validation.invalid.noRSS');
// //       elements.feedback.setAttribute('data-link-message', 'validation.invalid.noRSS');
// //       renderFrame(elements, state);
// //       break;
// //     case (!state.valid && !state.rssFeedLinks.includes(state.field.url)):
// //       elements.feedback.textContent = i18n.t(`${state.errors}`);
// //       elements.feedback.setAttribute('data-link-message', `${state.errors}`);
// //       renderFrame(elements, state);
// //       state.processState = 'invalid link error';
// //       break;
// //     case (!state.valid && state.rssFeedLinks.includes(state.field.url)):
// //       elements.feedback.textContent = i18n.t('validation.invalid.duplicate');
// //       elements.feedback.setAttribute('data-link-message', 'validation.invalid.duplicate');
// //       renderFrame(elements, state);
// //       state.processState = 'duplication error';
// //       break;
// //     default:
// //       state.errors = '';
// //       state.rssFeedLinks.push(state.field.url);
// //       elements.feedback.textContent = i18n.t('validation.valid.success');
// //       elements.feedback.setAttribute('data-link-message', 'validation.valid.success');
// //       renderFrame(elements, state);
// //       elements.form.reset();
// //       elements.input.focus();
// //       state.processState = 'success';
// //       break;
// //   }
// // };

// const renderInput = (elements, state, i18n) => {
//   parseURL(state.field.url).then((responce) => {
//     state.processState = parseRSS(responce).isParseError;
//     switch (true) {
//       case (state.valid && state.processState === 'parser error'):
//         elements.feedback.textContent = i18n.t('validation.invalid.noRSS');
//         elements.feedback.setAttribute('data-link-message', 'validation.invalid.noRSS');
//         renderFrame(elements, state);
//         break;
//       case (!state.valid && !state.rssFeedLinks.includes(state.field.url)):
//         elements.feedback.textContent = i18n.t(`${state.errors}`);
//         elements.feedback.setAttribute('data-link-message', `${state.errors}`);
//         renderFrame(elements, state);
//         state.processState = 'invalid link error';
//         break;
//       case (!state.valid && state.rssFeedLinks.includes(state.field.url)):
//         elements.feedback.textContent = i18n.t('validation.invalid.duplicate');
//         elements.feedback.setAttribute('data-link-message', 'validation.invalid.duplicate');
//         renderFrame(elements, state);
//         state.processState = 'duplication error';
//         break;
//       default:
//         state.errors = '';
//         state.rssFeedLinks.push(state.field.url);
//         elements.feedback.textContent = i18n.t('validation.valid.success');
//         elements.feedback.setAttribute('data-link-message', 'validation.valid.success');
//         renderFrame(elements, state);
//         elements.form.reset();
//         elements.input.focus();
//         state.processState = 'success';
//         break;
//     }
//   });
// };

// const renderFeed = (elements, i18n, feedsTitle, feedsDescription) => {
//   const feedsCard = document.createElement('div');
//   feedsCard.classList.add('card', 'border-0');
//   const feedsCardBody = document.querySelector('.feeds > .card > .card-body') ?? document.createElement('div');
//   feedsCardBody.classList.add('card-body');
//   const feedsCardTitle = document.querySelector('.feeds > .card > .card-body > .card-title') ?? document.createElement('h2');
//   feedsCardTitle.classList.add('card-title', 'h4');
//   feedsCardTitle.textContent = i18n.t('interface.feeds');

//   feedsCardBody.append(feedsCardTitle);
//   feedsCard.append(feedsCardBody);

//   const feedsListGroup = document.createElement('ul');
//   feedsListGroup.classList.add('list-group', 'border-0', 'rounded-0');
//   const feedsListGroupItem = document.createElement('li');
//   feedsListGroupItem.classList.add('list-group-item', 'border-0', 'border-end-0');
//   const feedsListGroupItemTitle = document.createElement('h3');
//   feedsListGroupItemTitle.classList.add('h6', 'm-0');
//   feedsListGroupItemTitle.textContent = feedsTitle.textContent;
//   const feedsListGroupItemDescription = document.createElement('p');
//   feedsListGroupItemDescription.classList.add('m-0', 'small', 'text-black-50');
//   feedsListGroupItemDescription.textContent = feedsDescription.textContent;

//   feedsListGroup.append(feedsListGroupItem);
//   feedsCard.append(feedsListGroup);
//   feedsListGroupItem.append(feedsListGroupItemTitle);
//   feedsListGroupItem.append(feedsListGroupItemDescription);

//   feedsCard.append(feedsListGroup);

//   elements.feeds.prepend(feedsCard);
// };

// const renderPosts = (elements, state, i18n, loadedPosts) => {
//   const postsCard = document.createElement('div');
//   postsCard.classList.add('card', 'border-0');
//   const postsCardBody = document.querySelector('.posts > .card > .card-body') ?? document.createElement('div');
//   postsCardBody.classList.add('card-body');
//   const postsCardTitle = document.querySelector('.posts > .card > .card-body > .card-title') ?? document.createElement('h2');
//   postsCardTitle.classList.add('card-title', 'h4');
//   postsCardTitle.textContent = i18n.t('interface.posts');

//   postsCardBody.append(postsCardTitle);
//   postsCard.append(postsCardBody);

//   const postsListGroup = document.createElement('ul');
//   postsListGroup.classList.add('list-group', 'border-0', 'rounded-0');

//   loadedPosts.forEach((item) => {
//     const itemTitle = item.postTitle.textContent;
//     const itemLink = item.postLink.textContent;

//     const li = document.createElement('li');
//     li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
//     const a = document.createElement('a');
//     a.setAttribute('href', itemLink);
//     a.classList.add('fw-bold');
//     a.setAttribute('data-id', state.idCounter);
//     a.setAttribute('target', '_blank');
//     a.setAttribute('rel', 'noopener noreferrer');
//     a.textContent = itemTitle;

//     const modalButton = document.createElement('button');
//     modalButton.setAttribute('type', 'button');
//     modalButton.classList.add('btn', 'btn-outline-primary', 'btn-sm');
//     modalButton.setAttribute('data-id', state.idCounter);
//     modalButton.setAttribute('data-bs-toggle', 'modal');
//     modalButton.setAttribute('data-bs-target', '#modal');
//     modalButton.textContent = i18n.t('interface.view');

//     li.append(a);
//     li.append(modalButton);
//     postsListGroup.append(li);

//     state.idCounter += 1;
//   });
//   // state.currentPosts.unshift(...state.currentPosts, ...state.posts);
//   // state.posts = Object.assign([]);

//   postsCard.append(postsListGroup);
//   elements.posts.prepend(postsCard);
// };

// const renderPage = (elements, state, i18n) => {
//   parseURL(state.field.url).then((responce) => {
//     const feeds = parseRSS(responce).loadedFeeds;
//     const posts = parseRSS(responce).loadedPosts;
//     const postsNodes = parseRSS(responce).arrayOfPosts;
//     const { feedsTitle, feedsDescription } = feeds;
//     postsNodes.forEach((item) => {
//       state.posts.push(item);
//       // state.posts.unshift(item);
//     });
//     // console.log(state.posts[0].querySelector('title'));
//     renderFeed(elements, i18n, feedsTitle, feedsDescription);
//     renderPosts(elements, state, i18n, posts);
//   });
// };

// const updatePosts = (elements, state) => {
//   state.rssFeedLinks.forEach((rssLink) => {
//     parseURL(rssLink).then((responce) => {

//     });
//   });
// };

// const renderModals = () => {};

// // const updatePosts = (state) => {
// //   state.rssFeedLinks.forEach((rssLink) => {
// //     parseRSS(rssLink).then(() => {

// //     });
// //   });
// // };

// const renderLanguage = (elements, value, previousValue, i18n) => {
//   const previousLangButton = document.querySelector(`[data-lng="${previousValue}"]`);
//   previousLangButton.classList.replace('btn-primary', 'btn-outline-primary');
//   const activeLangButton = document.querySelector(`[data-lng="${value}"]`);
//   activeLangButton.classList.replace('btn-outline-primary', 'btn-primary');

//   const feedbackMessage = document.querySelector('[data-link-message]');
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
//   if (feeds && posts) {
//     feeds.textContent = i18n.t('interface.feeds');
//     posts.textContent = i18n.t('interface.posts');
//     const modalButtons = document.querySelectorAll('[data-bs-toggle="modal"]');
//     modalButtons.forEach((button) => {
//       button.textContent = i18n.t('interface.view');
//     });
//   }
// };

// export {
//   renderInput, renderLanguage, renderPage, renderModals, updatePosts,
// };
