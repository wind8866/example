import lodash from 'lodash'
import aFun from './a'
import isObject from 'isobject'

if (isObject({})) {
  console.log('object')
}

console.log(lodash.VERSION)
aFun('main2')

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV !== 'production') {
  document.title = '🚧 ' + document.title
}

interface Response {
  list: string[]
  sum: number
}
const res: Response = {
  list: ['a'],
  sum: 25
}
console.log(res)
