
想法：github action 作为构建服务器，我自己的服务器作为部署服务器

> **工作流程(workflow)**包含一个或多个**作业(jobs)**，这些作业可以按顺序运行，也可以并行运行。 每个作业都将在其自己的虚拟机运行器中运行，或者在容器内运行，并且具有一个或多个步骤 ，这些步骤要么运行您定义的脚本，要么运行操作，这是一个可重用的扩展，可以简化您的工作流程。
> ![workflow](https://docs.github.com/assets/cb-25535/images/help/images/overview-actions-simple.png) ---from [GitHub Actions 的组件](https://docs.github.com/cn/actions/learn-github-actions/understanding-github-actions#github-actions-%E7%9A%84%E7%BB%84%E4%BB%B6)

不负责任的猜测：这里的的jobs应该是对应多阶段构建，step对应容器的层，工作流对应服务编排。

触发工作流执行的方式有三类，所有[事件列表](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows)
- git event
- 手动触发
- 定时运行

## workflow示例
```yaml
# GitHub Actions 选项卡中的名称（可选）
name: learn-github-actions
# 此工作流的触发事件，这里是只要向仓库中推送代码
on: [push]
jobs:
  # 定义一个job
  check-bats-version:
    # 该job运行在xxx镜像中
    runs-on: ubuntu-latest
    steps:
      # 将存储库checkout到运行程序上
      - uses: actions/checkout@v3
      # 安装node v14
      - uses: actions/setup-node@v3
        with:
          node-version: '14'
      - run: npm install -g bats
      - run: bats -v
```

示例中的`users`的值是社区或自己创建的集合命令，可以去[checkout@v3](https://github.com/marketplace/actions/checkout)看一下，他可以支持各种参数。一行代码就解决了我之前遇到的在[使用wget下载git仓库时如何防止镜像缓存](https://github.com/wind8866/example/blob/main/docker-deploy-upload-oss/README.md#%E5%9C%A8%E4%BD%BF%E7%94%A8wget%E4%B8%8B%E8%BD%BDgit%E4%BB%93%E5%BA%93%E6%97%B6%E5%A6%82%E4%BD%95%E9%98%B2%E6%AD%A2%E9%95%9C%E5%83%8F%E7%BC%93%E5%AD%98)问题。
