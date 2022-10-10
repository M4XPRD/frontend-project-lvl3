/* eslint-disable max-len */
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

// const renderInputFrame = (elements, state) => {
//   if (state.rssFeed.includes(state.field.url)) {
//     elements.input.classList.add('is-invalid');
//     elements.feedback.classList.replace('text-success', 'text-danger');
//   } else {
//     elements.feedback.classList.replace('text-danger', 'text-success');
//     elements.input.classList.remove('is-invalid');
//   }
// (state.rssFeed.includes(state.field.url)
// ? elements.input.classList.add('is-invalid') : elements.input.classList.remove('is-invalid'));
// };

const renderFeed = (elements, state) => {
  if (state.rssFeed.includes(state.field.url)) {
    elements.feedback.textContent = messages.invalid.duplicate;
    elements.input.classList.add('is-invalid');
    elements.feedback.classList.replace('text-success', 'text-danger');
  } if (!state.valid && !state.rssFeed.includes(state.field.url)) {
    elements.feedback.textContent = messages.invalid.nonvalidURL;
    elements.input.classList.remove('is-invalid');
    elements.feedback.classList.replace('text-success', 'text-danger');
  } else {
    elements.feedback.textContent = messages.valid.success;
    elements.input.classList.remove('is-invalid');
    elements.feedback.classList.replace('text-danger', 'text-success');
    elements.form.reset();
    elements.input.focus();
  }
};

// const renderFeed = (elements, state) => {
//   elements.feedback.classList.add('text-success');
//   elements.feedback.textContent = messages.valid.success;
//   elements.input.classList.remove('is-invalid');
//   elements.feedback.classList.replace('text-danger', 'text-success');
//   elements.form.reset();
//   elements.input.focus();
// };

const render = () => {};

export { renderFeed, render };

/*
После отправки данных формы, приложение должно:

1. Производить валидацию и подсвечивать красным рамку вокруг инпута, если адрес невалидный.
2. Нужно валидировать дубли. Если урл уже есть в списке фидов, то он не проходит валидацию.
3. После того как поток добавлен, форма принимает первоначальный вид (очищается инпут, устанавливается фокус).

Проверка:

1. Даётся невалидная ссылка // +
2. Валидная ссылка уже есть в фиде //
3. Даётся валидная ссылка, которой нет в фиде // +

*/
