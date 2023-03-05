/**
 * 开发环境配置，追求热更新快。
 *
 *
 */
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
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
        test: /\.(css|scss|sass)$/,
        use: [
          "style-loader",
          "css-loader",
          {
            // postcss 处理css的兼容性。
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer"]],
              },
            },
          },
          //   "sass-loader",
        ],
        exclude: /node_modules/,
      },
    ],
    // 只输出错误日志。
    // stats: "errors-only",
  },
});
