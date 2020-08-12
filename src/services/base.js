/*
 * @Date: 2020-07-24 21:58:11
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-11 15:46:38
 * @Description: 封装原生chrome api
 */

/**
 * @description: 插件想background请求
 * @param {Object} 参数对象，属性随意
 * @return: who knoe?
 */
const sendMessage = (data) =>
	new Promise((resolve) => {
		chrome.runtime.sendMessage(data, resolve);
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
const createNotifiy = (id, options) =>
	new Promise((resolve) => {
		chrome.notifications.create(id, options, resolve);
	});

/**
 * @description: 获取插件内部资源
 * @param {String} path
 * @return {} resource
 */
const getURL = (path) => chrome.runtime.getURL(path);

export { sendMessage, createNotifiy, getURL };
