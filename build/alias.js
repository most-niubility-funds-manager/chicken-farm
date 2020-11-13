/*
 * @Date: 2020-10-02 19:35:31
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-10-06 22:01:51
 * @Description: 公用资源别名
 */
const path = require("path");
const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
	"@": resolve("../src"),
	"@lib": resolve("../src/lib"),
	"@utils": resolve("../src/utils/index.js"),
};
