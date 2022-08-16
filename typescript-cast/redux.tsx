// https://github.com/xiaomuzhu/ts-start/blob/master/src/redux

// models/Todo.ts
export interface Todo {
  id: number
  name: string
  done: boolean
}

// constants/todo.ts
export enum ActionTodoConstants {
  ADD_TODO = 'todo/add',
  TOGGLE_TODO = 'todo/toggle',
}

// actions/todo.ts
let id = 0
const addTodo = (name: string) => ({
  payload: {
    todo: {
      done: false,
      id: id++,
      name,
    },
  },
  type: ActionTodoConstants.ADD_TODO as const,
})

type AddTodoAction = ReturnType<typeof addTodo> // 这里type没有推导成功

const toggleTodo = (id: number) => ({
  payload: id,
  type: ActionTodoConstants.TOGGLE_TODO as const,
})
export type ToggleTodoAction = ReturnType<typeof toggleTodo>

export type Action = AddTodoAction | ToggleTodoAction

// reducers/todo.ts
// 定义State的接口
export interface State {
  todos: Todo[]
}
export const initialState: State = {
  todos: [],
}
// 把之前定义的Action给action参数声明
export function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case ActionTodoConstants.ADD_TODO: {
      const todo = action.payload
      return {
        ...state,
        todos: [...state.todos, todo],
      }
    }

    case ActionTodoConstants.TOGGLE_TODO: {
      const id = action.payload
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, done: !todo.done } : todo
        ),
      }
    }

    default:
      return state
  }
}
