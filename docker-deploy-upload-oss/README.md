# 打包项目后上传到OSS

官方文档[这里说](https://docs.docker.com/engine/reference/builder/#adding-a-git-repository-add-git-ref-dir)ADD支持git仓库地址，但试了好多次这个项目没成功，最后只能用wget下载zip并解压。

## 使用
宿主机需要docker环境
设置环境变量
```
export ACCESS_KEY_ID=LTAI5tCKqdxxxxxxx
export ACCESS_KEY_SECRET=9zrRpxxxxxxxxxxxxx
```
然后运行`docker-compose up --build`

访问: <http://localhost:9100/>

## TODO
- [ ] docker缓存导致拉去到的镜像不是最新的，参考https://github.com/moby/moby/issues/14704#issuecomment-215961707 解决
- [ ] 如何在docker-compose up --build时不使用镜像缓存（现在都是删除镜像）