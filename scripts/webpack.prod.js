/**
 * 生产环境寻求兼容性更高，尽可能和开发环境看到相同效果。
 */
// import { merge } from 'webpack-merge'
const merge = require('webpack-merge')
// import MiniCssExtractPlugins, {
//   loader as _loader,
// } from 'mini-css-extract-plugin'
const minicss = require('mini-css-extract-plugin')
const _loader = minicss.loader
// import common from './webpack.common'
const common = require('./webpack.common')
// import TerserPlugin from 'terser-webpack-plugin'
const TerserPlugin = require('terser-webpack-plugin')

export default merge(common, {
  mode: 'production',
  optimization: {
    // 默认值true
    // 告诉webpack使用TerserPlugin
    // 如果设置为false，那么就是使用minimizer中定义的插件压缩bundle?
    minimize: true,
    minimizer: [
      '...',
      new TerserPlugin({
        terserOptions: {
          format: {
            // 清除掉注释
            comments: false,
          },
        },
        // 是否将注释剥离到单独的文件中？
        extractComments: false,
      }),
    ],
  },
  module: {
    // 插件的执行顺序从右到左
    rules: [
      {
        test: /\.(css|less|scss|sass)$/,
        use: [
          _loader,
          //   "style-loader", // 生产环境中使用 MiniCssExtractPlugins
          // "css-loader",
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                // 生产环境使用的动态类名
                localIdentName: '[contenthash]',
              },
            },
          },
          {
            // postcss 处理css的兼容性。
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['autoprefixer']],
              },
            },
          },
          'less-loader',
          'sass-loader',
        ],
        exclude: /node_modules/,
      },
    ],
    // 只输出错误日志。
    // stats: "errors-only",
  },
  plugins: [
    // 将css导出到单独文件。
    new MiniCssExtractPlugins({
      //   filename: "assets/css/[name].[contenthash].css",
    }),
  ],
})
