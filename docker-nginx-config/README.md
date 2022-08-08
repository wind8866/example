# 使用 docker 与 nginx 模拟的一些 nginx 常用配置

## 说明
此 demo 使用 docker 展示 nginx 配置
需要安装 docker 环境，并在当前目录使用`docker-compose up`启动服务

- api.conf：
  - 接口可跨域配置
  - 图片防盗链功能
- index.conf: <http://localhost:9000/index.html>
  - 非打包场景的最优缓存配置
  - 打包场景的最优缓存配置：在dist目录下
  - 单页应用重写到/dist/index.html，路由交给前端框架处理
  - 隐藏指定文件


## TODO
- [ ] 补充浏览器缓存原理：强缓存、启发式缓存、协商缓存
- [ ] 将api与index分配到两个不同的文件夹内
- [ ] 只对hash文件配置缓存1年
- [ ] 图片防盗链
- [ ] http://localhost:9000/dist 会跳到 http://localhost/dist/ 的bug

- [ ] 在单页应用中实现404
- [ ] expires作用
- [ ] 配置 gzip/brotli
- [ ] 利用Dockerfile缓存镜像