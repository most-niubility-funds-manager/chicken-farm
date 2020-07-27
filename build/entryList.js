/*
 * @Date: 2020-06-17 15:56:01
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-07-24 22:21:21
 * @Description: 多页面入口汇总
 */

const path = require("path");

module.exports = {
	popup: path.resolve(__dirname, "../src/App/popup/index.js"),
	options: path.resolve(__dirname, "../src/App/options/index.js"),
	background: path.resolve(__dirname, "../src/services/index.js"),
};
