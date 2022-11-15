import { l as lodash } from './lodash-f4c1e262.js';

function a (text) {
  const obj = { a: 12 };
  const clone = lodash.clone(obj);
  clone.a = 14;
  console.log(obj, clone, text);
}

var common = {};

const name = 'zangsan';
const age = 18;
common.name = name;
common.getAge = function(){
    return age
};

console.log(lodash.VERSION);
a('main2');

console.log(common.name);
console.log(common.getAge());
