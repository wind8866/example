// 参考：https://chuyao.github.io/2017/07/11/simple-api-server-with-nodejs/
// TODO：这里说只有使用了ETag才会缓存到硬盘，等待验证。https://juejin.cn/post/6844903613790175240#heading-3
// 根据请求资源类型设置不同的缓存，如index始终到服务端验证、而其他资源都使用缓存

const express = require('express')
const app = express()

// 删除默认的Etag
app.set('etag', false)

let count = 0
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>header</h1>
  <a href="/next.html">next<a/>
  <script>setInterval(() => console.log(+Date.now()), 1000)</script>
  <script src="main.js"></script>
</body>
</html>
`

const headers = [
  // 客户端比服务端快许多
  // ['Expires', (() => new Date(Date.now() + 10 * 1000).toUTCString())()],

  // max-age 优先级高于 Expires
  // ['Cache-Control', 'max-age=1'],

  // 自己写Etag
  // ['ETag', () => 'aaa'],
  // ['ETag', () => Math.random() >= 0.5 ? '1' : '2'],

  // 个人认为如果请求头响应时间与客户端差别太大，会忽略掉启发式缓存
  // ['Date', 'Sun, 18 Jul 2021 11:06:00 GMT'],
  // ['Last-Modified', 'Sun, 18 Jul 2021 11:00:00 GMT'],

  // 启发式缓存会持续大约20秒
  ['Last-Modified', () => new Date(Date.now() - 200 * 1000).toUTCString()],

  ['Cache-Control', 'no-cache'], // , must-revalidate
]

app.get('/main.js', (req, res) => {
  console.log(++count)
  console.log(+Date.now())
  for (const [key, val] of headers) {
    let value = val
    if (typeof val === 'function') value = val()
    res.header(key, value)
  }
  res.header('content-type', 'application/javascript; charset=utf-8')
  res.send(`console.log('main')`)
})
app.get('/default.html', (req, res) => {
  for (const [key, val] of headers) {
    let value = val
    if (typeof val === 'function') value = val()
    res.header(key, value)
  }
  res.send(html)
})
app.get('/next.html', (req, res) => {
  for (const [key, val] of headers) {
    let value = val
    if (typeof val === 'function') value = val()
    res.header(key, value)
  }
  res.send(html)
})

// 启动服务
const port = 2333
app.listen(port, function () {
  console.log(`启动成功，请访问 http://127.0.0.1:${port}`)
})
