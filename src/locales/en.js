export default {
  translation: {
    validation: {
      valid: {
        success: 'RSS uploaded successfully',
      },
      invalid: {
        defaultMessage: 'Invalid URL',
        nonvalidURL: 'The link must be a valid URL',
        noRSS: 'The resource does not contain valid RSS',
        duplicate: 'RSS already exists',
        networkError: 'Network error',
      },
    },
    interface: {
      title: 'RSS Aggregator',
      subtitle: "Start reading RSS today! It's easy, it's pretty.",
      placeholder: 'RSS link',
      example: 'Example: https://ru.hexlet.io/lessons.rss',
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
