/**
 * 开发环境配置，追求热更新快。
 */
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
// 分析打包速度
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()

const config = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    open: true,
    compress: false, //关闭gzip压缩
    port: 7878,
    historyApiFallback: true, // history路由重定向到index.html
  },
  module: {
    // 插件的执行顺序从右到左
    rules: [
      {
        // test: /\.(css|less|scss|sass)$/,
        test: /\.(css|scss|sass)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                // 开启动态类名
                auto: true,
                // 开发环境使用的动态类名
                localIdentName: '[path][name]__[local]',
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
          'sass-loader',
        ],
      },
    ],
  },
})

module.exports = smp.wrap(config)
