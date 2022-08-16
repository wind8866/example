// #️⃣我们需要一个 pick 函数，这个函数可以从对象上取出指定的属性
// 索引类型查询操作符keyof: 获取属性名对应的属性值类型的需求
// 索引访问操作符: T[K]
const user = {
  username: 'Jessica Lee',
  id: 460000201904141743,
  token: '460000201904141743',
  avatar: 'http://dummyimage.com/200x200',
  role: 'vip',
}

type pickType = <T, U extends keyof T>(obj: T, keys: U[]) => T[U][]
const pick: pickType = (obj, keys) => {
  return keys.map((key) => {
    return obj[key]
  })
}
const res = pick(user, ['id', 'username']) // [ '460000201904141743' ]

// #️⃣我们有一个User接口，现在有一个需求是把User接口中的成员全部变成可选的，我们应该怎么做
interface User110 {
  username: string
  id: number
}
// type UserPartial = Partial<User>
// T 不是泛型类型：type Partial2 = <T>(obj: T) => { [K in keyof T]?: T[K] }
type Partial2<T> = (obj: T) => { [K in keyof T]?: T[K] }
type userPartial = Partial2<User110>

// #️⃣我们要找出T类型中U不包含的部分 => 主体是U => 不兼容U的
// 条件类型
// 兼容
// 分布式有条件类型

type Diff<T, U> = (a: T, b: U) => T extends U ? never : T
type R = Diff<'a' | 'b' | 'c' | 'd', 'a' | 'c' | 'f'> // "b" | "d"

// Filter<T, U> 类似于js数组的 filter
type Filter<T, U> = (a: T, b: U) => T extends U ? T : never
type R1 = Filter<string | number | (() => void), Function>

// NonNullable<T> 剔除 null和undefined
type NonNullable2<T> = (value: T) => T extends null | undefined ? never : T
type R2 = NonNullable2<string | number | undefined> // string | number

// #️⃣现在需要编写一个工具类型将interface中函数类型的名称取出来,在这个题目示例中,应该取出的是:
interface Part {
  id: number
  name: string
  subparts: Part[]
  updatePart(newName: string): void
}
type FunctionPropertyNames<T> = (value: T) => {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]
type RC = FunctionPropertyNames<Part>

// TODO: 分不清 in 和 keyof 什么时候用
// 包含继承分不清楚

// #️⃣取出下面的可选类型
interface People {
  id: string
  name: string
  age?: number
  from?: string
}

type Required2<T> = (a: T) => {
  [K in keyof T]-?: undefined extends T[K] ? K : never
}[keyof T]
type PeopleRequire = Required2<People>

// #️⃣ReturnType 获取函数的返回类型
// infer关键字: 推断类型
interface User2 {
  id: number
  name: string
  form?: string
}

type Foo = () => User2

type ReturnType2<T extends Function> = T extends (...params: any[]) => infer P
  ? P
  : never

type R3 = ReturnType2<Foo> // User

// #️⃣DeepPartial
type DeepPartial<T> = {
  [K in keyof T]?: K extends Object ? DeepPartial<T[K]> : T[K]
}

interface Tree {
  a: {
    b: string
    c?: string
  }
  d: number
}
type TreePartial = DeepPartial<Tree>

const treePartial: TreePartial = {
  a: {},
}

// #️⃣Omit Omit<T, K>的作用是忽略T中的某些属性.

// Exclude, 这里好像谁继承谁都可以，因为会求笛卡尔积
type Exclude2<T, K> = T extends K ? never : T
type Exclude3<T, K> = K extends T ? never : T

type test2 = Exclude2<'a' | 'b', 'a'>
type test3 = Exclude2<'a' | 'b', 'a'>

// 从 keyof T 中剔除 K
type Omit2<T, K extends keyof T> = {
  [k in Exclude2<keyof T, K>]: T[k]
}
interface omitTest {
  a: string
  b?: string
  c: number
  d?: number
}
type omitTest2 = Omit2<omitTest, 'a' | 'b'>

// #️⃣Merge
type O1 = {
  name: string
  id: boolean
}
type O2 = {
  id: number
  from: string
}
// 1、类型没有merge
type Merge<T, P> = {
  [key in keyof T | keyof P]: key extends keyof T
    ? T[key]
    : key extends keyof P
    ? P[key]
    : never
}
type R4 = Merge<O1, O2>

// 2、类型merge了
// 书中只实现了第二种方法
type Merge2<T, P> = {
  [key in keyof T | keyof P]: key extends keyof T & keyof P
    ? T[key] | P[key] // 交集的value取并集
    : key extends keyof T
    ? T[key]
    : key extends keyof P
    ? P[key]
    : never
}
type R5 = Merge2<O1, O2>

// 3、抽象其他工具简化
// Merge<O1, O2> = Compute<A> + Omit<U, T>
type Compute<T, P> = T & P
type Merge3<T, P> = {
  [key in keyof T | keyof P]: key extends keyof T & keyof P
    ? T[key] | P[key] // 交集的value取并集
    : key extends keyof T
    ? T[key]
    : key extends keyof P
    ? P[key]
    : never
}

// #️⃣Intersection<T, U>的作用是取T的属性,此属性同样也存在与U
type Intersection<T, U> = {
  [K in keyof T & keyof U]: T[K]
}
type Props = { name: string; age: number; visible: boolean }
type DefaultProps = { age: '10'; sex: 'man' | 'woman' }
type test5 = Intersection<Props, DefaultProps>

// #️⃣Overwrite<T, U> 是用U的属性覆盖T的相同属性.
type Overwrite<T, U> = {
  [K in keyof T]: K extends keyof U ? U[K] : T[K]
}
type test6 = Overwrite<Props, DefaultProps>

// Mutable 将 T 的所有属性的 readonly 移除
type Mutable<T> = {
  -readonly [K in keyof T]: T[K]
}
