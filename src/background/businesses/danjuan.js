/*
 * @Date: 2020-10-05 22:36:37
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-11-13 14:54:01
 * @Description: 蛋卷基金相关请求控制
 */
import store from "../model/store";
import {
	getFundBase,
	findFund,
	getLiveFundData,
	getFundDetailMain,
	getUserFunds,
	getDJFundValuation,
} from "../services/index";
import { getLocalUser } from "./account";
import { getPreciseTime } from "@utils";
import { sendMessage } from "@lib/chrome";
import Saga from "@lib/saga";

// 是否需要更新
const isDiffTime = (time) => {
	const today = new Date(getPreciseTime()).getTime();
	return time !== today;
};

// 大盘数据获取
export const fundBase = async (sendResponse) => {
	const codes = store.get("fundBaseCodes"); //  获取用户配置的大盘
	const data = await getFundBase(codes);
	sendResponse(data);
};

// 搜索基金
export const fundKeyword = async (keyword, sendResponse) => {
	const data = await findFund(keyword);
	sendMessage({ command: "setSearchData", data });

	sendResponse(data);
};

// 实时数据
export const getFundRealTimeData = async (codes, sendResponse) => {
	const liveData = await getLiveFundData({ codes });
	sendResponse(liveData);
};

// 更新基金详情数据
export const fetchEachFundDetail = async () => {
	const user = getLocalUser();
	const allCodes = await getUserFunds(user && user.uid);
	const codes = allCodes.map(({ code }) => code);

	Promise.all(codes.map((c) => getFundDetailMain(c))).then((datas) => {
		const originStoreHistory = store.get("fundHistory");
		const convertData = datas.reduce((obj, item, idx) => ({ ...obj, [codes[idx]]: item }), {});

		store.set("fundHistory", { ...originStoreHistory, ...convertData });
		store.set("expired", getPreciseTime());
	});
};

// 获取=基金实时估算净值
export const getFundValuation = async (code, sendResponse) => {
	const data = await getDJFundValuation(code);

	sendResponse(data);
};

// 每日定时获取基金详情数据
const pollFetchEachFund = async () => {
	const checkNowTime = () => {
		const current = store.get("expired");
		return isDiffTime(current);
	};
	const timeSaga = new Saga(checkNowTime);

	timeSaga.start((needUpdate) => {
		if (needUpdate) {
			fetchEachFundDetail();
		}
	}, 30000);
};

pollFetchEachFund();
