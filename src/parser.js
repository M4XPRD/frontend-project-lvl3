import axios from 'axios';

const parseURL = (url) => axios
  .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
  .then((responce) => responce.data.contents)
  .catch((err) => {
    throw new Error(err);
  });

// const parseRSS = (url, state) => {
//   parseURL(url).then((data) => {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(data, 'application/xml');
//     console.log(doc);
//     const feedsTitle = doc.querySelector('title');
//     const feedsDescription = doc.querySelector('description');
//     const loadedFeeds = {
//       feedsTitle, feedsDescription,
//     };
//     const posts = doc.querySelectorAll('item');
//     const loadedPosts = [...posts].map((item) => {
//       const postTitle = item.querySelector('title');
//       const postDescription = item.querySelector('description');
//       const postLink = item.querySelector('link');
//       return { postTitle, postDescription, postLink };
//     });
//     const isParseError = doc.querySelector('parsererror') ? 'parser error' : 'loading RSS';
//     state.processState = isParseError;

//     console.log(loadedFeeds);
//     console.log(loadedPosts);

//     return { loadedFeeds, loadedPosts };
//   });
// };

const parseRSS = (url, state) => {
  parseURL(url).then((data) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'application/xml');
    console.log(doc);
    const feedsTitle = doc.querySelector('title');
    const feedsDescription = doc.querySelector('description');
    const isParseError = doc.querySelector('parsererror') ? 'parser error' : 'loading RSS';
    state.feeds.unshift(feedsTitle, feedsDescription);
    const posts = doc.querySelectorAll('item');
    posts.forEach((item) => {
      state.posts.push(item);
    });
    state.processState = isParseError;
  });
};

export { parseURL, parseRSS };
