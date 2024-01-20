const randomHexColorCode = () => {
  return (
    '#' +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, '0')
  )
}

// '#e34155'
for (let i = 0; i < 30; i++) {
  console.log(randomHexColorCode())
}
