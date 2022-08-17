# 将前端项目打包上传到OSS并使用docker多阶段构建部署到nginx

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

## 在使用wget下载git仓库时如何防止镜像缓存
本项目的思路是使用wget从gitlab上下载代码解压到项目镜像里，[可见代码](https://github.com/wind8866/example/blob/06d04e0f1f/docker-deploy-upload-oss/Dockerfile#L17)。
但是遇到一个问题，当git仓库提交新代码后镜像仍使用缓存，然后查了一下看到以下资料
> RUN 命令允许您在 Docker 映像中执行命令。如果由 RUN 命令生成的层已经存在于缓存中，则 RUN 命令将只执行一次。
> 如果 COPY 或 ADD 命令的所有外部文件的内容相同，那么将使用层缓存。
> from <https://docs.semaphoreci.com/ci-cd-environment/docker-layer-caching>

需要使用ADD下载一个网络上的文件，这个文件应该尽量小又能代表git仓库的更新情况。就类似于随软件发行附带的[SHASUMS256.txt](https://nodejs.org/dist/v16.17.0/)文件一样，参考[这个帖子](https://github.com/moby/moby/issues/14704#issuecomment-215961707)可以使用 github/gitlab 提供的API获取最后一次提交的信息就可以了。

最终找到了官方文档[gitlab](https://docs.gitlab.cn/14.0/ee/api/branches.html#get-single-repository-branch)、[github](https://docs.github.com/en/rest/git/refs#get-a-reference)解决了这个问题

代码示例
```Dockerfile
# from https://github.com/wind8866/example/blob/main/docker-deploy-upload-oss/Dockerfile#L17-L18
ADD https://api.github.com/repos/wind8866/hello-react/git/ref/heads/main /tmp/devalidateCache
ADD https://gitlab.com/api/v4/projects/38437627/repository/branches/main /tmp/devalidateCache
```

## TODO
- [x] docker缓存导致拉去到的镜像不是最新的，参考https://github.com/moby/moby/issues/14704#issuecomment-215961707 解决
- [x] 如何在docker-compose up --build时不使用镜像缓存（现在都是删除镜像），没有直接的办法，可以使用`docker-compose build --no-cache`再执行`docker-compose up`就可以
- [ ] 如何使用ADD直接拉取git仓库代码，参考[Adding a git repository ADD <git ref> <dir>](https://docs.docker.com/engine/reference/builder/#adding-a-git-repository-add-git-ref-dir) 和 [Dockerfile 'ADD' to support git repositories](https://github.com/moby/moby/issues/14704)
- [ ] OSS的环境变量不使用宿主机而是传进去