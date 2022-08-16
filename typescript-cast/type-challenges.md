简单：
- [4 - 实现Pick](https://github.com/type-challenges/type-challenges/issues/5999)
- [7 - 实现 Readonly](https://github.com/type-challenges/type-challenges/issues/6000)
- [11 - 元组转换为对象](https://github.com/type-challenges/type-challenges/issues/6001)
- [14 - 第一个元素](https://github.com/type-challenges/type-challenges/issues/6002)
- [18 - 获取元组长度](https://github.com/type-challenges/type-challenges/issues/6004)
- [43 - Exclude](https://github.com/type-challenges/type-challenges/issues/6005)
- [189 - Awaited](https://github.com/type-challenges/type-challenges/issues/6006)
- [268 - If](https://github.com/type-challenges/type-challenges/issues/6007)
- [533 - Concat](https://github.com/type-challenges/type-challenges/issues/6008)
- 898 - Includes：不会做
- [3057 - Push](https://github.com/type-challenges/type-challenges/issues/6010)
- [3060 - Unshift](https://github.com/type-challenges/type-challenges/issues/6011)
- [3312 - Parameters](https://github.com/type-challenges/type-challenges/issues/6014)
- [2 - 获取函数返回类型](https://github.com/type-challenges/type-challenges/issues/6026)

中等






```ts
// 函数参数的兼容性
type test = ((a: boolean) => void) extends ((a: true) => void) ? 1 : 2 // 1
type test2 = ((a: true) => void) extends ((a: boolean) => void) ? 1 : 2// 2
```