/*
 * @Date: 2020-09-24 15:04:54
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-10-09 18:11:15
 * @Description: chrome 基础api封装
 */

/**
 * @description: popup | options 与background通信
 * @param {Object} { command, data = null }
 * @return {Any}
 */
export const sendMessage = ({ command, data = null }) =>
	new Promise((resolve, reject) => {
		chrome.runtime.sendMessage({ command, data }, (result) => {
			const Error = chrome.runtime.lastError;
			if (Error) {
				console.warn(`[Chrome Runtime Error]: ${Error.message}`);
				return reject();
			}
			return resolve(result);
		});
	});

/**
 * @description: background主动通信
 * @param {type}
 * @return {type}
 */
export const tabSendMessage = (tabs, options) =>
	new Promise((resolve, reject) => {
		const { id } = tabs[0];
		const Error = chrome.runtime.lastError;
		if (Error) {
			console.log(`[Chrome Tab Error]: ${Error.message}`);
			return reject();
		}
		chrome.tabs.sendMessage(id, options, resolve);
	});

/**
 * @description: 获取当前激活tab
 * @return {Tab}
 */
export const queryCurrentTab = () =>
	new Promise((resolve, reject) => {
		const Error = chrome.runtime.lastError;
		chrome.tabs.query({ active: true }, (tabs) => resolve(tabs));
		if (Error) {
			console.log(`[Chrome QueryTab Error]: ${Error.message}`);
			reject();
		}
	});
