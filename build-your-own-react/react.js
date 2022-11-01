function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === "object"
          ? child
          : createTextElement(child)
      ),
    },
  }
}
function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  }
}

function render(element, container) {
  const dom = element.type == "TEXT_ELEMENT" ?
    document.createTextNode("") :
    document.createElement(element.type)

  const isProperty = key => key !== "children"
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name]
    })
  element.props.children.forEach(child => {
    render(child, dom)
  })
  container.appendChild(dom)
}
const Didact = {
  createElement,
  render,
}
const element = Didact.createElement(
  "div",
  { id: "foo" },
  Didact.createElement("a", null, "bar"),
  Didact.createElement("b")
)
/** @jsx Didact.createElement */
// const element = (
//   <div id="foo">
//     <a>bar</a>
//     <b />
//   </div>
// )
const container = document.getElementById("root")
Didact.render(element, container)


let nextUnitOfWork = null // 当前等待执行的工作单元
function workLoop(deadline) {
  let shouldYield = false // 是否有同步执行任务
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)// 执行工作单元
    shouldYield = deadline.timeRemaining() < 1 // 时间线上的任务剩余时间小于1，认为有同步执行的任务
  }
  requestIdleCallback(workLoop)// 任务队列为空 || 有同步任务时 推迟到下一浏览器空闲时执行
}
requestIdleCallback(workLoop)// React中使用scheduler package
function performUnitOfWork(nextUnitOfWork) {
  // TODO return nextUnitOfWork
}