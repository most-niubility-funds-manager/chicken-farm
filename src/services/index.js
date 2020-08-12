/*
 * @Date: 2020-07-24 21:56:52
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-11 15:36:20
 * @Description: 插件背景页
 */

import { fetchData } from "./services";
import Constants from "../constants";
import './webRequest'
import './notifiy'

const { COMMANDS } = Constants;

const RUNTIME_COMMANDS = new Map([
	[COMMANDS.REQUEST, (sendResponse, data) => fetchData(data).then((_) => sendResponse(_))],
]);

// 背景页命令中枢
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	const { command, data } = message;
	RUNTIME_COMMANDS.get(command)(sendResponse, data);

	return true;
});

console.log("Say Yeah!");
