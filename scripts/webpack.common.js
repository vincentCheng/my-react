/**
 * 公用webpack配置。
 */
const glob = require('glob')
const path = require('path')
const _resolve = path.resolve
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ArcoWebpackPlugin = require('@arco-plugins/webpack-react')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')
// const pkgJSON = require("../package.json");
// const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
// const chalk = require("chalk");

console.log(`process.env.NODE_ENV ${process.env.NODE_ENV}`)

module.exports = {
  entry: _resolve(__dirname, '../src/index.tsx'),
  output: {
    filename: '[name].[contenthash].js',
    // hotUpdateChunkFilename: "[id].[fullhash].hot-update.js",
    // assetModuleFileName: "[name].[contenthash].js",
    path: _resolve(__dirname, '../dist'),
    /**
     * 如果这里设置为 /public/assets/js ，那么在浏览器中
     * 引用这个文件 app.js 的时候，
     * 就需要使用 /public/assets/js/app.js 这个URL.
     */
    publicPath: '/',
    clean: true,
  },
  resolve: {
    // 支持扩展名
    extensions: ['.ts', '.tsx', '.js'],
    // 支持路径别名
    alias: {
      '@': _resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    corejs: {
                      version: 3,
                    },
                    useBuiltIns: 'usage', // 按需引入 polyfill
                  },
                ],
                '@babel/preset-react', // react 环境
              ],
              // Make all helper references to avoid the duplication of the common functins.
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
          'ts-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|svg|gif)$/i,
        // 这是webpack5新引入的Asset Module类型，代替file-loader和url-loader
        type: 'asset',
        parser: {
          // 如果小于25kb，那么内联写入css中。
          // 如果大于25kb，那么就写入导出文件夹。
          dataUrlCondition: {
            maxsize: 25 * 1024, // 25kb
          },
        },
        generator: {
          filename: 'assets/imgs/[hash].[ext][query]',
        },
      },
    ],
  },
  plugins: [
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.join(__dirname, '../src')}/**/*`, {
        nodir: true,
      }),
    }),
    new BundleAnalyzerPlugin({
      analyzerPort: 8889,
      openAnalyzer: false,
    }),
    new ArcoWebpackPlugin(),
    new webpack.DefinePlugin({
      // Replace variables in my code with other values or
      // expressions at compile time.
      __DEV__: process.env.NODE_ENV === 'development',
    }),
    new HtmlWebpackPlugin({
      template: _resolve(__dirname, '../public/index.html'),
      inject: 'body',
    }),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, "../public/index.html"),
    //   title: pkgJSON.name,
    //   inject: true,
    // meta: {
    //   description: {
    //     type: "description",
    //     content: pkgJSON.description,
    //   },
    // },
    // if mode === 'production', minify === true.
    // It could change mode's value by command line. Such as :
    // npm run dev || npm run build.
    // minify: "auto",
    // }),
    new webpack.ProgressPlugin({
      activeModules: false,
      entries: true,
      // handler(percentage, message, ...args) {},
      modules: true,
      modulesCount: 5000,
      profile: false,
      dependencies: true,
      dependenciesCount: 10000,
      percentBy: null,
    }),
  ],
}
