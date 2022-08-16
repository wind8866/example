// 使用类和类的实例化表示参数的类型与默认值
class SwitchProps {
  checked: boolean = true
  onChange?: (checked: boolean) => void = () => {}
  disabled?: boolean = false
}
const Switch: React.FC<SwitchProps> = (props = new SwitchProps()) => {
  const { onChange, checked } = props
  return <div onClick={() => onChange(!checked)}>Switch</div>
}

export { Switch }
