function formatDuration(m: number) {
  const time = {
    // 年: Math.floor(m / 1000) % 60,
    // 月: Math.floor(m / 1000) % 60,
    周: Math.floor(m / 604800000),
    天: Math.floor(m / 86400000) % 7,
    时: Math.floor(m / 3600000) % 24,
    分: Math.floor(m / 60000) % 60,
    秒: Math.floor(m / 1000) % 60,
    毫秒: m % 1000,
  }
  return Object.keys(time)
    .map((unit) => {
      if (time[unit] === 0) return ''
      return time[unit] + unit
    })
    .filter((s) => s !== '')
    .join(' ')
}

// 除以自己单位的转换数

console.log(formatDuration(890))
console.log(formatDuration(1890))
console.log(formatDuration(11890))
console.log(formatDuration(111890))
console.log(formatDuration(1111890))
console.log(formatDuration(11111890))
console.log(formatDuration(111111890))
console.log(formatDuration(1111111890))
console.log(formatDuration(11111111890))

console.log(formatDuration(Date.now()))
console.log(formatDuration(1501343787))
console.log(
  '2024年已经过去了: ',
  formatDuration(+new Date() - +new Date('2024')),
)
console.log('2024年还剩：' + formatDuration(+new Date('2025') - +new Date()))
console.log(
  '进度：',
  (+new Date() - +new Date('2024')) / (+new Date('2025') - +new Date('2024')),
)
