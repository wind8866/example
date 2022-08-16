// @ts-ignore
import { useRef } from 'react'
// TODO: 处理

interface ComponentProps {
  /**
   * 参数1（只有这种写法可以提示）
   */
  value: string
}
const Component: React.FC<ComponentProps> = (props) => {
  return <div></div>
}

const Main = () => {
  const divRef = useRef<HTMLDivElement>(null)

  const clickHandle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {}
  return (
    <div ref={divRef} onClick={(e) => {}}>
      <Component value="" />
    </div>
  )
}

// -----------

const todoInputDefaultProps = {
  inputSetting: {
    maxlength: 20,
    placeholder: '请输入todo',
  },
}
type Props = {
  handleSubmit: (value: unknown) => void
  children: React.ReactNode
} & Partial<typeof todoInputDefaultProps>

const TodoInput: React.FC<Props> = (props) => {
  const { handleSubmit, inputSetting } = props
  const itemText = ''
  const updateValue = () => {}

  return (
    <form onSubmit={handleSubmit}>
      <input
        maxLength={inputSetting?.maxlength}
        type="text"
        value={itemText}
        onChange={updateValue}
      />
      <button type="submit">添加todo</button>
    </form>
  )
}
TodoInput.defaultProps = todoInputDefaultProps

const isTrue = (name: string) => {
  return !!name
}
type AddTodoAction = ReturnType<typeof isTrue>

// ----------
// 或许可以父组件定义函数的时候取子组件的类型
// import ChildItem from './Child'
const Parent = () => {
  // 这里不需要重新定义 item，需要从子元素中引入就可以了
  const onChangeHandle = (item: ChildItem) => {}
  return <Child onChange={onChangeHandle} />
}

export type ChildItem = {
  id: number
  value: string
}
interface ChildProps {
  onChange: (item: ChildItem) => void
}
const Child: React.FC<ChildProps> = () => {
  return <div></div>
}
