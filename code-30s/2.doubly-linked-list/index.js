class DoublyLinkedList {
  constructor() {
    this.nodes = []
  }

  get size() {
    return this.nodes.length
  }

  get head() {
    return this.nodes.at(0) ?? null
  }

  get tail() {
    return this.nodes.at(-1) ?? null
  }

  insertAt(index, value) {
    // splice默认自带将index值缩至数组位数范围的功能，但这里需要本函数最后两行代码可执行，所以先处理一下
    // 且insertFirst和insertLast都可以用insertAt处理
    if (index < 0) index = 0
    if (index > this.nodes.length) index = this.nodes.length
    this.nodes.splice(index, 0, {
      previous: this.nodes[index]?.previous ?? null,
      next: this.nodes[index] ?? null,
      value: value,
    })
    // 这里犯了错误，接收值不可以用??解决undefined的情况
    const newValue = this.nodes[index]
    if (newValue.previous) newValue.previous.next = newValue
    if (newValue.next) newValue.next.previous = newValue
  }

  insertFirst(value) {
    this.nodes.unshift({
      previous: null,
      next: this.nodes[0] ?? null,
      value: value,
    })
    if (this.nodes[1]) this.nodes[1].previous = this.nodes[0]
  }

  insertLast(value) {
    this.nodes.push({
      previous: this.nodes.at(-1) ?? null,
      next: null,
      value: value,
    })
    if (this.nodes.at(-2)) this.nodes.at(-2).next = this.nodes.at(-1)
  }

  getAt(index) {
    return this.nodes[index] ?? null
  }

  removeAt(index) {
    if (this.nodes[index] == null) return null
    const [target] = this.nodes.splice(index, 1)
    if (target.previous.next) target.previous.next = target.next
    return target.value
  }

  clear() {
    this.nodes = []
  }

  reverse() {
    // 双指针、链表中节点值的指针只要转变前后即可
    if (this.nodes.length === 0) return
    let l = 0
    let r = this.nodes.length - 1
    while (l <= r) {
      ;[this.nodes[r], this.nodes[l]] = [this.nodes[l], this.nodes[r]]
      const lv = this.nodes[l]
      const rv = (this.nodes[r][(lv.previous, lv.next)] = [
        lv.next,
        lv.previous,
      ])
      if (l === r) break
      ;[rv.previous, rv.next] = [rv.next, rv.previous]
      l++
      r--
    }
  }

  *[Symbol.iterator]() {
    yield* this.nodes
  }
}

const list = new DoublyLinkedList()

list.insertFirst(1)
list.insertFirst(2)
list.insertFirst(3)
list.insertLast(4)
list.insertAt(3, 5)

list.size // 5
list.head.value // 3
list.head.next.value // 2
list.tail.value // 4
list.tail.previous.value // 5
;[...list].map((e) => e.value) // [3, 2, 1, 5, 4]

list.removeAt(1) // 2
list.getAt(1).value // 1
list.head.next.value // 1
;[...list].map((e) => e.value) // [3, 1, 5, 4]

list.reverse()
;[...list].map((e) => e.value) // [4, 5, 1, 3]

list.clear()
list.size // 0
