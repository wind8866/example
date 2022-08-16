interface Action<T> {
  payload?: T
  type: string
}

class EffectModule {
  count = 1
  message = 'hello!'

  delay(input: Promise<number>) {
    return input.then((i) => ({
      payload: `hello ${i}!`,
      type: 'delay',
    }))
  }

  setMessage(action: Action<Date>) {
    return {
      payload: action.payload!.getMilliseconds(),
      type: 'set-message',
    }
  }
}

// asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>  变成了
// asyncMethod<T, U>(input: T): Action<U>

// syncMethod<T, U>(action: Action<T>): Action<U>  变成了
// syncMethod<T, U>(action: T): Action<U>

// 修改 Connect 的类型，让 connected 的类型变成预期的类型
type Connect = (module: EffectModule) => {
  [K in keyof EffectModule]: EffectModule[K] extends (
    p: Action<infer T>
  ) => Action<infer U>
    ? (p: T) => Action<U>
    : EffectModule[K] extends (p: Promise<infer X>) => Promise<Action<infer Y>>
    ? (p: X) => Action<Y>
    : never
}

const connect: Connect = (m) => ({
  delay: (input: number) => ({
    type: 'delay',
    payload: `hello 2`,
  }),
  setMessage: (input: Date) => ({
    type: 'set-message',
    payload: input.getMilliseconds(),
  }),
})

type Connected = {
  delay(input: number): Action<string>
  setMessage(action: Date): Action<number>
}

export const connected: Connected = connect(new EffectModule())
