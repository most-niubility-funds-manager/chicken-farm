/*
 * @Date: 2020-07-24 21:56:52
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-03 23:47:52
 * @Description: 插件背景页
 */

import { fetchData } from "./services";
import Constants from "../constants";
import './webRequest'

const { COMMANDS } = Constants;

const RUNTIME_COMMANDS = new Map([
	[COMMANDS.REQUEST, (sendResponse, data) => fetchData(data).then((_) => sendResponse(_))],
]);

// 背景页命令中枢
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	const { command, data } = message;
	console.log("监听命令", command, data);
	RUNTIME_COMMANDS.get(command)(sendResponse, data);

	return true;
});

console.log("Say Yeah!");
