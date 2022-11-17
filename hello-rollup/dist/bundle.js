import lodash from 'lodash';

function a(text) {
    const obj = { a: 12 };
    const clone = lodash.clone(obj);
    clone.a = 14;
    console.log(obj, clone, text);
}

/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
}

if (isObject({})) {
    console.log('object');
}
console.log(lodash.VERSION);
a('main2');
console.log(undefined);
{
    document.title = '🚧 ' + document.title;
}
const res = {
    list: ['a'],
    sum: 25
};
console.log(res);
