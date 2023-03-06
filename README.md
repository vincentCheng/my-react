# my-react

手动搭建 react 脚手架

- 参考文献：https://juejin.cn/post/7087811040591675428
- 参考文献：https://mp.weixin.qq.com/s/i1AVCXliehk5cMLPmPueOA

- style-loader 将 css 注入到 HTML 的内联样式
- css-loader 加载 css
  `npm instlal style-loader css-loader -D`

- postcss 处理 css 兼容性
- autoprefixer 自动根据兼容需求添加 css 属性的前缀
  `npm install postcss postcss-loader autoprefixer -D`

- sass 支持 css 编程
- sass-loader 加载 sass
  `npm install sass sass-loader -D`

# webpack.prod.js 生产配置

- [Webpack Optimization 中，会根据 mode 做出对应的优化。这里是惯用配置。](https://webpack.docschina.org/configuration/optimization/)

- stats 不知道为什么用不了可能是 webpack 的版本不匹配

- ts:checker 用不了，改为 npx tsc --noEmit

- todo: MiniCssExtractPlugins 的配置，目前只能使用最基础的功能。无法根据实际需要修改 css 的路径。

- public/index.html 中的 css 引入，需要对应在 dist 中的路径。

# babel 及其配置

- 安装 babel 核心和加载器

  - babel-loader 是让 webpack 使用 babel。
    `yarn add @babel/core babel-loader -D`

- core-js 用于提升兼容性。

  - 有些浏览器是不支持 Promise 和 Map 的，可以用这个转换。
  - https://github.com/zloirock/core-js
    `yarn add core-js -D`

- 预制环境

  - 根据浏览器加载对应的转换，提高兼容性。
    `yarn add @babel/preset-env @babel/preset-react -D`

- 打包的时候减少冗余代码。
  `yarn add @babel/plugin-transform-runtime -D`
