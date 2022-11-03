import axios from 'axios';

const parseURL = (url) => axios
  .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
  .then((responce) => responce.data.contents)
  .catch((err) => {
    throw new Error(err);
  });

const parseRSS = (data) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'application/xml');
  // console.log(doc);
  const feedsTitle = doc.querySelector('title');
  const feedsDescription = doc.querySelector('description');
  const loadedFeeds = {
    feedsTitle, feedsDescription,
  };
  const posts = doc.querySelectorAll('item');
  const arrayOfPosts = [...posts];
  const loadedPosts = [...posts].map((item) => {
    const postTitle = item.querySelector('title');
    const postDescription = item.querySelector('description');
    const postLink = item.querySelector('link');
    return { postTitle, postDescription, postLink };
  });
  const isParseError = doc.querySelector('parsererror') ? 'parser error' : 'start to render';

  return {
    loadedFeeds, loadedPosts, isParseError, arrayOfPosts,
  };
};

export { parseURL, parseRSS };
