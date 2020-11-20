/*
 * @Date: 2020-09-24 15:00:30
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-11-20 12:00:22
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
import { fundBase, fundKeyword, getFundRealTimeData, getFundValuation } from "./danjuan";
import {
	getMarketOpen,
	forceUpdate,
	changeListType,
	setSearchState,
	getTotalData,
	setTotalData,
	modifyHold,
	setSettingState,
	setDetailState,
	getUserLocalSetting,
	setUserLocalSetting,
	setLoginActive,
	setHoldState,
	syncOldData,
	setSortState,
} from "./base";
import {
	addFund,
	fundCodes,
	setFundHold,
	setFundFollowState,
	getFundDetailData,
	deleteBatchFund,
	updateFundSort,
} from "./fund";
import "./notify";

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
	["setLoginActive", (data) => setLoginActive(data)], //	切换popup登录页面状态
	["getFundBaseData", (data, sendResponse) => fundBase(sendResponse)], //	大盘数据
	["checkMarketOpen", (data, sendResponse) => getMarketOpen(sendResponse)],
	["allFundCodes", (data, sendResponse) => fundCodes(data, sendResponse)], //	用户所有基金代码及相关配置
	["forceUpdate", (data, sendResponse) => forceUpdate(sendResponse)], //	强制更新列表数据
	["searchFund", (data, sendResponse) => fundKeyword(data, sendResponse)], //	基金搜索
	["addFund", (data, sendResponse) => addFund(data, sendResponse)], //	添加基金
	["changeListType", (data) => changeListType(data)], //	基金列表切换类型
	["setSearchState", (data) => setSearchState(data)], //	切换搜索状态
	["getFundRealTimeData", (data, sendResponse) => getFundRealTimeData(data, sendResponse)], //	获取基金实时数据
	["getTotalData", (data, sendResponse) => getTotalData(sendResponse)], //	总资产面板数据
	["setTotalData", (data, sendResponse) => setTotalData(data, sendResponse)], //	保存资产
	["modifyHold", (data) => modifyHold(data)], //	重置总资产面板
	["setSettingState", (data) => setSettingState(data)],
	["setDetailState", (data) => setDetailState(data)], //	详情页
	["getFundDetailData", (data, sendResponse) => getFundDetailData(data, sendResponse)], //	获取基金详情数据
	["getFundValuation", (data, sendResponse) => getFundValuation(data, sendResponse)], //	获取实时估算净值
	["updateUserInfo", () => updateUserInfo()],
	["getUserLocalSetting", (data, sendResponse) => getUserLocalSetting(sendResponse)],
	["setUserLocalSetting", (data) => setUserLocalSetting(data)],
	["clearUserInfo", () => clearUserInfo()],
	["setFundFollowState", (data, sendResponse) => setFundFollowState(data, sendResponse)],
	["setHoldState", (data) => setHoldState(data)], //	基金持仓窗口
	["setFundHold", (data, sendResponse) => setFundHold(data, sendResponse)], //	修改持有
	["syncOldData", (data, sendResponse) => syncOldData(data, sendResponse)], //	用户手动导入旧数据
	["setSortState", (data) => setSortState(data)], //	打开排序啊
	["updateFundSort", (data, sendResponse) => updateFundSort(data, sendResponse)], //	修改排序
	["deleteBatchFund", (data, sendResponse) => deleteBatchFund(data, sendResponse)], //	批量删除
]);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	const { command, data = null } = message;

	commandMap.get(command)(data, sendResponse);

	return true;
});

console.log("[Background Controller Start]");
