/**
 * 修改json文件，同步manifest及package的版本信息
 */
const WriteJsonWebpackPlugin = require("write-json-webpack-plugin");
const version = require("../src/config.json").version;
const packageJson = require("../package.json");
const manifest = require("../public/manifest.json");

packageJson.version = manifest.version = version;

const list = [
	{ origin: "../", filename: "package.json", json: packageJson },
	{ origin: "../public", filename: "manifest.json", json: manifest },
	{ origin: "../dist", filename: "manifest.json", json: manifest },
];

module.exports = list.map(
	({ origin, filename, json }) =>
		new WriteJsonWebpackPlugin({
			pretty: true,
			object: json,
			path: origin,
			filename,
		})
);
