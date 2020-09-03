/*
 * @Date: 2020-07-24 21:56:52
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-09-03 11:42:01
 * @Description: 插件背景页
 */

import { fetchData } from "./services";
import { syncSet, syncGet } from "./base";
import Constants from "../constants";
import dbUtils from "../App/popup/utils/db";
import { addAllFunds, updateSingleFund, convertCodeFetch, getSyncStorage } from "../App/popup/services";
import "./webRequest";
import "./notifiy";

const { COMMANDS } = Constants;
const RUNTIME_COMMANDS = new Map([
	[COMMANDS.REQUEST, (sendResponse, data) => fetchData(data).then((_) => sendResponse(_))],
	[COMMANDS.SYNC_GET, (sendResponse, data) => syncGet(data).then((_) => sendResponse(_[data]))],
	[COMMANDS.SYNC_SET, (sendResponse, data) => syncSet(data).then((_) => sendResponse())],
]);

// 背景页命令中枢
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	const { command, data } = message;
	RUNTIME_COMMANDS.get(command)(sendResponse, data);

	console.log("响应命令", command);
	return true;
});

// 数据库初始化
const tables = {};
const holiday_table = { year: false, data: false };
const funds_table = { code: false, name: false, unit: false, state: false, create: false };
const trade_table = { code: false, name: false, unit: false, state: false, time: false };
tables[Constants.INDEX_HOLIDAY] = holiday_table;
tables[Constants.INDEX_FUND] = funds_table;
tables[Constants.INDEX_TRADE] = trade_table;

// 同步云端数据
// funds [{ code, unit }]
const syncCloudFunds = async () => {
	const funds = await getSyncStorage(Constants.SYNC_FUNDS);
	if (!funds) {
		return;
	}

	const { succ } = await convertCodeFetch(funds.map(({ code }) => code));
	const fundData = succ.map(({ code, name }) => {
		const { unit } = funds.find(({ code: c }) => code === c);
		return {
			code,
			unit,
			name,
			state: 1,
			create: Date.now(),
		};
	});

	// 若有新增基金，加入表同时改变了份额；再逐个更新一遍数据
	addAllFunds(fundData).then((_) =>
		Promise.all(
			fundData.map(({ unit, code }) => updateSingleFund({ unit }, { k: "code", v: code }))
		)
	);
};

// Initializer
dbUtils.createInstance({
	store: Constants.INDEX_STORE,
	tables,
	success: syncCloudFunds,
});

console.log("Say Yeah!");
