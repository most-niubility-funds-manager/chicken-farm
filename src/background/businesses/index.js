/*
 * @Date: 2020-09-24 15:00:30
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-10-09 18:00:42
 * @Description: 数据交互中心
 */
import {
	login,
	createUid,
	register,
	checkName,
	getLocalUser,
	setLocalUser,
	clearUser,
	forceLogin,
	jumpIndex,
} from "./account";
import { fundBase, fundKeyword } from "./danjuan";
import { getMarketOpen, forceUpdate, getTableHead } from "./base";
import { addFund, fundCodes } from './fund'

const commandMap = new Map([
	["getUser", (data, sendResponse) => getLocalUser(sendResponse)],
	["setUser", (data, sendResponse) => setLocalUser(data, sendResponse)],
	["login", (data, sendResponse) => login(data, sendResponse)],
	["createUid", (data, sendResponse) => createUid(sendResponse)],
	["register", (data, sendResponse) => register(data, sendResponse)],
	["checkName", (data, sendResponse) => checkName(data, sendResponse)],
	["forceLogin", () => forceLogin()],
	["jumpIndex", () => jumpIndex()], //	注册/登录完毕跳转首页
	["clearUser", () => clearUser()],
	["getFundBaseData", (data, sendResponse) => fundBase(sendResponse)], //	大盘数据
	["checkMarketOpen", (data, sendResponse) => getMarketOpen(sendResponse)],
	["allFundCodes", (data, sendResponse) => fundCodes(data, sendResponse)], //	用户所有基金代码及相关配置
	["forceUpdate", (data, sendResponse) => forceUpdate(sendResponse)], //	强制更新列表数据
	["getTableHead", (data, sendResponse) => getTableHead(sendResponse)], //	列表表头配置
	["searchFund", (data, sendResponse) => fundKeyword(data, sendResponse)], //	基金搜索
	["addFund", (data, sendResponse) => addFund(data, sendResponse)],	//	添加基金
]);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	const { command, data = null } = message;
	const { tab } = sender;

	commandMap.get(command)(data, sendResponse);

	return true;
});

console.log("[Background Controller Start]");
