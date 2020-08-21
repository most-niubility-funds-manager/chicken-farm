/*
 * @Date: 2020-07-24 21:56:52
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-20 17:39:16
 * @Description: 插件背景页
 */

import { fetchData } from "./services";
import { syncSet, syncGet } from "./base";
import Constants from "../constants";
import "./webRequest";
import "./notifiy";

const { COMMANDS } = Constants;
const RUNTIME_COMMANDS = new Map([
	[COMMANDS.REQUEST, (sendResponse, data) => fetchData(data).then((_) => sendResponse(_))],
	[COMMANDS.SYNC_GET, (sendResponse, data) => syncGet(data).then((_) => sendResponse(_[data]))],
	[COMMANDS.SYNC_SET, (sendResponse, data) => syncSet(data).then((_) => sendResponse())],
]);

// 背景页命令中枢
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	const { command, data } = message;
	RUNTIME_COMMANDS.get(command)(sendResponse, data);

	console.log('响应命令', command)
	return true;
});

console.log("Say Yeah!");
