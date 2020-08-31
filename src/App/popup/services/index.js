/*
 * @Date: 2020-07-21 18:23:52
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-31 12:03:50
 * @Description: 天天基金api
 */

import cheerio from "cheerio";
import { requestGet, fetchConvertGBK, sendMessage } from "./request";
import {
	indexedAdd,
	indexedFindAll,
	indexedFindSingle,
	indexedUpdate,
	indexedDelete,
} from "./indexDB";
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
 * @return: { succ: [{ name, code, lastUnit, currUnit, crease, time }], fail: [code] }
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
				crease: gszzl,
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
 * @description: 使用接口进行单个基金模糊查询 CATEGORY 700为可添加基金
 * @param {String} keyword
 * @return {Array} data
 */
const fundFuzzyFetch = async (keyword) => {
	const param = {
		url: `https://fundsuggest.eastmoney.com/FundSearch/api/FundSearchAPI.ashx`,
		params: {
			m: 1,
			key: keyword,
		},
	};

	const { Datas } = await requestGet(param);
	const result = Datas.map(({ CODE, NAME, CATEGORYDESC, CATEGORY }) => ({
		name: NAME,
		code: CODE,
		category: CATEGORYDESC,
		type: CATEGORY,
	}));

	return result;
};

/**
 * @description: funds表 添加|更新 单个数据
 * @param {Object} data { code, name, unit, state, create }
 * @return: Promise
 */
const updateSingleFund = async (data, key) => {
	// 先获取此记录全部数据 再更新(需包含主键id)
	return indexedFindSingle({
		store: Constants.INDEX_STORE,
		table: Constants.INDEX_FUND,
		data,
		key,
	}).then((indexData) => {
		const { id, name, code, state, unit } = indexData;
		return indexedUpdate({
			store: Constants.INDEX_STORE,
			table: Constants.INDEX_FUND,
			data: { name, code, state, id, unit, ...data },
		});
	});
};

/**
 * @description: 导入数据的修改判断
 * @param {Array} data
 */
const updateFundByImport = async (data) => {
	// 获取数据库中匹配的数据 无为null
	return Promise.all(
		data.map(({ code }) =>
			indexedFindSingle({
				store: Constants.INDEX_STORE,
				table: Constants.INDEX_FUND,
				key: { k: "code", v: code },
			})
		)
	).then((indexDatas) => {
		console.log("数据库中数据", indexDatas, data);
		return indexDatas.map((fund, idx) => {
			if (fund) {
				return indexedUpdate({
					store: Constants.INDEX_STORE,
					table: Constants.INDEX_FUND,
					data: { ...fund, ...data[idx] },
				});
			} else {
				return indexedAdd({
					store: Constants.INDEX_STORE,
					table: Constants.INDEX_FUND,
					data: [{ ...data[idx] }],
				});
			}
		});
	});
};

/**
 * @description: 添加多个基金
 * @param {Array} data [{ code, name, unit, state, create }]
 * @return: Promise.resolve
 */
const addAllFunds = async (data) => {
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
	const result = funds.filter(({ state }) => state).map(({ code, unit }) => ({ code, unit }));
	return result;
};

/**
 * @description: 获取全部funds的数据，整理成tableData格式
 * @param {Array} codes
 * @return: [{ name, crease, code, lastUnit, currUnit, totalShare, totalAmount, incomeReckon, update }]
 */
const fetchAllFunds = (codes) => {
	const requestMap = codes.map(({ code }) => fetchSingleFund(code));
	return Promise.all(requestMap).then((res) => {
		const result = res.map((item, i) => {
			if (!item) {
				return { code: codes[i] };
			}
			const { fundcode, dwjz, gsz, gszzl, gztime, jzrq, name } = item;
			const totalShare = codes.filter(({ code }) => fundcode === code)[0].unit;
			const incomeCalc = ((dwjz * totalShare * gszzl) / 100).toFixed(2);
			const incomeReckon = totalShare ? (incomeCalc > 0 ? `+${incomeCalc}` : incomeCalc) : "0.00";
			const totalAmount = totalShare ? (dwjz * totalShare).toFixed(2) : "-";

			return {
				name,
				code: fundcode,
				lastUnit: dwjz,
				currUnit: gsz,
				crease: Number(gszzl) > 0 ? `+${gszzl}%` : `${gszzl}%`,
				totalShare: totalShare || 0.0,
				totalAmount,
				incomeReckon: incomeReckon,
				update: formatTime(Date.now()),
			};
		});

		return result;
	});
};

/**
 * @description: 获取同花顺资讯 今日资讯 http://www.10jqka.com.cn/ gbk | 实时资讯 https://news.10jqka.com.cn/tapp/news/push/stock/?page=1&tag=&track=website&pagesize=50
 * @return: [{ url, title }]
 */
const fetchNewsInfo = async () => {
	const url =
		"https://news.10jqka.com.cn/tapp/news/push/stock/?page=1&tag=&track=website&pagesize=50";
	const {
		data: { list },
	} = await requestGet({ url });
	const result = list.map(({ title, url }) => ({ title, url }));

	return result;
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
		url: `http://api.fund.eastmoney.com/f10/JJGG?fundcode=${code}&pageIndex=1&pageSize=10&type=0&_=${Date.now()}&chicken-farm=true`,
	};
	const typeMap = new Map([
		[1, "发行运作"],
		[6, "其他公告"],
		[3, "定期报告"],
		[4, "人事调整"],
		[5, "基金销售"],
		[6, "其他公告"],
	]);
	let result = [];

	try {
		const { Data } = await requestGet(params);
		result = Data.map(({ PUBLISHDATEDesc, TITLE, ID, NEWCATEGORY }) => ({
			title: TITLE,
			url: `http://fund.eastmoney.com/gonggao/${code},${ID}.html`,
			type: typeMap.get(NEWCATEGORY * 1),
			time: PUBLISHDATEDesc,
		}));
	} catch (error) {
		console.log("基金公告有问题", error);
	}

	return result;
};

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
	const newsList = await fetchFundNews(code);
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

			const sliceData = Array.from(itemData).slice(0, 3);
			holdShares.push(sliceData.length < 3 ? ["暂无数据", "暂无数据", "暂无数据"] : sliceData);
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
			head: holdShares[0] || [], //	那边需要渲染 避免报错
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

/**
 * @description: 删除基金
 * @param {String} code
 */
const deleteSingleFund = async (code) => {
	const result = await indexedDelete({
		store: Constants.INDEX_STORE,
		table: Constants.INDEX_FUND,
		key: { k: "code", v: code },
	});

	return result;
};

/**
 * @description: 获取用户云端配置
 * @param { String } key 键名
 * @return {Promise<Object>} 键值
 */
const getSyncStorage = async (key) =>
	sendMessage({ command: Constants.COMMANDS.SYNC_GET, data: key });

/**
 * @description:  设置云端配置
 * @param {Object} { k: v }
 */
const setSyncStorage = async (data) => sendMessage({ command: Constants.COMMANDS.SYNC_SET, data });

/**
 * @description: 同步基金数据啊，在数据发生变化的事件中加入
 */
const syncFundsActively = async () => {
	const funds = await getFundsCode();
	const result = {};
	result[Constants.SYNC_FUNDS] = funds;

	console.log('同步数据', result)
	setSyncStorage(result);
};

export {
	getLargeCap,
	getAllYearholiday,
	fetchSingleFund,
	convertCodeFetch,
	fundFuzzyFetch,
	updateSingleFund,
	addAllFunds,
	getFundsCode,
	fetchAllFunds,
	fetchNewsInfo,
	fetchFundDetail,
	getUserSingleFundData,
	deleteSingleFund,
	getSyncStorage,
	setSyncStorage,
	syncFundsActively,
	updateFundByImport,
};
