function weightedAverage(arr: number[], weightedArr: number[]) {
  let sum = 0
  let scale = 0
  for (const i in arr) {
    sum += arr[i] * weightedArr[i]
    scale += weightedArr[i]
  }
  return sum / scale
}

function weightedAverageReduce(arr: number[], weightedArr: number[]) {
  const [sum, scale] = arr.reduce(
    ([sum, scale], v, index) => {
      return [sum + v * weightedArr[index], scale + weightedArr[index]]
    },
    [0, 0],
  )
  return sum / scale
}

console.log(weightedAverage([1, 2, 3], [0.6, 0.2, 0.3])) // 1.72727
console.log(weightedAverageReduce([1, 2, 3], [0.6, 0.2, 0.3])) // 1.72727
