import _ from 'lodash';

const newPosts = [{ postTitle: 3, postDescription: 'hi' }, { postTitle: 1, postDescription: 'yo' }, { postTitle: 2, postDescription: 'sup' }, { postTitle: 4, postDescription: 'howdy' }, { postTitle: 1, postDescription: 'hello' }];
const oldPosts = [{ postTitle: 1, postDescription: 'wassup' }, { postTitle: 2, postDescription: 'howdy' }, { postTitle: 3, postDescription: 'heyo' }];

const result1 = _.differenceBy(newPosts, oldPosts, 'postTitle');
// const result2 = [...new Set([...newPosts])];

console.log(result1);
