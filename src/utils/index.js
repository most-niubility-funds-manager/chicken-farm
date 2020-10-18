/*
 * @Date: 2020-07-22 13:50:14
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-10-18 16:53:01
 * @Description: 小工具
 */

/**
 * @description: 获取当天想要的精准时间 时间戳
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
 * @description: 获取n天前的时间戳
 * @param {Number} day
 * @return {Date} timestamp
 */
const getLastDay = (day = 1) => {
	const today = new Date(getPreciseTime());
	today.setDate(today.getDate() - day).getTime();
	return today;
};

/**
 * @description: 到点提醒
 * @param { Array } holidays
 * @param {String} hour
 * @param {String} minute
 * @return {Boolean}
 */
const arrivalRemind = async (holidays, hour = 14, minute = 55) => {
	const SETTING_TIME = getPreciseTime(hour, minute);
	const TODAY = getPreciseTime();
	const MINUTE = 1000 * 60;
	const CURRENT_TIME = Date.now();
	const DIFF = Math.abs(CURRENT_TIME - SETTING_TIME);
	const weekend = [0, 6]; //	周末的getDay

	const isHoliday = holidays.includes(TODAY) || weekend.includes(new Date().getDay());

	if (isHoliday || DIFF > MINUTE) {
		return false;
	}
	return true;
};

/**
 * @description: 时间格式输出
 * @param {Object} {timestamp, format}
 * @return {type}
 */
const convertDate = ({ timestamp, format = 0 }) => {
	const dateObj = new Date(timestamp);
	const year = dateObj.getFullYear();
	const month = dateObj.getMonth() + 1 > 9 ? dateObj.getMonth() + 1 : `0${dateObj.getMonth() + 1}`;
	const day = dateObj.getDate() > 9 ? dateObj.getDate() : `0${dateObj.getDate()}`;
	const hour = dateObj.getHours() > 9 ? dateObj.getHours() : `0${dateObj.getHours()}`;
	const minute = dateObj.getMinutes() > 9 ? dateObj.getMinutes() : `0${dateObj.getMinutes()}`;
	const second = dateObj.getSeconds() > 9 ? dateObj.getSeconds() : `0${dateObj.getSeconds()}`;

	const dateFormatMap = new Map([
		[0, `${month}-${day}`],
		[1, `${year}-${month}-${day} ${hour}:${minute}:${second}`],
		[2, `${month}月${day}日 ${hour}:${minute}`],
		[3, `${year}年${month}月${day}日 ${hour}:${minute}:${second}`],
	]);

	return dateFormatMap.get(format);
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

// 千分位
const thousandUnit = (num) => {
	const hasDecimal = num.toString().includes(".");
	const decimal = num.toString().split(".")[1];
	const main = num.toString().split(".")[0].split("");

	const format = main.reduceRight((str, v, i) => {
		const idx = main.length - i;
		const remainder = !(idx % 3);
		if (remainder && !!i) {
			return `,${v}${str}`;
		}
		return `${v}${str}`;
	}, "");

	const result = hasDecimal ? `${format}.${decimal}` : format;

	return result;
};

export {
	convertDate,
	getPreciseTime,
	getLastDay,
	shuffleData,
	calcDataPercent,
	arrivalRemind,
	sortData,
	exportTxt,
	thousandUnit,
};
