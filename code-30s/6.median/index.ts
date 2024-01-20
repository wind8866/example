const median = (arr: number[]) => {
  const arrasc = [...arr]
  arrasc.sort((a, b) => a - b)
  const r = Math.floor(arrasc.length / 2)
  const l = arrasc.length % 2 === 0 ? r - 1 : r
  return (arrasc[l] + arrasc[r]) / 2
}

// 原来sort默认只根据unicode码位排序，即使是数字也不按照大小所以 a - b 不能省
console.log(median([5, 6, 50, 1, -5])) // 5
console.log(median([5, 6, 50, 1])) // 5.5
