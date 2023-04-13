/**
 * 开发环境配置，追求热更新快。
 */
import { merge } from 'webpack-merge'
import common from './webpack.common'

export default merge(common, {
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
          // "css-loader",
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
          // "less-loader",
          'sass-loader',
        ],
        // include: /node_modules/,
        // exclude: /node_modules/,
      },
      // {
      //   test: /\.(scss|sass)$/,
      //   use: [
      //     "style-loader",
      //     "css-loader",
      //     {
      //       // postcss 处理css的兼容性。
      //       loader: "postcss-loader",
      //       options: {
      //         postcssOptions: {
      //           plugins: [["autoprefixer"]],
      //         },
      //       },
      //     },
      //     "sass-loader",
      //   ],
      //   exclude: /node_modules/,
      // },
    ],
    // 只输出错误日志。
    // stats: "errors-only",
  },
})
