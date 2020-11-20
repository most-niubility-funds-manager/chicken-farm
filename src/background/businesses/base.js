/*
 * @Date: 2020-10-06 20:42:02
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-11-17 21:11:08
 * @Description: 插件基本接口需求
 */
import store from "../model/store";
import {
	getHoliday,
	updateUserFunds,
	deleteUserFunds,
	fundAddBatch,
	oldFundAddBatch,
} from "../services";
import { getPreciseTime, convertDate } from "@utils";
import { sendMessage } from "@lib/chrome";
import { fetchEachFundDetail } from "./danjuan";

// 获取节假日并判断现在的交易状态
export const getMarketOpen = async (sendResponse) => {
	const currentYear = new Date().getFullYear();
	const storeYear = store.get("currentYear");
	const storeHoliday = store.get("holiday");
	let holidays = [];
	// 时间判断
	const MORNING_START = getPreciseTime(9, 30);
	const MORNING_END = getPreciseTime(11, 30);
	const AFTERNOON_START = getPreciseTime(13);
	const AFTERNOON_END = getPreciseTime(15);
	const CURRENT_TIME = Date.now();
	const TODAY = getPreciseTime();
	const weekend = [0, 6]; //	周末的getDay
	let isOpen = false;
	let stateText = "";

	if (!storeHoliday.length || storeYear !== currentYear) {
		const data = await getHoliday();
		store.set("currentYear", currentYear);
		store.set("holiday", data);
		holidays = data;
	} else {
		holidays = storeHoliday;
	}

	//  开盘状态判断
	const isHoliday = holidays.includes(TODAY) || weekend.includes(new Date().getDay());
	if (isHoliday || MORNING_START > CURRENT_TIME || CURRENT_TIME > AFTERNOON_END) {
		stateText = "已休市";
	} else if (CURRENT_TIME > MORNING_END && CURRENT_TIME < AFTERNOON_START) {
		stateText = "午间休市";
	} else {
		stateText = "开盘中";
		isOpen = true;
	}

	sendResponse({ text: stateText, status: isOpen });
};

// 强制更新popup
export const forceUpdate = async () => {
	sendMessage({ command: "forceUpdate" });
};

// 基金列表切换类型
export const changeListType = async (state) => {
	sendMessage({ command: "changeListType", data: state });
};

// 搜索面板
export const setSearchState = async ({ state, codes, uid }) => {
	if (!state && codes.length) {
		await fundAddBatch({ codes, uid });
		await updateUserFunds(uid);
	}

	sendMessage({ command: "setSearchState", data: state });
	await fetchEachFundDetail();
};

// 总资产
export const getTotalData = async (sendResponse) => {
	const total = store.get("totalCost");
	const result = Object.values(total).reduce(
		(obj, curr) =>
			Object.keys(obj).reduce(
				(o, k) => ({ ...o, [k]: (Number(obj[k] || 0) + Number(curr[k])).toFixed(2) }),
				{}
			),
		{ totalCost: 0, lastIncome: 0, totalIncome: 0, fakeIncome: 0 }
	);

	sendResponse(result);
};

// 设置总资产
export const setTotalData = async (
	{ code, totalCost, lastIncome, totalIncome, fakeIncome },
	sendResponse
) => {
	const total = store.get("totalCost");
	store.set("totalCost", { ...total, [code]: { totalCost, lastIncome, totalIncome, fakeIncome } });
	sendResponse("设置完毕");
};

// 重置总资产
export const modifyHold = async (uid) => {
	await updateUserFunds(uid);
};

// 设置页面
export const setSettingState = async (state) => {
	sendMessage({ command: "setSettingState", data: state });
};

// 排序页面
export const setSortState = async (state) => {
	sendMessage({ command: "setSortState", data: state });
};

// 详情页
export const setDetailState = async (data) => {
	sendMessage({ command: "setDetailState", data });
};

// 获取用户本地配置
export const getUserLocalSetting = async (sendResponse) => {
	const config = store.get("userSetting");
	sendResponse(config);
};

// 配置用户配置
export const setUserLocalSetting = async ({ key, value }) => {
	const config = store.get("userSetting");
	const result = { ...config, [key]: value };
	store.set("userSetting", result);
	sendMessage({ command: "updateSetting", data: result });
};

// 切换popup页面登录页面状态
export const setLoginActive = async (data) => {
	// 退出登录清空数据
	if (!data) {
		store.set("totalCost", {});
		deleteUserFunds();
	}

	sendMessage({ command: "setLoginActive", data });
};

// 持仓窗口
export const setHoldState = async ({ state, data }) =>
	sendMessage({ command: "setHoldState", data: { state, data } });

// 手动同步旧数据
export const syncOldData = async ({ uid, data }, sendResponse) => {
	const { status } = await oldFundAddBatch({ uid, codes: data });

	sendResponse(status);
};
