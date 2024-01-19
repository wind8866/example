function cartesianProduct(a: unknown[], b: unknown[]) {
  return a.reduce((pre: unknown[], val) => {
    return [...pre, b.map((bv) => [val, bv])]
  }, [])
}

console.log(cartesianProduct(['x', 'y'], [1, 2]))

// [['x', 1], ['x', 2], ['y', 1], ['y', 2]]

function cartesianProduct2(a: unknown[], b: unknown[]) {
  return a.reduce(
    (pre: unknown[], val) => pre.concat(b.map((bv) => [val, bv])),
    [],
  )
}

console.log(cartesianProduct2(['x', 'y'], [1, 2]))
