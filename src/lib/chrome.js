/*
 * @Date: 2020-09-24 15:04:54
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-11-02 22:43:07
 * @Description: chrome 基础api封装
 */

/**
 * @description: popup | options 与background通信
 * @param {Object} { command, data = null }
 * @return {Any}
 */
export const sendMessage = ({ command, data = null }) =>
	new Promise((resolve) => {
		chrome.runtime.sendMessage({ command, data }, (result) => {
			const Error = chrome.runtime.lastError;
			if (Error) {
				console.info(`[Chrome Runtime Error]: ${Error.message}`);
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
	new Promise((resolve) => {
		const { id } = tabs[0];
		const Error = chrome.runtime.lastError;
		if (Error) {
			console.info(`[Chrome Tab Error]: ${Error.message}`);
		}
		chrome.tabs.sendMessage(id, options, resolve);
	});

/**
 * @description: 获取当前激活tab
 * @return {Tab}
 */
export const queryCurrentTab = () =>
	new Promise((resolve) => {
		const Error = chrome.runtime.lastError;
		chrome.tabs.query({ active: true }, (tabs) => resolve(tabs));
		if (Error) {
			console.info(`[Chrome QueryTab Error]: ${Error.message}`);
		}
	});

/**
 * @description: 创建通知
 * @param {String} id 可选指定id或默认id
 * type:
 * - basic
 *  * icon, title, message, expandedMessage, up to two buttons
 * - image
 *  * icon, title, message, expandedMessage, image, up to two buttons
 * - list
 *  * icon, title, message, items, up to two buttons. Users on Mac OS X only see the first item.
 * - progress
 *  * icon, title, message, progress, up to two buttons
 * @param {Object} options { type, iconUrl, title, message, contextMessage, priority: -2 ~ 2优先级, buttons: [{iconUrl, title}] }
 * @return {Promise} resolve
 */
export const createNotifiy = (id, options) =>
	new Promise((resolve) => {
		chrome.notifications.create(id, options, resolve);
	});

/**
 * @description: 删除清理发出去的通知
 * @param {String} id
 * @return {Promise}
 */
export const clearNotifiy = (id) =>
	new Promise((resolve) => {
		chrome.notifications.clear(id, resolve);
	});

/**
 * @description: 获取插件内部资源
 * @param {String} path
 * @return {} resource
 */
export const getURL = (path) => chrome.runtime.getURL(path);