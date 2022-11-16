import lodash from 'lodash';

function a(text) {
    const obj = { a: 12 };
    const clone = lodash.clone(obj);
    clone.a = 14;
    console.log(obj, clone, text);
}

console.log(lodash.VERSION);
a('main2');
console.log("local");
{
    document.title = '🚧 ' + document.title;
}
const res = {
    list: ['a'],
    sum: 25
};
console.log(res);
//# sourceMappingURL=main.js.map
