export default {
  translation: {
    validation: {
      valid: {
        success: 'RSS успешно загружен',
      },
      invalid: {
        nonvalidURL: 'Ссылка должна быть валидным URL',
        noRSS: 'Ресурс не содержит валидный RSS. Попробуйте ещё раз или загрузите другую ссылку',
        duplicate: 'RSS уже существует',
        networkError: 'Ошибка сети. Проверьте ваше соединение с Интернетом',
      },
    },
    interface: {
      title: 'RSS-агрегатор',
      subtitle: 'Начните читать RSS сегодня! Это легко, это красиво.',
      placeholder: 'Ссылка RSS',
      example: 'Примеры: https://ru.hexlet.io/lessons.rss, http://lorem-rss.herokuapp.com/feed?unit=second&interval=5',
      button: 'Добавить',
      hexlet: 'создано в ',
      feeds: 'Фиды',
      posts: 'Посты',
      view: 'Просмотр',
      modalWindow: {
        fullArticle: 'Читать полностью',
        closeModal: 'Закрыть',
      },
    },
  },
};
