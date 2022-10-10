import * as yup from 'yup';
// import onChange from 'on-change';

const schema = yup.string().url().required();

const validateURL = (url) => {
  try {
    schema.validateSync(url);
    return 'Valid';
  } catch (error) {
    return 'Nonvalid';
  }
};

// const validateTwo = (url) => schema.validateSync(url);

const messages = {
  feedback: {
    valid: {
      main: 'RSS успешно загружен',
    },
    invalid: {
      nonvalidURL: 'Ссылка должна быть валидным URL',
      noRSS: 'Ресурс не содержит валидный RSS',
      duplicate: 'RSS уже существует',
    },
  },
};

const elements = {
  form: document.querySelector('.rss-form'),
  feedback: document.querySelector('.feedback'),
  input: document.querySelector('#url-input'),
};

const rssCheck = (url) => (String(url).indexOf('rss') !== -1);

export default async () => {
  const state = {
    feed: [],
    status: null,
  };

  elements.form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const url = data.get('url');
    switch (true) {
      case (validateURL(url) === 'Nonvalid'):
        elements.input.classList.add('is-invalid');
        elements.feedback.textContent = messages.feedback.invalid.nonvalidURL;
        return;
      case (validateURL(url) === 'Valid' && rssCheck(url) === false):
        elements.feedback.textContent = messages.feedback.invalid.noRSS;
        elements.input.classList.remove('is-invalid');
        elements.feedback.classList.replace('text-success', 'text-danger');
        return;
      case (validateURL(url) === 'Valid' && rssCheck(url) === true && state.feed.includes(url)):
        elements.feedback.textContent = messages.feedback.invalid.duplicate;
        elements.input.classList.add('is-invalid');
        elements.feedback.classList.replace('text-success', 'text-danger');
        return;
      default:
        state.feed.push(url);
        elements.feedback.textContent = messages.feedback.valid.main;
        elements.input.classList.remove('is-invalid');
        elements.feedback.classList.replace('text-danger', 'text-success');
        elements.input.focus();
        elements.form.reset();
    }
  });
};
