/*
 * @Date: 2020-07-21 18:23:52
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-07-29 14:55:03
 * @Description: 天天基金api
 */

import { requestGet } from "./request";
import { indexedAdd, indexedFindAll, indexedFindSingle, indexedUpdate } from "./indexDB";
import { formatTime } from "../../../utils";
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
	const params = {
		url: "https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php",
		params: {
			query: new Date().getFullYear(),
			resource_id: 6018,
		},
	};

	const { data } = await requestGet(params);

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

		resultData = [...new Set(resultData)];

		// 存数据库中
		const params = {
			year: currYear,
			data: resultData,
		};
		indexedAdd({ store: Constants.INDEX_STORE, table: Constants.INDEX_HOLIDAY, data: [params] });
	}

	return resultData; //	去重
};

/**
 * @description: 查询单个基金代码数值
 * @param {String} code
 * @return: null | Object
 */
const fetchSingleFund = async (code) => {
	const params = {
		url: `http://fundgz.1234567.com.cn/js/${code}.js`,
		params: {
			rt: Date.now(),
		},
		type: "text",
	};

	try {
		const result = await requestGet(params);
		const noFindReg = /doctype/g;
		const jsonp = /\{.*?\}/g;
		if (noFindReg.test(result)) {
			return null;
		}

		let tempData = result.match(jsonp, (match) => match)[0];
		tempData = tempData.replace(/\{|\}|"/g, "");
		tempData = tempData.split(",");
		const resultJson = tempData.reduce((obj, value) => {
			const [k, v] = value.split(":");
			obj[k] = v;
			return obj;
		}, {});
		console.log("鸡精数据", resultJson);
		return resultJson;
	} catch (error) {
		console.log(
			"result.match(jsonp, (match) => match)",
			result.match(jsonp, (match) => match)
		);
		console.log("查询基金代码出错", error);
		return null;
	}
};

/**
 * @description: UI层传入解析后的数组，统一进行请求，给出code对应数据，及请求失败的code对应原因
 * @param {Array} codes
 * @return: { succ: [{ name, code, lastUnit, currUnit, range, time }], fail: [code] }
 */
const convertCodeFetch = (codes) =>
	Promise.all(codes.map((v) => fetchSingleFund(v))).then((datas) => {
		// 传回null数据 对应的下标
		const emptyDataIndex = datas.reduce((arr, curr, idx) => {
			curr === null && arr.push(idx);
			return arr;
		}, []);
		// 成功
		const succDatas = datas
			.filter((v) => v)
			.map(({ fundcode, dwjz, gsz, gszzl, gztime, jzrq, name }) => ({
				name,
				code: fundcode,
				lastUnit: dwjz,
				currUnit: gsz,
				range: gszzl,
				time: formatTime(Date.now()),
			}));
		// 或失败
		const failDatas = emptyDataIndex.map((idx) => codes[idx]);

		const result = {
			succ: succDatas,
			fail: failDatas,
		};

		return result;
	});

/**
 * @description: funds表 添加|更新 单个数据
 * @param {Object} data { code, name, unit, state, create }
 * @return: Promise
 */
const updateSingleFund = (data) =>
	indexedUpdate({
		store: Constants.INDEX_STORE,
		table: Constants.INDEX_FUND,
		data,
	});

/**
 * @description: 添加多个基金
 * @param {Array} data [{ code, name, unit, state, create }]
 * @return: Promise.resolve
 */
const addAllFunds = (data) =>
	indexedAdd({ store: Constants.INDEX_STORE, table: Constants.INDEX_FUND, data });

export {
	getLargeCap,
	getAllYearholiday,
	fetchSingleFund,
	convertCodeFetch,
	updateSingleFund,
	addAllFunds,
};
