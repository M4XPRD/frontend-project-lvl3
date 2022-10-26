/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
// import * as yup from 'yup';
// import onChange from 'on-change';
import axios from 'axios';

const parseData = (url) => axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`)
  .then((responce) => responce).catch(() => 'Ресурс не содержит валидный RSS');

parseData('http://lorem-rss.herokuapp.com/feed').then((responce) => console.log(responce.data));

// const text = `
// <html>
//   <head>
//     <title>New Document!</title>
//   </head>
//   <body>
//     <h1 id="pageTitle">Random Text</h1>
//     <p>What's up?</p>
//   </body>
// </html>
// `;

// const parse = () => {
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(text, 'text/html');
//   const title = doc.getElementById('pageTitle').textContent;
//   console.log(title);
// };

// parse();
