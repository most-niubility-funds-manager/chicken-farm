/*
 * @Date: 2020-09-24 15:00:30
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-10-20 21:08:48
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
	updateUserInfo,
	clearUserInfo,
} from "./account";
import { fundBase, fundKeyword, getFundRealTimeData } from "./danjuan";
import {
	getMarketOpen,
	forceUpdate,
	getTableHead,
	changeListType,
	setSearchState,
	getTotalData,
	setTotalData,
	setSettingState,
	setDetailState,
	getUserLocalSetting,
	setUserLocalSetting,
} from "./base";
import { addFund, fundCodes } from "./fund";

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
	["addFund", (data, sendResponse) => addFund(data, sendResponse)], //	添加基金
	["changeListType", (data) => changeListType(data)], //	基金列表切换类型
	["setSearchState", (data) => setSearchState(data)], //	切换搜索状态
	["getFundRealTimeData", (data, sendResponse) => getFundRealTimeData(data, sendResponse)], //	获取基金实时数据
	["getTotalData", (data, sendResponse) => getTotalData(sendResponse)], //	总资产面板数据
	["setTotalData", (data) => setTotalData(data)], //	保存资产
	["setSettingState", (data) => setSettingState(data)],
	["setDetailState", (data) => setDetailState(data)], //	详情页
	["updateUserInfo", () => updateUserInfo()],
	["getUserLocalSetting", (data, sendResponse) => getUserLocalSetting(sendResponse)],
	["setUserLocalSetting", (data) => setUserLocalSetting(data)],
	["clearUserInfo", () => clearUserInfo()],
]);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	const { command, data = null } = message;
	const { tab } = sender;

	commandMap.get(command)(data, sendResponse);

	return true;
});

console.log("[Background Controller Start]");
