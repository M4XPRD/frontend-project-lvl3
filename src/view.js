/* eslint-disable no-param-reassign */
const renderFeed = (elements, state, i18nextInstance) => {
  if (state.rssFeed.includes(state.field.url)) {
    elements.feedback.textContent = i18nextInstance.t('invalid.duplicate');
    elements.input.classList.add('is-invalid');
    elements.feedback.classList.replace('text-success', 'text-danger');
  } else if (!state.valid && !state.rssFeed.includes(state.field.url)) {
    elements.feedback.textContent = i18nextInstance.t('invalid.nonvalidURL');
    elements.input.classList.add('is-invalid');
    elements.feedback.classList.replace('text-success', 'text-danger');
  } else {
    state.rssFeed.push(state.field.url);
    elements.feedback.textContent = i18nextInstance.t('valid.success');
    elements.input.classList.remove('is-invalid');
    elements.feedback.classList.replace('text-danger', 'text-success');
    elements.form.reset();
    elements.input.focus();
  }
};

const render = () => {};

export { renderFeed, render };
