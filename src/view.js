/* eslint-disable no-param-reassign */
const messages = {
  valid: {
    success: 'RSS успешно загружен',
  },
  invalid: {
    nonvalidURL: 'Ссылка должна быть валидным URL',
    // noRSS: 'Ресурс не содержит валидный RSS',
    duplicate: 'RSS уже существует',
  },
};

const renderFeed = (elements, state) => {
  if (state.rssFeed.includes(state.field.url)) {
    elements.feedback.textContent = messages.invalid.duplicate;
    elements.input.classList.add('is-invalid');
    elements.feedback.classList.replace('text-success', 'text-danger');
  } else if (!state.valid && !state.rssFeed.includes(state.field.url)) {
    elements.feedback.textContent = messages.invalid.nonvalidURL;
    elements.input.classList.add('is-invalid');
    elements.feedback.classList.replace('text-success', 'text-danger');
  } else {
    state.rssFeed.push(state.field.url);
    elements.feedback.textContent = messages.valid.success;
    elements.input.classList.remove('is-invalid');
    elements.feedback.classList.replace('text-danger', 'text-success');
    elements.form.reset();
    elements.input.focus();
  }
};

const render = () => {};

export { renderFeed, render };
