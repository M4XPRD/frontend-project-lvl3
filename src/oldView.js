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
    renderFrame(elements, state);
  } else if (!state.valid && !state.rssFeed.includes(state.field.url)) {
    // const [error] = state.errors;
    // elements.feedback.textContent = error;
    elements.feedback.textContent = i18n.t('validation.invalid.nonvalidURL');
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

const renderLanguage = (elements, value, previousValue, i18n) => {
  const currentLangButton = document.querySelector(`[data-lng="${previousValue}"]`);
  currentLangButton.classList.replace('btn-primary', 'btn-outline-primary');
  const activeLangButton = document.querySelector(`[data-lng="${value}"]`);
  activeLangButton.classList.replace('btn-outline-primary', 'btn-primary');
  elements.interface.title.textContent = i18n.t('interface.title');
  elements.interface.subtitle.textContent = i18n.t('interface.subtitle');
  elements.interface.inputPlaceholder.textContent = i18n.t('interface.placeholder');
  elements.interface.buttonText.textContent = i18n.t('interface.button');
  elements.interface.example.textContent = i18n.t('interface.example');
  elements.interface.hexlet.textContent = i18n.t('interface.hexlet');
};

export { renderFeed, renderLanguage };
