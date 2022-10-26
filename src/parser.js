import axios from 'axios';

const parse = async (url) => {
  axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`)
    .then((responce) => responce.data)
    .catch((err) => {
      throw new Error(err);
    });
};

const render = () => {};

export { parse, render };
