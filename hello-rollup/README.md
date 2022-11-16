# Rollup

使用方式
- 命令行
- 配置文件：支持通过异步加载配置文件，支持从已安装包中加载配置
- js api

已安装的依赖
- `lodash`: 
- `typescript`: 
- `tslib`: 
- `@babel/cli`: 
- `@babel/core`: 
- `@babel/preset-env`: 
- `@babel/preset-typescript`: 
- `@rollup/plugin-babel`: 使rollup支持babel
- `@rollup/plugin-commonjs`: 将commonjs类型文件转化为es modules支持的文件，示例中的common.js
- `@rollup/plugin-node-resolve`: 
- `@rollup/plugin-typescript`: 
- `@types/lodash`: 
- `rollup`: 
- `rollup-plugin-terser`: 
- `rollup-plugin-replace`: 

未安装
- rollup-plugin-serve
- rollup-plugin-uglify: 压缩
- rollup-plugin-postcss: 支持样式
- rollup-plugin-serve: 服务器
- rollup-plugin-dev: 增强版的服务器
- rollup-plugin-livereload: 热更新
- @rollup/plugin-alias: 使用绝对路径

1. [使用Rollup打包JavaScript](https://juejin.cn/post/6844903570974703629)
2. [ESM打包工具-Rollup](https://juejin.cn/post/6902059571666223112)
3. [how-to-use-rollup](https://github.com/wuhonglei/how-to-use-rollup)
4. ✅[打包工具 rollup.js 入门教程](https://www.ruanyifeng.com/blog/2022/05/rollup.html)
5. [深入对比Webpack、Parcel、Rollup打包工具](https://zhuanlan.zhihu.com/p/350601275)
6. [rollup打包产物解析及原理（对比webpack）](https://juejin.cn/post/7054752322269741064)
7. ✅[Rollup打包工具的使用（超详细，超基础，附代码截图超简单）](https://juejin.cn/post/6844904058394771470)
8. [rollup从入门到打包一个按需加载的组件库](https://juejin.cn/post/6934698510436859912)
9. [一文带你快速上手Rollup](https://juejin.cn/post/6869551115420041229)

[Vite当前可用于生产吗，对比webpack有什么不足吗?](https://www.zhihu.com/question/447025978)
[vite多久后能干掉webpack？](https://www.zhihu.com/question/477139054)

TODO:
- [ ] plugins顺序
- [ ] 所有依赖的作用
- [ ] 各种模块的知识，d.ts怎么写？
- [ ] [支持css](https://juejin.cn/post/6844904058394771470#heading-41)
- [ ] linux 的env课程