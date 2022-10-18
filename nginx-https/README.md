

docker compose up
curl http://wind8866.top:9100

docker run -it --name nginx -p 9100:80 -p 443:443 nginx sh



docker run -itd --name nginx -p 80:80 -p 443:443 -v default.d/nginx.conf -v wind8866.top_cert_chain.pem:/etc/nginx/cert/ssl.pem -v wind8866.top_key.key:/etc/nginx/cert/ssl.key -m 100m nginx


6fe24c80be5c
docker cp a25b9f301349:/etc/nginx/nginx.conf /usr/local/nginx/conf/

- [x] mac下的配置生效
- [ ] 使用docker-compose启动的容器如何使用exec进入
- [ ] docker nginx 配置好https
#
- [深入理解HTTPS工作原理](https://juejin.cn/post/6844903830916694030#heading-10)
- [HTTPS工作原理](https://cattail.me/tech/2015/11/30/how-https-works.html)
- [SSL/TLS协议运行机制的概述](https://www.ruanyifeng.com/blog/2014/02/ssl_tls.html)
- [https安全证书如何申请 https证书申请流程及费用](https://zhuanlan.zhihu.com/p/77934782)
- [docker安装nginx并配置ssl](https://juejin.cn/post/7080351596973916196)
- [Nginx 安装 SSL 配置 HTTPS 超详细完整全过程](https://segmentfault.com/a/1190000022673232)
- https://freessl.cn/
