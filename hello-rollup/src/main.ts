import lodash from 'lodash'
import aFun from './a'

console.log(lodash.VERSION)
aFun('main2')

interface Response {
  list: string[]
  sum: number
}
const res: Response = {
  list: ['a'],
  sum: 24
}
console.log(res)
