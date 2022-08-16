# HTTP 缓存

## 运行
`node main.js`启动验证

## 强制缓存阶段
`Expires: <Date>`：缓存设置过期的绝对时间 HTTP1.0，服务器可能和客户端时间有偏差
`Cache-Control: max-age=2000`：缓存过期的相对时间，优先级更高，单位秒 HTTP1.1优先级更高

当服务端返回了以上响应头的任意一个（如果没有，则进入启发式缓存阶段），客户端请求资源时会验证有没有过期，如果没有，则不会向服务端发送请求。
表现为控制台显示状态码为200，并提示`memory cache`或`disk cache`。

## 启发式缓存阶段
如果服务端没有返回强制缓存阶段的请求头，则进入启发式缓存阶段。
缓存时间 = (Date - Last-Modified) * 0.1。

如果没有Date，则使用客户端的Date
如果返回了Date且与客户端差别太大，直接忽略启发式缓存阶段（或者是启发式缓存阶段算出的缓存时间不能超过某个时间限制？）

## 协商缓存阶段
**服务端响应**
`ETag: <etag_value>`：对文件的散列运算，优先级更高
`Last-Modified: <Date>`: 最后一次修改时间

**客户端请求**
`If-None-Match: <etag_value>`：本地文件得到的散列运算值
`If-Modified-Since: <Date>`：本地文件得到的最后一次修改时间


上面的`<Date>`是我为了笔记排版`<day-name>, <day> <month> <year> <hour>:<minute>:<second> GMT`的缩写

如果强制缓存阶段过期，服务端返回了以上两个响应头的任意一个，则进入协商缓存阶段。
客户端使用之前服务端的响应值发送给服务端问一下这个资源是否过期，过期则携带新的`ETag` 与 `Last-Modified`和文件返回给客户端。如果没改，则返回304状态码告诉客户端继续使用。


--- 
文章参考
- [http缓存总结及前后端测试](https://juejin.cn/post/6861528185742295048)
- [缓存详解](https://juejin.cn/post/6844903556474994695#heading-26)

## TODD
- [ ] 之前遇到过使用nginx作为前端静态资源服务器，但是本地浏览器会缓存 index.html，今天测试没有缓存，使用nginx复现该问题
- [ ] 如过服务端设置了`Cache-Control: no-cache, must-revalidate, proxy-revalidate, max-age=0`，则不会进入启发式缓存阶段，强制缓存阶段呢？待验证
- [ ] [MDN HTTP 缓存](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching)


