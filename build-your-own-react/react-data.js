
// Didact.createElement 返回
const element = {
  type: 'div',
  props: {
    id: 'foo',
    children: [
      {
        type: 'a',
        props: {
          children: createTextElement('bar')
        },
      },
      {
        type: 'b',
        props: null
      }
    ]
  },
}

// Didact.render 设置
nextUnitOfWork = {
  dom: document.getElementById("root"),
  props: {
    children: [
      {
        type: 'div',
        props: {
          id: 'foo',
          children: [
            {
              type: 'a',
              props: {
                children: createTextElement('bar')
              },
            },
            {
              type: 'b',
              props: null
            }
          ]
        },
      }
    ]
  }
}

// performUnitOfWork 生成fiber
nextUnitOfWork = {
  dom: document.getElementById("root"),
  props: {
    children: [
      {
        type: 'div',
        props: {
          id: 'foo',
          children: [
            {
              type: 'a',
              props: {
                children: createTextElement('bar')
              },
            },
            {
              type: 'b',
              props: null
            }
          ]
        },
      }
    ]
  }
}
// performUnitOfWork
const fiber = {
  dom: document.getElementById("root"),
  child: {
    type: 'div',
    props: fiber.props.children[0].props,
    parent: fiber,
    child: null,
    dom: null
  },
  props: {
    children: [
      {
        type: 'div',
        props: {
          id: 'foo',
          children: [
            {
              type: 'a',
              props: {
                children: createTextElement('bar')
              },
            },
            {
              type: 'b',
              props: null
            }
          ]
        },
      }
    ]
  },
}

