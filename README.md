# my-react

手动搭建 react 脚手架

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

- ts:checker 用不了，改为 npx tsc --noEmit

- public/index.html 中的 css 引入，需要对应在 dist 中的路径。

## babel 及其配置

- 安装 babel 核心和加载器

  - babel-loader 是让 webpack 使用 babel。
    `yarn add @babel/core babel-loader -D`


## core-js 用于提升兼容性。

  - 有些浏览器是不支持 Promise 和 Map 的，可以用这个转换。

    `yarn add core-js -D`

- 预制环境

  - 根据浏览器加载对应的转换，提高兼容性。

    `yarn add @babel/preset-env @babel/preset-react -D`

- 打包的时候减少冗余代码。

  `yarn add @babel/plugin-transform-runtime -D`
  - 例如：每个文件都会重复引入`import React from 'react'`，加上这个之后就不需要每个文件都引入了。
  - 同时要在 tsconfig.json 中设置 `"allowSyntheticDefaultImports": true`，允许合成默认的 import。

# 懒加载，有可能导致白屏。

- 使用 ErrorBoundary 来处理。

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}
```

# index.html 模板中的 script 插入 body 的最后一行。

```json
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "../public/index.html"),
    inject: "body",
  }),
```

- head 中先加载 css 资源，然后加载 dom 树，最后加载 script 资源。这样的加载顺序对性能是最好的。

# ReturnType 能够获取一个函数的返回类型

```typescript
function foo(e: number): number {
  return e
}

type fooReturn = ReturnType<typeof foo> // number
```

# 使用官网提供的 redux 模板代码。

# normalize.css 规范化 css 样式。

```shell
npm install normalize.css
```

# sass-loader 和 scss-loader 的区别

scss-loader 和 sass-loader 都是 webpack 的 loader，它们可以让你在项目中使用 SCSS 或 SASS 语法编写样式表。它们的区别主要有两点 ³：

- scss-loader 需要安装 sass 和 webpack 作为依赖，而 sass-loader 只需要安装 sass。
- scss-loader 支持 SCSS 语法，而 sass-loader 支持 SASS 和 SCSS 语法。
- scss 和 sass 都是 css 的预处理器。
  - scss 是 sass 的新语法，完全兼容 css。sass 是缩进式语法，不带大括号和分号。
  - scss 支持更多的 css3 功能，如媒体查询、选择器继承、颜色函数等。

# 处理 css/less/sass

- 参考 webpack.dev.js ，将三种样式文件分开。

# css-loader 动态生成类名

- 参考 webpack.dev.js

```javascript
{
  loader: "css-loader",
  options: {
    modules: {
      // 开启动态类名
      auto: true,
      // 开发环境使用的动态类名
      localIdentName: "[path][name]__[local]",
    },
  },
},
```

- scss 是编译到 css，没有做样式隔离，极有可能同名 class 样式覆盖，可以通过自动生成前缀 css 类名解决。

# 动态的 css 类名 ts 定义。css 样式编写的时候会有提示。

 - 安裝

```shell
 npm i -D "typescript-plugin-css-modules"
```
- .vscode/setting.json 的设定，能够对 css 样式给出代码提示。
- tsconfig.json 中添加 "plugins": [{ "name": "typescript-plugin-css-modules" }]


# axios 的封装

- todo：[axios 精读](https://mp.weixin.qq.com/s/rJi_N42CDskIoFpSVcsJEg)

# jest 单元测试

- 引用一段话：我们只需要配置一些核心主流程的测试任务就好，同时在 CI/CD 中配置自动触发运行单测检查。

- todo：这里需要配置一下，不然 react 中没法使用 jest。

# eslint 配置、husky git/lint-staged/等配置。

- [参考文献 1：](https://mp.weixin.qq.com/s/BN-zEcfqQX0UFpX9Ae9ApQ)

- todo: eslint 使用 airbnb。

- husky，提交代码之前做的检测

```shell
yarn add husky@3.1.0 -D
# 相当于一个 ls | grep 中grep的功能。
yarn add lint-staged -D
yarn add @commitlint/cli -D
yarn add @commitlint/config-conventional -D
```

package.json 中配置

```json
"husky": {
  "hooks": {
    "pre-commit": "lint-staged",
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
},
"commitlint": {
  "extends": [
    "@commitlint/config-conventional"
  ]
},
"lint-staged": {
  "*.{ts,js}": [
    "node --max_old_space_size=8192 ./node_modules/.bin/prettier -w",
    "node --max_old_space_size=8192 ./node_modules/.bin/eslint --fix --color",
    "git add"
  ]
},
```

这样配置好了后，开发者在 git commit 时，会首先调用 lint-staged 字段中命令，首先是 prettier 格式化，然后是 ESlint 校验并修复，然后将修改后的文件存入暂存区。

然后是校验 commit message 是否符合规范，符合规范后才会成功 commit。


### 参考文献：
- https://juejin.cn/post/7087811040591675428
- https://mp.weixin.qq.com/s/i1AVCXliehk5cMLPmPueOA
- https://mp.weixin.qq.com/s/v3r3v2FOMQGunPN1vQh_Wg