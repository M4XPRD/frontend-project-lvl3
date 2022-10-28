const renderFrame = (elements, state) => {
  if (!state.valid) {
    elements.input.classList.add('is-invalid');
    elements.feedback.classList.replace('text-success', 'text-danger');
  } else {
    elements.input.classList.remove('is-invalid');
    elements.feedback.classList.replace('text-danger', 'text-success');
  }
};

const renderInput = (elements, state, i18n) => {
  switch (true) {
    case (!state.valid && !state.rssFeed.includes(state.field.url)):
      elements.feedback.textContent = i18n.t(`${state.errors}`);
      elements.feedback.setAttribute('data-link-message', `${state.errors}`);
      renderFrame(elements, state);
      state.processState = 'invalid link error';
      break;
    case (!state.valid && state.rssFeed.includes(state.field.url)):
      elements.feedback.textContent = i18n.t('validation.invalid.duplicate');
      elements.feedback.setAttribute('data-link-message', 'validation.invalid.duplicate');
      renderFrame(elements, state);
      state.processState = 'duplication error';
      break;
    default:
      state.errors = '';
      state.rssFeed.push(state.field.url);
      elements.feedback.textContent = i18n.t('validation.valid.success');
      elements.feedback.setAttribute('data-link-message', 'validation.valid.success');
      renderFrame(elements, state);
      state.processState = 'success';
      elements.form.reset();
      elements.input.focus();
      break;
  }
};

const renderLanguage = (elements, value, previousValue, i18n) => {
  const previousLangButton = document.querySelector(`[data-lng="${previousValue}"]`);
  previousLangButton.classList.replace('btn-primary', 'btn-outline-primary');
  const activeLangButton = document.querySelector(`[data-lng="${value}"]`);
  activeLangButton.classList.replace('btn-outline-primary', 'btn-primary');

  const feedbackMessage = document.querySelector('[data-link-message]');
  const feedbackMessageDataset = feedbackMessage.dataset.linkMessage;
  elements.interface.title.textContent = i18n.t('interface.title');
  elements.interface.subtitle.textContent = i18n.t('interface.subtitle');
  elements.interface.inputPlaceholder.textContent = i18n.t('interface.placeholder');
  elements.interface.buttonText.textContent = i18n.t('interface.button');
  elements.interface.example.textContent = i18n.t('interface.example');
  elements.interface.hexlet.textContent = i18n.t('interface.hexlet');
  elements.feedback.textContent = i18n.t(feedbackMessageDataset);
};

export { renderInput, renderLanguage };
