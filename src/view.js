const messages = {
  feedback: {
    valid: {
      main: 'RSS успешно загружен!!!!!!',
    },
    invalid: {
      nonvalidURL: 'Ссылка должна быть валидным URL',
      noRSS: 'Ресурс не содержит валидный RSS',
      duplicate: 'RSS уже существует',
    },
  },
};

const renderInputFrame = (elements, value) => (value === false
  ? elements.input.classList.add('is-invalid') : elements.input.classList.remove('is-invalid'));

const renderFeed = (elements) => {
  elements.feedback.classList.add('text-success');
  console.log('test');
  elements.feedback.textContent = messages.feedback.valid.main;
  elements.input.classList.remove('is-invalid');
  elements.feedback.classList.replace('text-danger', 'text-success');
  elements.form.reset();
  elements.input.focus();
};

const render = () => {};

export { renderInputFrame, renderFeed, render };
