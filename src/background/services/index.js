/*
 * @Date: 2020-10-05 23:00:41
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-11-20 11:57:51
 * @Description: 数据请求的操作
 */
// 大盘数据
import cheerio from "cheerio";
import Http from "@lib/fetch";
import store from "../model/store";
import {
	FUNDBASE,
	HOLIDAY,
	ALLFUNDS,
	FUNDSEARCH,
	ADDFUND,
	ADDBATCHFUNDS,
	FUNDLIVE,
	UPDATEFOLLOW,
	UPDATEHOLD,
	FUNDMAIN,
	OLDBATCHADDFUNDS,
	FUNDSTOCK,
	FUNDTREND,
	FUNDVALUATION,
	DELETEFUND,
	SORTFUND,
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
	const storeCodes = store.get("allCodes");
	let result = storeCodes;
	if (!storeCodes.length) {
		const { data } = await Http.get(ALLFUNDS, { uid });
		store.set("allCodes", data);
		result = data;
	}

	return result;
};

// 清空background的codes
export const deleteUserFunds = () => store.set("allCodes", []);

// 更新codes
export const updateUserFunds = async (uid) => {
	deleteUserFunds();
	uid && (await getUserFunds(uid));
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
	return { status };
};

// 批量添加基金
export const fundAddBatch = async ({ uid, codes }) => {
	const { status } = await Http.post(ADDBATCHFUNDS, { uid, codes: JSON.stringify(codes) });
	Promise.all(codes.map((c) => getFundDetailMain(c))); //	批量添加的基金详情数据

	return { status };
};

// 批量添加老版本基金数据
export const oldFundAddBatch = async ({ uid, codes }) => {
	const fundsRealData = await getLiveFundData({ codes: codes.map(({ code }) => code) });
	const result = fundsRealData.map(({ code, realUnit }, idx) => ({
		code,
		unit: realUnit,
		cost: codes[idx].unit,
	}));
	const { status } = await Http.post(OLDBATCHADDFUNDS, { uid, data: JSON.stringify(result) });
	await Promise.all(codes.map(({ code }) => getFundDetailMain(code))); //	批量添加的基金详情数据
	await updateUserFunds(uid);

	return { status };
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

// 取关或回关
export const updateFollow = async ({ uid, code, state, cost }) => {
	const { status } = await Http.post(UPDATEFOLLOW, { uid, code, state, cost });
	return { status };
};

// 修改持有
export const updateHold = async ({ uid, code, cost, unit }) => {
	const { status } = await Http.post(UPDATEHOLD, { uid, code, cost, unit });
	return { status };
};

// 天天基金获取重仓股票
export const getFundStock = async (code) => {
	const html = await Http.get(FUNDSTOCK(code), {}, "text");
	const $ = cheerio.load(/"(.*)"/g.exec(html)[1]);
	const holdData = [];
	const gpdmList = $("#gpdmList").eq(0).text();
	const tempCodes = gpdmList.split(",");
	tempCodes.pop();
	const codes = tempCodes.map((v) => v.split(".")[1]);

	$(".tzxq tbody tr").each(function (i) {
		const code = codes[i];
		const name = $(this).find("td").eq(2).text();
		const percent = $(this).find("td").eq(6).text();

		holdData.length < 10 && holdData.push({ code, name, percent });
	});

	const params = {
		fltt: 2,
		invt: 2,
		fields: "f2,f3,f12,f14,f9",
		secids: gpdmList,
		_: Date.now(),
	};
	const { data } = await Http.get(FUNDBASE, params);

	if (data) {
		const result = holdData
			.map((v, i) => {
				const { f3: crease = 0, f2: price = 0 } = data.diff.find(({ f12 }) => v.code === f12) || {};
				return { ...v, crease, price };
			})
			.reduce(
				(arr, { name, percent, crease, price, code }) => [
					...arr,
					[name, percent, crease > 0 ? `+${crease}%` : `${crease}%`, price, code],
				],
				[]
			);

		return result;
	}

	return null;
};

// 蛋卷基金走势图 有的有 无的无
export const getFundTrend = async (code) => {
	const days = [30, 90, 180, 360];
	const datas = await Promise.all(days.map((d) => Http.get(FUNDTREND(code), { day: d })));
	const noData = datas.some(({ data }) => !Object.keys(data).length);

	if (noData) return null;

	const result = datas.reduce(
		(obj, { data: { fund_nav_growth } }, idx) => ({ ...obj, [days[idx]]: fund_nav_growth }),
		{}
	);

	return result;
};

// 天天基金获取主要数据
export const getFundDetailMain = async (code) => {
	const html = await Http.get(FUNDMAIN(code), {}, "text");
	const $ = cheerio.load(html);
	// 基金类型
	const fundType = $(".infoOfFund td")
		.eq(0)
		.text()
		.replace(/(基金类型：)|\s+/g, "")
		.split("|");
	// 基金成立日期
	const fundEstablishDate = $(".infoOfFund tr")
		.eq(1)
		.find("td")
		.eq(0)
		.text()
		.replace(/成 立 日：/g, "");
	// 基金规模
	const fundScale = $(".infoOfFund td")
		.eq(1)
		.text()
		.replace(/基金规模：(.*)（(.*)）/g, (match, $1) => $1);
	// 历史净值
	const fundHistoryWorth = $("#Li1 tbody tr")
		.toArray()
		.map((tr) =>
			$(tr)
				.find("td")
				.toArray()
				.map((td) => $(td).text().replace(/\s+/g, ""))
		)
		.slice(1);

	// 历史业绩
	const hasTrackTr =
		$("#increaseAmount_stage").find("tr").eq(4).find(".typeName").text() !== "同类排名";
	const fundHistoryPerformance = {
		time: $("#increaseAmount_stage")
			.find("tr")
			.eq(0)
			.find("th")
			.toArray()
			.map((th) => $(th).text().replace(/\s+/g, ""))
			.slice(1),
		crease: $("#increaseAmount_stage")
			.find("tr")
			.eq(1)
			.find("td")
			.toArray()
			.map((td) => $(td).text().replace(/\s+/g, ""))
			.slice(1),
		rank: $("#increaseAmount_stage")
			.find("tr")
			.eq(hasTrackTr ? 5 : 4)
			.find("td")
			.toArray()
			.map((td) => $(td).text().replace(/\s+/g, "").split("|"))
			.slice(1),
	};
	// 重仓股票
	const stocks = await getFundStock(code);
	// 基金走势
	const trend = await getFundTrend(code);

	// 目前所有结果
	const result = {
		type: fundType,
		establish: fundEstablishDate,
		scale: fundScale,
		historyWorth: fundHistoryWorth,
		historyPerformance: fundHistoryPerformance,
		stocks,
		trend,
	};

	return result;
};

// 蛋卷实时估算净值
export const getDJFundValuation = async (code) => {
	try {
		const {
			data: { items },
		} = await Http.get(FUNDVALUATION(code));

		return items;
	} catch (error) {
		return [];
	}
};

// popup获取详情数据
export const getDetail = async (code) => {
	const fundHistoryStore = store.get("fundHistory");
	const detail = fundHistoryStore[code];

	return detail;
};

// 批量删除基金
export const batchDelete = async (id) => {
	const { state } = await Http.post(DELETEFUND, { id: JSON.stringify(id) });

	return state;
};

// 修改排序
export const updateSort = async (code) => {
	const { state } = await Http.post(SORTFUND, { code: JSON.stringify(code) });

	return state;
};
