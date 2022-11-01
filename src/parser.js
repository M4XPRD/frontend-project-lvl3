import axios from 'axios';

const parseURL = (url) => axios
  .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
  .then((responce) => responce.data.contents)
  .catch((err) => {
    throw new Error(err);
  });

const parseRSS = (url, state) => {
  parseURL(url).then((data) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'application/xml');
    console.log(doc);
    const feedsTitle = doc.querySelector('title');
    const feedsDescription = doc.querySelector('description');
    const isParseError = doc.querySelector('parsererror') ? 'parser error' : 'continue loading';
    state.feeds.push(feedsTitle, feedsDescription);
    const posts = doc.querySelectorAll('item');
    posts.forEach((item) => {
      state.posts.push(item);
    });
    state.processState = isParseError;
  });
};

export { parseURL, parseRSS };
