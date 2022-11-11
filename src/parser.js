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
  const isParseError = doc.querySelector('parsererror') ? 'parser error' : 'continue render';
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

const loadFeed = (url, watchedState) => {
  parseURL(url).then((responce) => {
    const parserErrorCheck = parseRSS(responce).isParseError;
    const feeds = parseRSS(responce).loadedFeeds;
    const posts = parseRSS(responce).loadedPosts;
    posts.forEach((post) => {
      post.postID = watchedState.idCounter;
      watchedState.idCounter += 1;
    });
    watchedState.processState = parserErrorCheck;
    watchedState.parsedFeeds.push(feeds);
    watchedState.parsedPosts.push(...posts);
  });
};

export { parseURL, parseRSS, loadFeed };
