/*
 * @Date: 2020-10-06 20:42:02
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-10-11 22:37:25
 * @Description: 插件基本接口需求
 */
import store from "../model/store";
import { getHoliday, getLastTradeTime } from "../services";
import { getPreciseTime, convertDate } from "@utils";
import { queryCurrentTab, tabSendMessage } from "@lib/chrome";

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
	const tabs = await queryCurrentTab();
	tabSendMessage(tabs, { command: "forceUpdate", data: true });
};

// 获取用户配置的表头, 返回键名及相关信息(日期啥的)
export const getTableHead = async (sendResponse) => {
	const tableFields = store.get("tableFields");
	const keyMap = new Map([
		["valuation", () => valuation()],
		["lastTime", () => lastTime()],
		["lastWeek", () => lastweek()],
		["afterAdd", () => afterAdd()],
		["cost", () => cost()],
		["realTime", () => realTime()],
	]);

	// 估值字段
	const valuation = () => {
		const today = convertDate({ timestamp: Date.now() });
		return { name: "估值", key: "valuation", sub: today };
	};
	// 上次交易日
	const lastTime = async () => {
		const time = await getLastTradeTime();
		return { name: "净值", key: "lastTime", sub: time };
	};
	// 上周
	const lastweek = () => ({ name: "近1周", key: "lastWeek", sub: null });
	// 添加后
	const afterAdd = () => ({ name: "添加后收益", key: "afterAdd", sub: "添加时长" });
	// 总成本
	const cost = () => ({ name: "总成本", key: "cost", sub: null });
	// 实时估值
	const realTime = () => ({ name: "收益估值", key: "realTime", sub: null });

	// 遍历并返回配置
	const config = await Promise.all(tableFields.map((key) => keyMap.get(key)()));

	sendResponse(config);
};
