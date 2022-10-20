const renderFrame = (elements, state) => {
  if (!state.valid) {
    elements.input.classList.add('is-invalid');
    elements.feedback.classList.replace('text-success', 'text-danger');
  } else {
    elements.input.classList.remove('is-invalid');
    elements.feedback.classList.replace('text-danger', 'text-success');
  }
};

const renderFeed = (elements, state, i18n) => {
  if (state.rssFeed.includes(state.field.url)) {
    elements.feedback.textContent = i18n.t('validation.invalid.duplicate');
    state.valid = false;
    renderFrame(elements, state);
  } else if (!state.valid && !state.rssFeed.includes(state.field.url)) {
    elements.feedback.textContent = i18n.t('validation.invalid.nonvalidURL');
    state.valid = false;
    renderFrame(elements, state);
  } else {
    state.valid = true;
    state.rssFeed.push(state.field.url);
    elements.feedback.textContent = i18n.t('validation.valid.success');
    renderFrame(elements, state);
    elements.form.reset();
    elements.input.focus();
  }
};

const render = () => {};

export { renderFeed, render };
