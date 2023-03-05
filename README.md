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
