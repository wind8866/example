# Rollup

使用方式
- 命令行
- 配置文件：支持通过异步加载配置文件，支持从已安装包中加载配置
- js api




已安装的依赖
- `lodash`: 
- `typescript`: ts核心
- `tslib`: 所有 TypeScript 助手函数
- `@babel/cli`: babel命令行交互
- `@babel/core`: babel转换的核心
- `@babel/preset-env`: 智能预设，智能的判断哪些语法需要转换，由哪些库组成
  - browserslist：语法查询浏览器占有量等
  - compat-table：ECMAScript兼容列表
  - electron-to-chromium：chromium的映射列表
- `@babel/preset-typescript`: ts的预设
- `@rollup/plugin-babel`: 使rollup支持babel
- `@rollup/plugin-commonjs`: 将cjs类型文件转化为esm支持的文件，示例中的common.js
- `@rollup/plugin-node-resolve`: 解析 node_modules中的模块（rollup默认不会寻找包）
- `@rollup/plugin-typescript`: rollup支持ts
- `@types/lodash`: 
- `rollup`: 
- `rollup-plugin-terser`: 压缩 bundle 文件
- `rollup-plugin-replace`: 可将源码中的环境变量替换成确切的值

未安装
- rollup-plugin-serve: 相当于webpack-dev-server
- rollup-plugin-uglify: 压缩 bundle 文件
- rollup-plugin-postcss: 支持样式
- rollup-plugin-dev: 增强版的服务器
- rollup-plugin-livereload: 热更新
- @rollup/plugin-alias: 使用绝对路径，支持别名路径替换，例如@
- rollup-plugin-filesize: 显示 bundle 文件大小

**插件间的关系**
一般`@rollup/plugin-node-resolve`和`@rollup/plugin-commonjs`配合在一起使用，[plugin-node-resolve](https://github.com/rollup/plugins/blob/master/packages/node-resolve/README.md)用于去node_modules寻找包。有些包只支持commonjs，rollup不支持这种方式，plugin-commonjs就是做这件事的，可以下载isobject包，去node_modules里讲index.js内容替换为index.cjs.js进行验证这一结论。

`@rollup/plugin-babel`和`@rollup/plugin-typescript`在配置时必须在plugins注册，先后顺序无所谓但要在[plugin-commonjs之后](https://github.com/rollup/plugins/blob/master/packages/babel/README.md#using-with-rollupplugin-commonjs)其他插件之前，babel.config.json中是否加入ts配置项不会有影响

`@rollup/plugin-typescript`需要依赖`typescript`与`tslib`


1. ✅[使用Rollup打包JavaScript](https://juejin.cn/post/6844903570974703629)
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