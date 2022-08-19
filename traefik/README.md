# 初次使用 Traefik

## 使用方法
**一、**
在项目根目录运行`docker-compose up`
查看 [dashedboard](http://127.0.0.1:8080/dashboard/#/)，在HTTP标签页可发现三个规则：
/：8080接口，dashedboard
/api：8080接口，可访问[rawdata](http://localhost:8080/api/rawdata)
Host(`traefik-traefik`)：不知道是什么

按理说`traefik-traefik`应该可以使用`curl -H Host:traefik-traefik http://127.0.0.1`访问，但可能没有首页地址。

**二、**
在howami目录运行`docker-compose up`
再次查看dashedboard和rawdata接口可查看区别
使用`curl -H Host:whoami.docker.localhost http://127.0.0.1`可访问到服务的内容。


## 一些资料
[docker label的使用](https://docs.docker.com/engine/reference/commandline/run/#set-metadata-on-container--l---label---label-file)

[默认配置文件](https://raw.githubusercontent.com/traefik/traefik/master/traefik.sample.toml)


rawdata文件的一些参数
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
			"service": "whoami-howami",
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
		"whoami-howami@docker": {
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