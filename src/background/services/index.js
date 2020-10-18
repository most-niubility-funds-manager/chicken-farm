/*
 * @Date: 2020-10-05 23:00:41
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-10-18 15:40:30
 * @Description: 数据请求的操作
 */
// 大盘数据
import Http from "@lib/fetch";
import {
	FUNDBASE,
	FUNDHISTORY,
	HOLIDAY,
	ALLFUNDS,
	DERIVED,
	FUNDSEARCH,
	ADDFUND,
	FUNDLIVE,
} from "../api";

// 获取大盘数据
export const getFundBase = async (codes) => {
	const {
		data: { diff },
	} = await Http.get(FUNDBASE, {
		secids: codes.join(),
		fields: "f2,f3,f4,f12,f14",
		fltt: 2,
		_: Date.now(),
	});
	const result = diff.map(({ f2, f3, f4, f12, f14 }) => ({
		name: f14,
		count: f4,
		current: f2,
		percent: f3.toString().includes("-") ? `${f3}%` : `+${f3}%`,
		code: f12,
	}));

	return result;
};

// 获取基金历史日增值 10天数据
export const getFundHistory = async (code) => {
	const { data: items } = await Http.get(`${FUNDHISTORY}${code}`, { page: 1, size: 10 });
	const result = items.map((v) => ({
		...v,
		percentage: v.percentage.toString().includes("-") ? `${v.percentage}%` : `+${v.percentage}%`,
	}));

	return result;
};

// 获取当年的节假日
export const getHoliday = async () => {
	const currentYear = new Date().getFullYear();

	const { data: originData } = await Http.get(HOLIDAY, {
		query: currentYear,
		resource_id: 6018,
	});
	const { holiday: holidays } = originData[0];
	const weekend = [0, 6]; //	周末的getDay
	const formatData = holidays.reduce((times, { list }) => {
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

	return [...new Set(formatData)];
};

// 获取用户的所有基金
export const getUserFunds = async (uid) => {
	const { data } = await Http.get(ALLFUNDS, { uid });

	return data;
};

// 获取上个交易日时间
export const getLastTradeTime = async () => {
	const {
		data: { end_date },
	} = await Http.get(`${DERIVED}000001`); //	用华夏成长混合的code
	const tempArr = end_date.split("-");
	tempArr.shift();
	const endTime = tempArr.join("-");

	return endTime;
};

// 基金搜索
export const findFund = async (key) => {
	const { Datas } = await Http.get(FUNDSEARCH, { key, m: 1, _: Date.now() });
	const result = Datas.filter(
		({ CATEGORY }) => CATEGORY === 700
	).map(({ CODE, NAME, FundBaseInfo: { DWJZ } }) => ({ code: CODE, name: NAME, value: DWJZ }));

	return result;
};

// 添加基金
export const fundAdd = async ({ uid, code }) => {
	const { status } = await Http.post(ADDFUND, { uid, code });
	return {
		status,
	};
};

// 实时获取基金数据 - 天天基金
export const getLiveFundData = async ({ codes }) => {
	const params = {
		pageIndex: 1,
		pageSize: codes.length,
		plat: "Android",
		appType: "ttjj",
		product: "EFund",
		Version: 1,
		deviceid: 1,
		Fcodes: codes.join(),
	};
	console.log('什么参数', params, codes)

	try {
		const { Datas } = await Http.get(FUNDLIVE, params);
		const result = Datas.map(
			({
				FCODE: code,
				GSZ: fakeUnit,
				GSZZL: fakePercent,
				NAV: realUnit,
				NAVCHGRT: realPercent,
				SHORTNAME: name,
			}) => ({
				name,
				code,
				fakeUnit,
				fakePercent,
				realUnit,
				realPercent,
			})
		);

		return result;
	} catch (error) {
		return [];
	}
};
