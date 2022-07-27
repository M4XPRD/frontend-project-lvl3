import * as yup from 'yup';

const userSchema = yup.string().url().required();

const validation = (fields) => {
  try {
    userSchema.validateSync(fields);
    return 'This is valid';
  }
  catch (error) {
    return 'This is not valid';
  }
};

const messages = {
  valid: {
    main: 'RSS успешно загружен',
  },
  invalid: {
    invalidURL: 'Ссылка должна быть валидным URL',
    duplicate: 'RSS уже существует',
  },
};

const elements = {
  form: document.querySelector('form'),
  feedback: document.querySelector('.feedback'),
  input: document.querySelector('#url-input'),
};

export default async () => {
  const state = {
    link: '',
    status: null,
  };

  const form = document.querySelector('.rss-form');
  form.addEventListener('submit', async (e) => {
    const data = new FormData(e.target);
    const url = data.get('url');
    if (validation(url) !== 'This is valid') {
      elements.input.classList.add('is-invalid');
      elements.feedback.textContent = messages.invalid.invalidURL;
    }
  });
};
