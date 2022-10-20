const renderInvalidFrame = (elements) => {
  elements.input.classList.add('is-invalid');
  elements.feedback.classList.replace('text-success', 'text-danger');
};

const renderValidFrame = (elements) => {
  elements.input.classList.remove('is-invalid');
  elements.feedback.classList.replace('text-danger', 'text-success');
};

const renderFeed = (elements, state, i18n) => {
  if (state.rssFeed.includes(state.field.url)) {
    elements.feedback.textContent = i18n.t('validation.invalid.duplicate');
    renderInvalidFrame(elements);
  } else if (!state.valid && !state.rssFeed.includes(state.field.url)) {
    elements.feedback.textContent = i18n.t('validation.invalid.nonvalidURL');
    renderInvalidFrame(elements);
  } else {
    state.rssFeed.push(state.field.url);
    elements.feedback.textContent = i18n.t('validation.valid.success');
    renderValidFrame(elements);
    elements.form.reset();
    elements.input.focus();
  }
};

const render = () => {};

export { renderFeed, render };
