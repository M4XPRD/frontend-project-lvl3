import axios from 'axios';

const parseURL = async (url) => {
  axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
    .then((responce) => responce.data.contents) // загружено содержимое страницы
    .catch((err) => {
      throw new Error(err);
    });
};

const parseRSS = (url) => {
  parseURL(url).then((data) => {
    const parser = new DOMParser();
    console.log(data); // undefined ???
    const doc = parser.parseFromString(url, 'application/xml');
    console.log(doc); // parseError
    // const titles = doc.querySelectorAll('title')[0]; // undefined
    // console.log(titles);
  });
  // const parser = new DOMParser();
  // const doc = parser.parseFromString(url, 'application/xml');
  // const doc = parser.parseFromString(parseURL(url), 'application/xml');
  // const doc = parser.parseFromString(url, 'application/xml');
  // const doc = parser.parseFromString(url, 'text/html');
  // const doc = parseURL(url).then((data) => parser.parseFromString(data, 'application/xml'));
};

export { parseURL, parseRSS };
