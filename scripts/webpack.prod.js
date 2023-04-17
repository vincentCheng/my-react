/**
 * 生产环境寻求兼容性更高，尽可能和开发环境看到相同效果。
 */
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const _loader = MiniCssExtractPlugin.loader
const common = require('./webpack.common')
const TerserPlugin = require('terser-webpack-plugin')

const config = merge(common, {
  mode: 'production',
  optimization: {
    // 默认值true
    // 告诉webpack使用TerserPlugin
    // 如果设置为false，那么就是使用minimizer中定义的插件压缩bundle?
    minimize: true,
    minimizer: [
      '...',
      new TerserPlugin({
        parallel: 2,
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
  },
  plugins: [
    // 将css导出到单独文件。
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash].css',
    }),
  ],
})

module.exports = config
