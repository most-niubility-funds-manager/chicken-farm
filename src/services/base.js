/*
 * @Date: 2020-07-24 21:58:11
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-27 17:49:36
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
 * @description: 删除清理发出去的通知
 * @param {String} id
 * @return {Promise}
 */
const clearNotifiy = (id) =>
	new Promise((resolve) => {
		chrome.notifications.clear(id, resolve);
	});

/**
 * @description: 获取插件内部资源
 * @param {String} path
 * @return {} resource
 */
const getURL = (path) => chrome.runtime.getURL(path);

/**
 * @description:  插件存储云同步 get
 * @param {String} key 键名
 * @return {Promise}
 */
const syncGet = (key) =>
	new Promise((resolve, reject) => {
		try {
			chrome.storage.sync.get([key], (result) => resolve(result));
		} catch (error) {
			console.log("[Chrome Storage Error]", error);
			reject();
		}
	});

/**
 * @description: 插件数据同步存入
 * @param {Object} options 存入数据 {k : v}
 * @return {Promise}
 */
const syncSet = (options) =>
	new Promise((resolve, reject) => {
		try {
			chrome.storage.sync.set(options);
			resolve();
		} catch (error) {
			console.log("[Chrome Storage Error]", error);
			reject();
		}
	});

export { sendMessage, createNotifiy, clearNotifiy, getURL, syncGet, syncSet };
