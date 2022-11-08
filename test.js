import _ from 'lodash';

const newPosts = [{ test: 1 }, { test: 2 }, { test: 3 }, { test: 4 }];
const oldPosts = [{ test: 1 }, { test: 2 }, { test: 3 }];

const result = _.differenceBy(newPosts, oldPosts, 'test');

console.log(result);
