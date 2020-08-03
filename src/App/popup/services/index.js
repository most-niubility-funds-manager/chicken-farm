/*
 * @Date: 2020-07-21 18:23:52
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-02 11:09:51
 * @Description: 天天基金api
 */

import cheerio from "cheerio";
import { requestGet, fetchConvertGBK } from "./request";
import { indexedAdd, indexedFindAll, indexedFindSingle, indexedUpdate } from "./indexDB";
import { formatTime, calcDataPercent } from "../../../utils";
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
		return resultJson;
	} catch (error) {
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
const addAllFunds = (data) => {
	Promise.all(
		data.map(({ code }) =>
			indexedFindSingle({
				store: Constants.INDEX_STORE,
				table: Constants.INDEX_FUND,
				key: { k: "code", v: code },
			})
		)
	).then((res) => {
		const needAddIndex = res.reduce((arr, v, i) => {
			!v && arr.push(i);
			return arr;
		}, []);
		const addList = needAddIndex.map((v) => data[v]);

		return indexedAdd({ store: Constants.INDEX_STORE, table: Constants.INDEX_FUND, data: addList });
	});
};

/**
 * @description: 获取funds全部数据
 * @return: [{ code, name, unit, state, create }]
 */
const getFundsCode = async () => {
	const funds = await indexedFindAll({ store: Constants.INDEX_STORE, table: Constants.INDEX_FUND });
	const result = funds.filter(({ state }) => state).map(({ code }) => code);
	return result;
};

/**
 * @description: 获取全部funds的数据，整理成tableData格式
 * @param {Array} codes
 * @return: [{ name, crease, code, lastUnit, currUnit, totalShare, totalReckon, incomeReckon, update }]
 */
const fetchAllFunds = (codes) => {
	const requestMap = codes.map((v) => fetchSingleFund(v));
	return Promise.all(requestMap).then((res) => {
		const result = res.map((item) => {
			if (!item) {
				return null;
			}
			const { fundcode, dwjz, gsz, gszzl, gztime, jzrq, name } = item;

			return {
				name,
				code: fundcode,
				lastUnit: dwjz,
				currUnit: gsz,
				crease: Number(gszzl) > 0 ? `+${gszzl}%` : `${gszzl}%`,
				totalShare: "-",
				totalReckon: "-",
				incomeReckon: "-",
				update: formatTime(Date.now()),
			};
		});

		return result;
	});
};

/**
 * @description: 获取同花顺资讯
 * @return: [{ url, title }]
 */
const fetchNewsInfo = async () => {
	const url = "http://www.10jqka.com.cn/";

	const originHtml = await fetchConvertGBK(url);
	const $ = cheerio.load(originHtml);
	const eachPanel = $('[tpe-plugin="preview_wap_row"]');
	const dataList = [];

	eachPanel.each(function () {
		const items = $(this)
			.find("li a")
			.filter(function () {
				return $(this).text().trim().length;
			})
			.map(function () {
				return {
					title: $(this).text().trim(),
					url: $(this).attr("href"),
				};
			});
		dataList.push(...Array.from(items));
	});
	return dataList;
};

/**
 * @description: 基金经理信息
 * @param {String} code
 * @return: Array
 */
const fetchFundManager = async (code) => {
	const params = {
		url: `http://fundf10.eastmoney.com/jjjl_${code}.html`,
		type: "text",
	};

	const originHtml = await requestGet(params);
	const $ = cheerio.load(originHtml);
	const intro = Array.from(
		$(".jl_intro")
			.find(".text p")
			.map(function () {
				return $(this).text();
			})
	).slice(0, 3);

	return intro;
};

/**
 * @description: 基金公告信息
 * @param {String} code
 * @return: [{ title, url, data, type }]
 */
const fetchFundNews = async (code) => {
	const params = {
		url: `http://api.fund.eastmoney.com/f10/JJGG?fundcode=${code}&pageIndex=1&pageSize=10&type=0&_=${Date.now()}`,
		type: 'text'
	}
	
	const originData = await requestGet(params)
	console.log('基金公告有问题', originData)

	return []
}

/**
 * @description: 获取单个基金详细信息
 * @param {String} code
 * @return: { holdShares: { head, body }, pastUnit: { head, body }, manager: [], newsList: [{ url, title, date }] }
 */
const fetchFundDetail = async (code) => {
	const params = {
		url: `http://fund.eastmoney.com/${code}.html?spm=search`,
		type: "text",
	};

	const originHtml = await requestGet(params);
	const manager = await fetchFundManager(code);
	const newsList = await fetchFundNews(code)
	const $ = cheerio.load(originHtml);
	// 持仓分布
	const holdShares = [];
	$("#position_shares")
		.find("tr")
		.each(function () {
			const itemData = $(this)
				.find("td,th")
				.map(function () {
					return $(this).text().trim();
				});
			holdShares.push(Array.from(itemData).slice(0, 3));
		});
	// 往日净值
	const pastUnit = [];
	$("#Li1")
		.find("tr")
		.map(function () {
			const itemData = $(this)
				.find("td,th")
				.map(function () {
					return $(this).text().trim();
				});
			itemData.splice(1, 2);
			pastUnit.push(Array.from(itemData));
		});

	// 俩数据涨跌对应的比例
	const holdSharesPercent = calcDataPercent(holdShares.slice(1).map((v) => v[2]));
	const pastUnitPercent = calcDataPercent(pastUnit.slice(1).map((v) => v[1]));

	const result = {
		holdShares: {
			head: holdShares[0],
			body: holdShares
				.slice(1)
				.map((v, i) => [
					...v,
					{ value: holdSharesPercent[i].value, type: holdSharesPercent[i].type },
				]),
		},
		pastUnit: {
			head: pastUnit[0],
			body: pastUnit
				.slice(1)
				.map((v, i) => [...v, { value: pastUnitPercent[i].value, type: pastUnitPercent[i].type }]),
		},
		manager,
		newsList,
	};

	return result;
};

/**
 * @description: 从数据库获取单支基金信息
 * @param {String} code
 * @return: {  }
 */
const getUserSingleFundData = async (code) => {
	const data = await indexedFindSingle({
		store: Constants.INDEX_STORE,
		table: Constants.INDEX_FUND,
		key: { k: "code", v: code },
	});

	return data;
};

export {
	getLargeCap,
	getAllYearholiday,
	fetchSingleFund,
	convertCodeFetch,
	updateSingleFund,
	addAllFunds,
	getFundsCode,
	fetchAllFunds,
	fetchNewsInfo,
	fetchFundDetail,
	getUserSingleFundData,
};
