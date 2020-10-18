/*
 * @Date: 2020-10-05 22:36:37
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-10-18 15:35:40
 * @Description: 蛋卷基金相关请求控制
 */
import store from "../model/store";
import { getFundBase, getFundHistory, findFund, getLiveFundData } from "../services/index";
import { getLastDay, getPreciseTime } from "@utils";
import { queryCurrentTab, tabSendMessage } from "@lib/chrome";

// 是否需要更新
const isDiffTime = (time) => {
	const today = new Date(getPreciseTime());
	return time !== today;
};

//  所有基金历史日增值数据
export const fundHistory = async (code, sendResponse) => {
	const expired = store.get("expired") || getLastDay(); //  若无 获取昨日时间戳
	const history = store.get("fundHistory");
	const historyData = history[code] || null;

	if (isDiffTime(expired) || !historyData) {
		const currentData = await getFundHistory(code);
		// code value 键值对数组
		store.set("fundHistory", { ...history, [code]: { ...currentData } });
		store.set("expired", getPreciseTime());
		sendResponse(currentData);
	} else {
		sendResponse(historyData);
	}
};

// 大盘数据获取
export const fundBase = async (sendResponse) => {
	const codes = store.get("fundBaseCodes"); //  获取用户配置的大盘
	const data = await getFundBase(codes);
	sendResponse(data);
};

// 搜索基金
export const fundKeyword = async (keyword, sendResponse) => {
	const tabs = await queryCurrentTab();
	const data = await findFund(keyword);
	tabSendMessage(tabs, { command: "setSearchData", data });

	sendResponse(data);
};

export const getFundRealTimeData = async (codes, sendResponse) => {
	const liveData = await getLiveFundData({ codes });
	sendResponse(liveData);
};
