/*
 * @Date: 2020-06-18 15:49:09
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-07-02 11:06:05
 * @Description: 打包
 */ 
const path = require("path");
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const VersionList = require("./syncVersion.js");
const config = require("./webpack.base.js");

module.exports = merge(config, {
	plugins: [
		new FileManagerPlugin({
			onEnd: {
				delete: [path.resolve(__dirname, "../dist.zip")],
				archive: [
					{
						source: path.resolve(__dirname, "../dist"),
						destination: path.resolve(__dirname, "../dist.zip"),
					},
				],
			},
		}),
		...VersionList,
		new CleanWebpackPlugin(),
	],
});
