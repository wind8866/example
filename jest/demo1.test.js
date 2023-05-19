test('null', () => {
  const n = null
  expect(n).toBeNull()
  expect(n).toBeDefined()
  expect(n).not.toBeUndefined()
  expect(n).not.toBeTruthy()
  expect(n).toBeFalsy()
})

test('zero', () => {
  const z = 0
  expect(z).not.toBeNull()
  expect(z).toBeDefined()
  expect(z).not.toBeUndefined()
  expect(z).not.toBeTruthy()
  expect(z).toBeFalsy()
})
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/)
})

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/)
})

function compileAndroidCode() {
  throw new Error('you are using the wrong JDK!')
}

test('compiling android goes as expected', () => {
  expect(() => compileAndroidCode()).toThrow()
  expect(() => compileAndroidCode()).toThrow(Error)

  // You can also use a string that must be contained in the error message or a regexp
  expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK!')
  expect(() => compileAndroidCode()).toThrow(/JDK/)

  // Or you can match an exact error message using a regexp like below
  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK!$/) // Test fails
  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK!$/) // Test pass
})

test('resolves to lemon', () => {
  // make sure to add a return statement
  return expect((() => Promise.resolve('lemon'))()).resolves.toBe('lemon')
})

function fetchData() {
  return Promise.reject('server error')
}
test('the fetch fails with an error', () => {
  // TODO: 干嘛的？
  // expect.assertions(1)
  return fetchData().catch((e) => expect(e).toMatch('error'))
})

// 测试异步代码 https://jestjs.io/docs/asynchronous#callbacks
// 返回Promise的函数调用且使用then或catch接收参数进行断言
// 也可使用async await
// TODO: 异步 callback 使用 done();
//也可使用 .resolves或.rejects 但是结果必须使用return
