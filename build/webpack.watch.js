/*
 * @Date: 2020-06-18 15:48:20
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-10-26 14:18:58
 * @Description: watch配置
 */
const merge = require("webpack-merge");
const config = require("./webpack.base");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

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
	plugins: [
		new BundleAnalyzerPlugin({
			generateStatsFile: true,
			analyzerMode: "disabled",
		}),
	],
});
