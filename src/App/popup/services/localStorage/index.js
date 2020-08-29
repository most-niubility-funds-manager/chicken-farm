/*
 * @Date: 2020-08-10 16:46:10
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-29 10:09:39
 * @Description: localStorage的基础方法封装
 */

// chicken-farm的用户配置  'fund-manager-config'
// config  用户配置 | hide 隐藏总收益 | sort {key: 0 无 1 降序 2 升序} | theme | notify | wideScreen | creaseReverse | sectionView
/**
 * @description: 插入
 * @param {String} key 键名
 * @param {String} value 键值
 * @param {String} type 类型
 */
const setLocal = (key, value, type = "json") => {
	const isJson = type === "json";
	const isExist = isJson ? getLocal(key) : getLocal(key, 'other');
	const data = isJson ? Object.assign({}, isExist, value) : value;

	localStorage.setItem(key, JSON.stringify(data));
};

/**
 * @description: 拿
 * @param {String} key 键名
 * @return {String}
 */
const getLocal = (key, type = "json") =>
	type === "json" ? JSON.parse(localStorage.getItem(key)) : localStorage.getItem(key);

/**
 * @description: 删
 * @param {String} key 键名
 */
const delLocal = (key) => localStorage.removeItem(key);

export { setLocal, getLocal, delLocal };
