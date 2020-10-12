/*
 * @Date: 2020-10-05 22:36:37
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-10-09 15:21:54
 * @Description: 蛋卷基金相关请求控制
 */
import store from "../model/store";
import { getFundBase, getFundHistory, findFund } from "../services/index";
import { getLastDay, getPreciseTime } from "@utils";

// 是否需要更新
const isDiffTime = (time) => {
	const today = new Date(getPreciseTime());
	return time !== today;
};

//  所有基金历史日增值数据
export const fundHistory = async (codes, sendResponse) => {
	const expired = store.get("expired") || getLastDay(); //  若无 获取昨日时间戳
	const history = store.get("fundHistory");

	if (isDiffTime(expired) || history.length !== codes.length) {
		const currentData = await Promise.all(codes.map((c) => getFundHistory(c)));
		// code value 键值对数组
		const data = codes.reduce((obj, code, index) => {
			obj[code] = currentData[index];
			return { ...obj };
		}, {});
		store.set("fundHistory", data);
		store.set("expired", getPreciseTime());
		sendResponse(data);
	} else {
		sendResponse(history);
	}
};

// 大盘数据获取
export const fundBase = async (sendResponse) => {
	const codes = store.get("fundBaseCodes"); //  获取用户配置的大盘
	const data = await Promise.all(codes.map((c) => getFundBase(c)));
	sendResponse(data);
};

// 搜索基金
export const fundKeyword = async (keyword, sendResponse) => {
	const data = await findFund(keyword);
	console.log("基金搜索", data);

	sendResponse(data);
};
