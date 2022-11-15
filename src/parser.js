import axios from 'axios';

const parseURL = (url) => axios
  .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
  .then((responce) => responce.data.contents)
  .catch((error) => {
    error.message = 'network error';
  });

const parseRSS = (data) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'application/xml');
  const isParseError = doc.querySelector('parsererror');
  const feedsTitle = doc.querySelector('title');
  const feedsDescription = doc.querySelector('description');
  const loadedFeeds = {
    feedsTitle, feedsDescription,
  };
  const posts = doc.querySelectorAll('item');
  const loadedPosts = [...posts].map((item) => {
    const postTitle = item.querySelector('title').textContent;
    const postDescription = item.querySelector('description').textContent;
    const postLink = item.querySelector('link').textContent;
    return { postTitle, postDescription, postLink };
  });

  return {
    loadedFeeds, loadedPosts, isParseError,
  };
};

export { parseURL, parseRSS };
