/*
 * @Date: 2020-06-18 15:48:20
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-10-03 01:38:05
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
	optimization: {
		minimize: false,
	},
	devtool: "eval-cheap-module-source-map",
});
