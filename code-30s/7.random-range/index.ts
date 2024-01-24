const randomNumberInRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

const randomIntegerInRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

for (let i = 0; i < 20; i++) {
  const a = randomNumberInRange(2, 10)
  console.log(a >= 2 && a < 10, a)
  const b = randomNumberInRange(i, 10)
  console.log(b >= i && b < 10, b)
}

for (let i = 0; i < 40; i++) {
  const a = randomIntegerInRange(2, 4)
  console.log(a >= 2 && a <= 10, a)
  const b = randomIntegerInRange(i, 40)
  console.log(b >= i && b <= 40, b)
}
