export default {
  translation: {
    validation: {
      valid: {
        success: 'RSS uploaded successfully',
      },
      invalid: {
        nonvalidURL: 'The link must be a valid URL',
        noRSS: 'The resource does not contain valid RSS. Try again or replace with another link',
        duplicate: 'RSS already exists',
        networkError: 'Network error',
      },
    },
    interface: {
      title: 'RSS Reader',
      subtitle: "Start reading RSS today! It's easy, it's pretty.",
      placeholder: 'RSS link',
      example: 'Example: https://ru.hexlet.io/lessons.rss, http://lorem-rss.herokuapp.com/feed?unit=second&interval=5',
      button: 'Add',
      hexlet: 'created by ',
      feeds: 'Feeds',
      posts: 'Posts',
      view: 'Preview',
      modalWindow: {
        fullArticle: 'Read full article',
        closeModal: 'Close',
      },
    },
  },
};
