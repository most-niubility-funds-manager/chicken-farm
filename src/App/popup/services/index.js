/*
 * @Date: 2020-07-21 18:23:52
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-07-27 00:16:12
 * @Description: 天天基金api
 */

import { requestGet, sendMessage } from "./request";
import { indexedAdd, indexedFindAll, indexedFindSingle } from "./indexDB";
import Constants from "../../../constants";

/**
 * @description: 获取四大板块的接口
 * @return: Array [{ name, total, count, percent, code }]
 */
const getLargeCap = async () => {
	const params = {
		url: `https://push2.eastmoney.com/api/qt/ulist.np/get`,
		params: {
			fltt: 2,
			fields: "f2,f3,f4,f12,f14",
			secids: "1.000001,1.000300,0.399001,0.399006",
			_: Date.now(),
		},
	};
	const {
		data: { diff },
	} = await requestGet(params);

	return diff.map(({ f2, f3, f4, f12, f14 }) => ({
		name: f14, //  版块名称
		total: f2, //  总量
		percent: f3.toFixed(2), //  涨跌百分比
		count: f4, //  涨跌点数
		code: f12, //  财富代码
	}));
};

/**
 * @description: 请求数据
 * @return: data
 */
const fetchAllYearholiday = async () => {
	const { COMMANDS } = Constants;

	const parms = {
		url: "https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php",
		params: {
			query: new Date().getFullYear(),
			resource_id: 6018,
		},
		method: "get",
	};

	const { data } = await sendMessage({ command: COMMANDS.REQUEST, data: parms });

	return data;
};

/**
 * @description: 获取今年全年的节假日，筛去周末
 * @return: 返回全年节假日时间戳
 */
const getAllYearholiday = async () => {
	const currYear = new Date().getFullYear();
	let resultData;
	try {
		const { data } = await indexedFindSingle({
			store: Constants.INDEX_STORE,
			table: Constants.INDEX_HOLIDAY,
			key: { k: "year", v: currYear },
		});
		resultData = [...data];
	} catch (e) {
		console.log("数据库错误", e);
		
		const originData = await fetchAllYearholiday();
		const { holiday } = originData[0];
		const weekend = [0, 6]; //	周末的getDay
		resultData = holiday.reduce((times, { list }) => {
			const subDays = list
				.filter(({ date }) => {
					const dateObject = new Date(date);
					const currDay = dateObject.getDay();
					const isWeekend = weekend.includes(currDay); //	周末休市
					return !isWeekend;
				})
				.map(({ date }) => new Date(date).getTime()); //	输出时间戳

			times.push(...subDays);
			return times;
		}, []);

		resultData = [...new Set(resultData)]

		// 存数据库中
		const params = {
			year: currYear,
			data: resultData,
		};
		indexedAdd({ store: Constants.INDEX_STORE, table: Constants.INDEX_HOLIDAY, data: [params] });
	}

	return resultData; //	去重
};

export { getLargeCap, getAllYearholiday };
