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

function commitRoot() {
  // TODO add nodes to dom
}

let nextUnitOfWork = null // 当前等待执行的工作单元
let wipRoot = null
function workLoop(deadline) {
  let shouldYield = false // 是否有同步执行任务
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)// 执行工作单元
    shouldYield = deadline.timeRemaining() < 1 // 时间线上的任务剩余时间小于1，认为有同步执行的任务
  }
  if (!nextUnitOfWork && wipRoot) {
    commitRoot()
  }
  requestIdleCallback(workLoop)// 任务队列为空 || 有同步任务时 推迟到下一浏览器空闲时执行
}
requestIdleCallback(workLoop)// React中使用scheduler package

function performUnitOfWork(fiber) {
  // 增加节点
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }
  

  // 创建新Fiber
  const elements = fiber.props.children
  let index = 0
  let prevSibling = null
  while (index < elements.length) {
    const element = elements[index]
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null
    }
    if (index === 0) {
      fiber.child = newFiber
    } else {
      prevSibling.sibling = newFiber
    }
    prevSibling = newFiber
    index++
  }

  // 返回下一个单元任务
  if (fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}



function createDom(fiber) {
  const dom = fiber.type == "TEXT_ELEMENT" ?
    document.createTextNode("") :
    document.createElement(fiber.type)

  const isProperty = key => key !== "children"
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = fiber.props[name]
    })
  return dom
}
function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    }
  }
  nextUnitOfWork = wipRoot
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