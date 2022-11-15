import lodash from 'lodash'
import aFun from './a'
import common from './common'

console.log(lodash.VERSION)
aFun('main2')

console.log(common.name)
console.log(common.getAge())