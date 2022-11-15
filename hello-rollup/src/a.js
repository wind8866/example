import lodash from 'lodash'

function a (text) {
  const obj = { a: 12 }
  const clone = lodash.clone(obj)
  clone.a = 14
  console.log(obj, clone, text)
}
export default a
