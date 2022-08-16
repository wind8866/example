// 函数接受一个数组，如何把数组的长度打印出来，最后返回这个数组
// https://juejin.cn/book/6844733813021491207/section/6844733813122154504
const logArrLength: <T>(arr: T[]) => T[] = (arr) => {
  console.log(arr.length)
  return arr
}

logArrLength<string | number>(['1', 5])

// 泛型接口在使用接口时就必须声明类型
interface GetListId<T> {
  (list: { id: T }[]): T[]
}
const getListId: GetListId<number> = (list) => {
  return list.map((item) => item.id)
}

// 泛型函数在使用函数时声明类型
const getListId2: <T>(list: { id: T }[]) => T[] = (list) => {
  return list.map((item) => item.id)
}
getListId2([{ id: 1 }, { id: 2 }])

// 泛型约束
const getListId3: <T extends string>(list: { id: T }[]) => T[] = (list) => {
  return list.map((item) => item.id)
}
// getListId3([{ id: 1 }, { id: 2 }])

// 设计一个函数，这个函数接受两个参数，一个参数为对象，另一个参数为对象上的属性，我们通过这两个参数返回这个属性的值
const getValue: <T extends object, K extends keyof T>(obj: T, key: K) => any = (
  obj,
  key
) => {
  return obj[key]
}

getValue({ a: 132 }, 'a')

// object Object, {} 的区别？
let obj1: object = { a: 3 }

// obj1.a

// 交叉类型 与 子类型
interface Age {
  age: number
}
interface Name {
  name: string
}
interface User {
  age: number
  name: string
}

// 超接口
interface Animal extends Age, Name {
  legLength: number
}
let dog: Animal = {
  age: 13,
  name: '3',
  legLength: 33,
}

// 交叉(交集)类型
type Animal2 = Age & Name
const fun: <T extends Animal2>(a: T) => T = (a) => {
  console.log(a.age, a.name)

  return a
}

// 联合类型：并集

// 如果一个参数的类型是构造函数，则类型为 {new(): T}
// 类型断言 a as A
// 类型断言时可使用的方式
// 类型兼容，A 兼容 B，A是B的父级

interface Person {
  name: string
  age: number
  weight: number
}

interface Animal5 {
  name: string
  age: number
  weight: number
}

function getPersonName(p: Person) {}
const cat: Animal5 = {
  name: 'fei',
  age: 4,
  weight: 14,
}
getPersonName(cat)

// typeOf, in, instanceof, 字面量类型守卫（例如type），类型守卫函数
const returnString: (value: unknown[] | string | Error) => string = (value) => {
  if (typeof value === 'string') {
    // typeOf
    return value
  } else if (value instanceof Error) {
    // instanceof
    return value.message
  } else {
    return value.join(', ')
  }
}

interface Animal10 {
  type: 'animal'
  legLength: number
  run: () => void
}
interface Person10 {
  type: 'person'
  name: string
  run: () => void
  speak: () => void
}
function isPerson(a: Animal10 | Person10): a is Person10 {
  if (a.type === 'person') {
    return true
  }
}
const goHome: (a: Animal10 | Person10) => void = (a) => {
  // in
  if ('speak' in a) {
    a.speak()
  } else {
    console.log('mute')
  }

  // 字面量类型
  if (a.type === 'animal') {
    console.log('mute')
  } else {
    a.speak()
  }
  // 类型守卫函数
  if (isPerson(a)) {
    a.run()
  }

  // 这里只能使用共有属性
  a.run()
}

// as const 的妙用
const action = {
  type: 'update' as const,
  payload: {
    id: 10,
  },
}

const a = [1, '2']
const b = [1, '2'] as const
