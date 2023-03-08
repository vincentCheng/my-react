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

# 懒加载，有可能导致白屏。

- 使用 ErrorBoundary 来处理。

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

[参考文献 1](https://mp.weixin.qq.com/s/v3r3v2FOMQGunPN1vQh_Wg)

# index.html 模板中的 script 插入 body 的最后一行。

```json
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "../public/index.html"),
    inject: "body",
  }),
```

- head 中先加载 css 资源，然后加载 dom 树，最后加载 script 资源。这样的加载顺序对性能是最好的。
