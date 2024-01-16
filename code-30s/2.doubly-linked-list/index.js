class DoublyLinkedList {
  constructor() {}

  get size() {}

  get head() {}

  get tail() {}

  insertAt(index, value) {}

  insertFirst(value) {}

  insertLast(value) {}

  getAt(index) {}

  removeAt(index) {}

  clear() {}

  reverse() {}

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
;[...list.map((e) => e.value)] // [3, 2, 1, 5, 4]

list.removeAt(1) // 2
list.getAt(1).value // 1
list.head.next.value // 1
;[...list.map((e) => e.value)] // [3, 1, 5, 4]

list.reverse()
;[...list.map((e) => e.value)] // [4, 5, 1, 3]

list.clear()
list.size // 0
