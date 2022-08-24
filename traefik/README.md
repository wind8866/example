# 初次使用 Traefik
Traefik 是一个云原生的新型的 HTTP 反向代理、负载均衡软件。
## 使用方法
**一、**
在项目根目录运行`docker-compose up`
查看 [dashedboard](http://127.0.0.1:8080/dashboard/#/)，在HTTP标签页可发现三个规则：
/：8080接口，dashedboard
/api：8080接口，可访问[rawdata](http://localhost:8080/api/rawdata)
Host(`traefik-traefik`)：不知道是什么❓

按理说`traefik-traefik`应该可以使用`curl -H Host:traefik-traefik http://127.0.0.1`访问，但可能没有首页地址无法知道这个是什么服务。

**二、**
在whoami目录运行`docker-compose up`
再次查看dashedboard和rawdata接口可查看区别
使用`curl -H Host:whoami.docker.localhost http://127.0.0.1`可访问到服务的内容。


## Traefix可以做什么
- 网关/代理请求：拦截并路由每个传入的请求，根据路由规则，作为外部请求与服务的中间代理
- 服务发现：无需重启，自动检测服务，自动更新路由规则
- 云原生：即专门为微服务等云端技术设计，兼容许多种集群技术
- 负载均衡：自动负载均衡
- 证书：支持自动配置HTTPS证书
- 服务监控管理：Web UI查看和管理各容器的运行

**服务发现**
经[demo](https://github.com/wind8866/example/blob/main/traefik/README.md#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)测试，先启动traefik服务，再启动其他服务，traefik会自动发现并代理服务。

**自动负载均衡例子：**
只需将docker服务的实例增加至大于一个，docker将会自动发现服务并进行负载均衡。
```bash
docker-compose up -d --scale whoami=2
```
参考[More Instances? Traefik Load Balances Them](https://doc.traefik.io/traefik/getting-started/quick-start/#more-instances-traefik-load-balances-them)

**服务监控管理**
[dashedboard](http://127.0.0.1:8080/dashboard/#/)
<http://localhost:8080/api/rawdata>查看原始数据


## Traefix是如何做到的
网络关联（TODO）
Traefik使用容器标签container labels检测路由配置


## 配置
[默认配置文件](https://raw.githubusercontent.com/traefik/traefik/master/traefik.sample.toml)
传统的路由需要配置，traefik从服务本身获取，检测服务并更新路由规则
配置分为静态配置和动态配置，前者定义具体处理方式，后者从镜像（标签）中提取配置。
定义具体处理方式有：配置文件(覆盖`/etc/traefik/traefik.toml`)、在命令行参数、环境变量
可以使用docker run traefik —help 查看命令行支持的参数

**docker是怎样发现服务的**
Traefik 能够使用您的集群 API 来发现服务并读取附加信息。在 Traefik，这些连接器被称为提供者，因为它们为 Traefik 提供配置。

labels是docker中的概念，是一种将元数据应用于 Docker 对象的机制，Traefik自动读取容器的标签生成动态配置来更新路由规则。
例如如下配置将Host元数据写入docker镜像，我猜测对于docker来说Host无实际意义，就像HTTP响应头一样，如何解析全靠浏览器（Traefik）。

```yml
services:
  whoami:
    image: traefik/whoami
    labels:
      - "traefik.http.routers.whoami.rule=Host(`whoami.docker.localhost`)"
```

## 其他
### "traefik.http.routers.whoami.rule=Host(`whoami.shanyue.local`)" 为什么能使宿主机可访问该域名？
并不能直接通过域名访问到whoami服务，只能通过访问本地127.0.0.1并配置Host请求头访问。而且这个Host字段并不是一个合格的域名（没有local顶级域名）。我个人理解这个只是一个标记，否则另一个服务（例如whoisshe）也监听80端口，你通过127.0.0.1，traefik不知道应该发给哪个服务，这和早期的虚拟主机有点像。如果我手动配置`/whoami`转发并重写到whoami服务首页或许就不需要再使用Host请求头了。

### whoami中配置network的意义是什么？
该属性属于docker-compose的配置，使用同一个网络名称的服务可以相互访问，否则不能相互访问。[详见](https://docs.docker.com/compose/networking/#specify-custom-networks)

经测试（注释掉[这几行](https://github.com/wind8866/example/blob/main/traefik/whoami/docker-compose.yml#L8-L11)）没有networks，不能通过127.0.0.1访问到whoami服务，也就是说traefik无法代理whoami

### [docker label的使用](https://docs.docker.com/engine/reference/commandline/run/#set-metadata-on-container--l---label---label-file)
标签是一种将元数据应用于 Docker 对象的机制，Traefik自动读取容器的标签生成动态配置来更新路由规则。

### valumes
docker-compose配置中[valumes](https://docs.docker.com/engine/reference/builder/#volume)会在容器内部挂在到容器的指定位置，所以容器内部的写入会同步到外部，反之亦然。
所以可以看到/log下的两个日志内容


### rawdata文件的一些参数
```json
{
	"routers": {
		"api@internal": {
			"entryPoints": ["traefik"],
			"service": "api@internal",
			"rule": "PathPrefix(`/api`)",
			"priority": 2147483646,
			"status": "enabled",
			"using": ["traefik"]
		},
		"dashboard@internal": {
			"entryPoints": ["traefik"],
			"middlewares": ["dashboard_redirect@internal", "dashboard_stripprefix@internal"],
			"service": "dashboard@internal",
			"rule": "PathPrefix(`/`)",
			"priority": 2147483645,
			"status": "enabled",
			"using": ["traefik"]
		},
		"traefik-traefik@docker": {
			"entryPoints": ["http"],
			"service": "traefik-traefik",
			"rule": "Host(`traefik-traefik`)",
			"status": "enabled",
			"using": ["http"]
		},
		"whoami@docker": {
			"entryPoints": ["http"],
			"service": "whoami-whoami",
			"rule": "Host(`whoami.docker.localhost`)",
			"status": "enabled",
			"using": ["http"]
		}
	},
	"middlewares": {
		"dashboard_redirect@internal": {
			"redirectRegex": {
				"regex": "^(http:\\/\\/(\\[[\\w:.]+\\]|[\\w\\._-]+)(:\\d+)?)\\/$",
				"replacement": "${1}/dashboard/",
				"permanent": true
			},
			"status": "enabled",
			"usedBy": ["dashboard@internal"]
		},
		"dashboard_stripprefix@internal": {
			"stripPrefix": {
				"prefixes": ["/dashboard/", "/dashboard"]
			},
			"status": "enabled",
			"usedBy": ["dashboard@internal"]
		}
	},
	"services": {
		"api@internal": {
			"status": "enabled",
			"usedBy": ["api@internal"]
		},
		"dashboard@internal": {
			"status": "enabled",
			"usedBy": ["dashboard@internal"]
		},
		"noop@internal": {
			"status": "enabled"
		},
		"traefik-traefik@docker": {
			"loadBalancer": {
				"servers": [{
					"url": "http://172.24.0.2:80"
				}],
				"passHostHeader": true
			},
			"status": "enabled",
			"usedBy": ["traefik-traefik@docker"],
			"serverStatus": {
				"http://172.24.0.2:80": "UP"
			}
		},
		"whoami-whoami@docker": {
			"loadBalancer": {
				"servers": [{
					"url": "http://172.25.0.2:80"
				}],
				"passHostHeader": true
			},
			"status": "enabled",
			"usedBy": ["whoami@docker"],
			"serverStatus": {
				"http://172.25.0.2:80": "UP"
			}
		}
	}
}
```