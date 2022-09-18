import onChange from 'on-change';

/* eslint-disable no-tabs */
const object = {
  text: 'Hi',
  boolean: true,
  age: 28,
};

const watchedObject = onChange(object, (path, value, previousValue) => {
  console.log('path:', path);
  console.log('value:', value);
  console.log('previousValue:', previousValue);
});

// console.log(`BEFORE: ${JSON.stringify(watchedObject)}`);

watchedObject.text = 'HELLO';

// console.log(`FINAL: ${JSON.stringify(watchedObject)}`);
