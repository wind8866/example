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
  commitWork(wipRoot.child)
  currentRoot = wipRoot
  wipRoot = null
}

function commitWork(fiber) {
  if (!fiber) {
    return
  }
  const domParent = fiber.parent.dom
  domParent.appendChild(fiber.dom)
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}


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




let nextUnitOfWork = null // 当前等待执行的工作单元
let wipRoot = null // 待处理的Fiber
let currentRoot = null // 最后一次渲染的Fiber
const Didact = {
  createElement,
  render,
}
requestIdleCallback(workLoop)// 循环事件入口

// render 入口函数
function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    },
    alternate: currentRoot,// 📌现在还没用到
  }
  nextUnitOfWork = wipRoot// 设置dom树，触发循环任务
}

// 根据输入的参数创建dom树
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

// 递归调用，循环接收并执行任务
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













// 模拟调用
function main () {
  const element = Didact.createElement(
    "div",
    { id: "foo" },
    Didact.createElement("a", null, "bar"),
    Didact.createElement("b")
  )
  const container = document.getElementById("root")
  Didact.render(element, container)
}
main()
