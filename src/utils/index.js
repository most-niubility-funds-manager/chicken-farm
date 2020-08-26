/*
 * @Date: 2020-07-22 13:50:14
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-26 14:03:27
 * @Description: 小工具
 */

import Constants from "../constants";
import { getAllYearholiday } from "../App/popup/services";

/**
 * @description: 递归请求，获取到结果后继续请求
 * @param {String || Array} fns 请求方法名,或不同方法列表  single || multi
 * @param {Function} check 中断方法 返回布尔值（目前只支持多方法使用一种判断）
 * @param {Number} time 请求时间间隔
 * @param {Function} callback any
 * @return: void
 */
const requestRecursion = async ({ fns, check, time = 1000, callback }) => {
	const isArray = Array.isArray(fns); //  判断是否是方法列表
	let result;
	if (isArray) {
		result = [];
		for (const fn of fns) {
			const res = await fn();
			result.push(res);
		}
	} else {
		result = await fns();
	}

	// 先判断是否是未结束的Promise
	if (Object.prototype.toString.call(result) !== "[object Promise]") {
		callback(result);

		if (check()) {
			return;
		}

		setTimeout(() => {
			return requestRecursion({ fns, check, time, callback });
		}, time);
	}
};

/**
 * @description: 获取当前想要的精准时间 时间戳
 * @param {Number} hour
 * @param {Number} minute
 * @param {Number} second
 * @param {Number} microsecond
 * @return: timestamp
 */
const getPreciseTime = (hour = 0, minute = 0, second = 0, micro = 0) => {
	return new Date(new Date().setHours(hour, minute, second, micro)).getTime();
};

/**
 * @description: 判断当前开盘状态
 * @return: boolean
 */
const checkFundOpen = async () => {
	const MORNING_START = getPreciseTime(9, 30);
	const MORNING_END = getPreciseTime(11, 30);
	const AFTERNOON_START = getPreciseTime(13);
	const AFTERNOON_END = getPreciseTime(15);
	const CURRENT_TIME = Date.now();
	const TODAY = getPreciseTime();
	const weekend = [0, 6]; //	周末的getDay

	const holidays = await getAllYearholiday();
	const isHoliday = holidays.includes(TODAY) || weekend.includes(new Date().getDay());

	if (isHoliday || MORNING_START > CURRENT_TIME || CURRENT_TIME > AFTERNOON_END) {
		return Constants.MARKET_CLOSE;
	} else if (CURRENT_TIME > MORNING_END && CURRENT_TIME < AFTERNOON_START) {
		return Constants.MARKET_NOON;
	}
	return Constants.MARKET_OPEN;
};

/**
 * @description: 判断当日是否闭市
 * @return: 返回Boolean
 */
const isMarketOpen = async () => {
	const MORNING_START = getPreciseTime(9, 30);
	const AFTERNOON_END = getPreciseTime(15);
	const TODAY = getPreciseTime();
	const CURRENT_TIME = Date.now();
	const weekend = [0, 6]; //	周末的getDay

	const holidays = await getAllYearholiday();
	const isHoliday = holidays.includes(TODAY) || weekend.includes(new Date().getDay());

	if (isHoliday || CURRENT_TIME < MORNING_START || CURRENT_TIME > AFTERNOON_END) {
		return false;
	}
	return true;
};

/**
 * @description: 到点提醒
 * @param {String} hour
 * @param {String} minute
 * @return {Boolean}
 */
const arrivalRemind = async (hour = 14, minute = 55) => {
	const SETTING_TIME = getPreciseTime(hour, minute);
	const TODAY = getPreciseTime();
	const MINUTE = 1000 * 60;
	const CURRENT_TIME = Date.now();
	const DIFF = Math.abs(CURRENT_TIME - SETTING_TIME);
	const weekend = [0, 6]; //	周末的getDay

	const holidays = await getAllYearholiday();
	const isHoliday = holidays.includes(TODAY) || weekend.includes(new Date().getDay());

	if (isHoliday || DIFF > MINUTE) {
		return false;
	}
	return true;
};

/**
 * @description: 时间格式转换(死板)，传入正常的时间数据就行
 * @param {String|Number} param
 * @return: eg: 07-28 00:00
 */
const formatTime = (param) => {
	const date = new Date(param);
	const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
	const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
	const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
	const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

	return `${month}-${day} ${hour}:${minute}`;
};

/**
 * @description: 洗牌算法 打乱原数组
 * @param {Array} data
 * @return: []
 */
const shuffleData = (data) => {
	let length = data.length,
		i;
	while (length) {
		i = (Math.random() * length--) >>> 0;
		[data[length], data[i]] = [data[i], data[length]];
	}
	return data;
};

/**
 * @description: 算出一组数值的占比，及涨跌
 * @param {Array} data
 * @return: [{ value, type }] false - true +
 */
const calcDataPercent = (data) => {
	const pureData = data.map((v) => v.replace("%", "").replace("--", 0));
	const MAX_NUMBER = pureData.map((v) => Math.abs(v)).sort((a, b) => b - a)[0] || 1;
	const result = pureData.map((v) => ({
		value: Math.abs(v / MAX_NUMBER).toFixed(2) * 100,
		type: !/-/.test(v),
	}));

	return result;
};

/**
 * @description: 排序函数
 * @param {Array} data 元数据
 * @param {String} datakey key_type
 * @return {Array} 怎么来 怎么回
 */
const sortData = (data, datakey) => {
	const [key, type] = datakey.split("_");
	if (type * 1 === 0) {
		return data;
	}

	const tempData = data.sort((a, b) => {
		if (key === "name") {
			return a[key].localeCompare(b[key], "zh-Hans-CN", { sensitivity: "base" });
		} else if (key === "crease") {
			const aValue = a[key] && a[key].replace(/[+|-|%]/g, "") * 1;
			const bValue = b[key] && b[key].replace(/[+|-|%]/g, "") * 1;
			return bValue - aValue;
		} else if (key === "incomeReckon") {
			const aValue = a[key] * 1;
			const bValue = b[key] * 1;
			return bValue - aValue;
		}
	});

	return type * 1 === 1
		? tempData
		: tempData.reduce((arr, cur) => {
				arr.unshift(cur);
				return arr;
		  }, []);
};

/**
 * @description: 生成txt文件
 * @param {String} title 文件名
 * @param {String} content 文件内容
 */
const exportTxt = (title, content) => {
	const aEl = document.createElement("a");
	aEl.setAttribute(
		"href",
		`data:text/plain;charset=utf-8,${encodeURIComponent(
			content + "   全选复制所有数据，粘贴至 右下角菜单 -> 导入数据 中"
		)}`
	);
	aEl.setAttribute("download", `${title}${new Date().toLocaleDateString().replace(/\//g, "_")}`);

	aEl.style.display = "none";
	document.body.appendChild(aEl);

	aEl.click();
	document.body.removeChild(aEl);
};

export {
	requestRecursion,
	checkFundOpen,
	isMarketOpen,
	formatTime,
	shuffleData,
	calcDataPercent,
	arrivalRemind,
	sortData,
	exportTxt,
};
