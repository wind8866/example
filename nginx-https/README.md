# nginx 配置https

我在[freessl](https://freessl.cn/)的51SSL申请了一个免费的证书，只需要提供域名（前提是你需要有一个域名，如果没有的话，使用我仓库cert文件夹下的就可以），并且验证你对域名或域名下的网站有操作权限，就会直接颁发证书证书并提供nginx的使用实例：.pem文件里是证书链，.key文件里是私钥。为了不影响线上环境，我在本地环境下测试，如果在线上环境，不需要第一步的修改hosts。

1. hosts文件添加`127.0.0.1 wind8866.top`
2. 配置nginx，见[nginx.conf](./nginx.conf)
3. 使用`curl https://wind8866.top`验证
## mac环境下的操作

- [x] mac下的配置生效
- [ ] 使用docker-compose启动的容器如何使用exec进入
- [ ] docker nginx 配置好https



