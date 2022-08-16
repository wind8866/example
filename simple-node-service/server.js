const fs = require('node:fs')
const http = require('node:http')

const parseProcess = (list) => {
  list = list.slice(2)
  console.log(list)
  const result = {}
  list.forEach(val => {
    const keyValue = val.split('=')
    result[keyValue[0]] = keyValue[1] ?? true
  })
  console.log(result)
  return result
}


const readFile = (path = './index.html') => {
  const stream = fs.createReadStream(path)
  let size = 0
  let content = ''
  stream.on('data', function (chunk) {
    size += chunk.length
    content += new TextDecoder().decode(chunk)
  })
  return new Promise((resolve, reject) => {
    stream.on('end', () => resolve({
      size,
      content
    }))
    stream.on('error', (e) => reject(e))
  })

}

/**
 * 功能支持
 *  参数：
 *    -p 端口号
 *  能够根据URL正确返回文件，没有文件返回404
 */
const options = parseProcess(process.argv)

const server = http.createServer((req, res) => {
  // 去相对路径，后自动步 index.html
  const path = (options.path ?? '.') + (req.url[req.url.length - 1] === '/' ? req.url + 'index.html' : req.url)
  console.log(path)
  readFile(path).then(({ size, content }) => {
    res.setHeader('Content-Length', size)
    res.end(content)
  }).catch(error => {
    console.log('error', error);
    const page404 = `<h1>404 Not found</h1><a href="/">Go Home</a>`
    res.end(page404)
  })
})
const port = options.port ?? 3800
server.listen(port, () => {
  console.log(`success, open: http://127.0.0.1:${port}`)
})