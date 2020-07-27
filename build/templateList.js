/*
 * @Date: 2020-06-18 15:28:27
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-06-18 16:13:25
 * @Description: template文件配置
 */ 
const HtmlWebpackPlugin = require("html-webpack-plugin");
const chunkNames = [
  { chunk: 'popup', name: '前置弹窗页' },
  { chunk: 'options', name: '配置页面' },
  { chunk: 'background', name: '后置背景页' },
];

module.exports = chunkNames.map(
  ({ chunk, name }) =>
    new HtmlWebpackPlugin({
      title: name,
      filename: `${chunk}.html`,
      template: `public/pages/${chunk}.html`,
      chunks: ["vendor", chunk],
      chunksSortMode: "manual",
    })
);
