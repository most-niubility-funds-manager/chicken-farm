/*
 * @Date: 2020-06-18 15:48:20
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-06-18 15:48:47
 * @Description: watch配置
 */
const merge = require("webpack-merge");
const config = require("./webpack.base");

module.exports = merge(config, {
  watch: true,
  watchOptions: {
    // aggregateTimeout: 1000, // milliseconds
    // poll: 1000,
    ignored: ["node_modules"],
  },
});
