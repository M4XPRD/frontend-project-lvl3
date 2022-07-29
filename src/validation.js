import * as yup from 'yup';
import onChange from 'on-change';

const schema = yup.string().url().required();

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

const addRedFrame = (input) => input.classList.add('is-invalid');

const validate = (url) => schema.validateSync(url);

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
      case (validate(url) === 'Nonvalid'):
        addRedFrame(elements.input);
        elements.feedback.textContent = messages.feedback.invalid.nonvalidURL;
        return;
      case (validate(url) === 'Valid' && rssCheck(url) === false):
        elements.feedback.textContent = messages.feedback.invalid.noRSS;
        elements.input.classList.remove('is-invalid');
        elements.feedback.classList.replace('text-success', 'text-danger');
        return;
      case (validate(url) === 'Valid' && rssCheck(url) === true && state.feed.includes(url)):
        addRedFrame(elements.input);
        elements.feedback.textContent = messages.feedback.invalid.duplicate;
        elements.input.classList.remove('is-invalid');
        elements.feedback.classList.replace('text-danger', 'text-success');
        return;
      default:
        state.feed.push(url);
        elements.feedback.textContent = messages.feedback.valid.main;
        elements.input.classList.remove('is-invalid');
        elements.feedback.classList.replace('text-danger', 'text-success');
        elements.form.reset();
    }
  });
};
