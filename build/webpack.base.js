/*
 * @Date: 2020-06-17 15:25:17
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-07-02 11:04:01
 * @Description: webpack通用配置
 */
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const MergeJsonWebpackPlugin = require("merge-jsons-webpack-plugin");
const entryList = require("./entryList.js");
const MergeLocale = require("./mergeLocale.js");
const templateList = require("./templateList.js");

module.exports = {
	mode: "production",
	entry: entryList,
	output: {
		path: path.resolve(__dirname, "../dist"),
		filename: "static/js/[name].js",
		chunkFilename: "static/js/[name].bundle.js",
	},
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".scss", ".css"],
	},
	module: {
		rules: [
			{
				test: /\.(gif|jpeg|png|jpg|svg)(\?t=\d+)?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							outputPath: "static/images/",
							limit: 10 * 1024,
						},
					},
				],
			},
			{
				test: /\.(eot|woff2?|ttf|svg)$/,
				use: [
					{
						loader: "url-loader",
						options: {
							name: "[name]-[hash:6].min.[ext]",
							limit: 5000,
							outputPath: "static/fonts/",
						},
					},
				],
			},
			{
				test: /\.(sc|c)ss?$/,
				use: [
					"style-loader",
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							plugins: (loader) => [require("postcss-import")({ root: loader.resourcePath })],
						},
					},
					"sass-loader",
				],
			},
			{
				test: /\.(ts|tsx|js|jsx)?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
						},
					},
				],
			},
		],
	},
	optimization: {
		usedExports: true,
		splitChunks: {
			minChunks: 1,
			chunks: "all",
			cacheGroups: {
				vendor: {
					name: "vendor",
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
				},
			},
		},
	},
	plugins: [
		...templateList,
    // CopyWebpackPlugin这玩意更新好快啊
		new CopyWebpackPlugin({
			patterns: [
				{
					from: "public/manifest.json",
					to: "manifest.json",
				},
				{
					from: "public/icons/**/*",
          to: "static/icons/",
          flatten: true,
				},
			],
		}),
		new MergeJsonWebpackPlugin({
			debug: true,
			output: {
				groupBy: [...MergeLocale],
			},
		}),
	],
};
