export default (data) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'application/xml');
  const parserErrorCheck = doc.querySelector('parsererror');

  if (parserErrorCheck) {
    const error = new Error();
    error.message = 'Parser Error';
    throw error;
  }

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
    loadedFeeds, loadedPosts,
  };
};
