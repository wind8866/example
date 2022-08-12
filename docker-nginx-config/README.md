# 使用 docker 与 nginx 模拟的一些 nginx 常用配置

## 说明
此 demo 使用 docker 展示 nginx 常用配置。下面是一些关键代码的功能

- server/api.conf：
  - 接口可跨域配置
  - 图片防盗链功能
  - 隐藏指定文件
- client/index.conf: <http://localhost:9000/index.html>
  - 非打包场景的HTTP缓存最优解决方案
  - 打包场景的HTTP缓存最优解决方案：在dist目录下
  - 单页应用重写到/dist/index.html，路由交给前端框架处理
- [my-app](https://gitlab.com/liuzhen1010xyz/my-app-react)
  - 使用create-react-app构建的单页应用
  - 以git submodules 的方式作为子项目加入到本项目
  - 增加了路由，配置了前端控制的404，改变了打包的目标目录

# 使用
```bash
# 本地需要安装 docker 环境

# 拉取项目
git clone https://github.com/wind8866/example.git
cd example

# 拉取子项目
git submodule init
git submodule update

# 启动项目
cd docker-nginx-config
docker-compose up --build

# 项目启动后访问 http://localhost:9000
```

## 浏览器缓存
一般浏览器缓存会经过以下3个阶段
1. **强制缓存**：根据请求头的expires和cache-control判断是否命中强缓存，是则直接从本地（内存或硬盘）读取资源，不会发请求到服务器。
2. **启发式缓存**：如果Expires，Cache-Control: max-age 都没有在响应头中出现，并且设置了Last-Modified时，那么浏览器默认会采用一个启发式的算法，即启发式缓存。通常会取响应头的Date_value - Last-Modified_value值的10%作为缓存时间。（启发式缓存是一个判断过程，只会读取本地文件不回发送请求，也可以理解为强缓存）
3. **协商缓存**：如果没有命中强缓存与启发式缓存，浏览器会发送一个请求到服务器，服务端通过last-modified（文件更新日期）和etag（文件hash值）验证资源是否命中协商缓存，如果文件未修改，则服务端返回304 Not Modified，浏览器接收到304状态吗，使用本地缓存文件。

针对
配置文件中的`add_header Cache-Control no-cache;`**是为了防止启发式缓存**而**使用协商缓存**，一般情况下刚发版的单页应用，访问index.html可能会命中启发式缓存，导致发版后需要等一段时间才能访问到最新的代码，本段配置就是为了解决这个问题。

配置文件中的`add_header Cache-Control max-age=31536000;`**是为了让文件名带hash值的文件命中强制缓存**，hash值能反应出文件是否变化，文件变化，文件名就会变化。所以可以设置较长的缓存时间。

配置文件中的`add_header Cache-Control no-store;`是模拟的接口返回，一般接口的内容都是实时查询出的，所以这里**取消缓存策略**。


## TODO
- [x] 补充浏览器缓存原理：强缓存、启发式缓存、协商缓存
- [x] 将api与index分配到两个不同的文件夹内
- [x] 只对hash文件配置缓存1年
- [x] 图片防盗链
- [x] 在单页应用中实现404
- [x] 将单页应用的源码以 git submodules 的方式加入到项目里 [my-app](https://gitlab.com/liuzhen1010xyz/my-app-react#my-app)
- [x] 利用Dockerfile缓存镜像
- [x] 多阶段构建缓存
- [x] 写出这个项目的使用说明
- [x] 为什么`docker-compose up`，停止后，修改了文件再次启动依然是原来的？需要加--build参数
- [x] 配置 gzip/brotli
- [x] expires作用：控制缓存时间，设置为 -1即不缓存

next
- [ ] 忽略 docker 忽略 my-app 下的node_modules和build
- [ ] http://localhost:9000/dist 会跳到 http://localhost/dist/ 的bug
- [ ] 解释a标签加入`referrerpolicy="no-referrer"`请求头才不携带referrer的问题：[参考](https://www.educative.io/answers/what-is-the-html-a-referrerpolicy-attribute)




git submodule add https://gitlab.com/liuzhen1010xyz/my-app-react.git my-app