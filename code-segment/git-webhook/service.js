// 监听 http 请求，将请求体json写入（现只支持json）
// 配合 git-webhook.Dockerfile 一起使用
const fs = require('node:fs')
const http = require('node:http')
const server = http.createServer((req, res) => {
  // console.log(req)
  let reqBody = ''
  req.on('data', function(chunk) {
    reqBody += chunk
  })
  req.on('end', () => {
    console.log(reqBody)
    const log = `["${req.url}", ${JSON.stringify(reqBody)}]; \n`
    fs.appendFile('./push-log.js', log, err => {
      if (err) {
        console.error(err)
        return
      }
    })
    res.end('{"success": true}')
  })
})
const port = 80
server.listen(port, () => {
  console.log(`success, open: http://127.0.0.1:${port}`)
})