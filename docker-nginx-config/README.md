# 一些使用 docker 与 nginx 模拟的一些nginx常用配置

## 说明
此 demo 使用 docker 展示 nginx 配置
需要安装 docker 环境，并在当前目录使用`docker-compose up`启动服务

- api.conf：
  - 接口可跨域配置
  - 图片防盗链功能
- index.conf: <http://localhost:8000/index.html>
  - 非打包场景的最优缓存配置
  - 打包场景的最优缓存配置：在dist目录下
  - 单页应用重写到/dist/index.html，路由交给前端框架处理
  - 隐藏指定文件


## TODO
- [ ] 图片防盗链
- [ ] http://localhost:8000/dist 会跳到 http://localhost/dist/ 的bug