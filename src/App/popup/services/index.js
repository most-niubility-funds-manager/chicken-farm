/*
 * @Date: 2020-10-06 19:11:37
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-11-20 12:01:15
 * @Description: 请求background
 */
import { sendMessage } from "@lib/chrome";

// 请求创建ID
export const createUid = () => sendMessage({ command: "createUid" });
// 检测昵称是否重复
export const checkName = ({ uid, name }) =>
	sendMessage({ command: "checkName", data: { uid, name } });
// 注册
export const register = ({ uid, name, password }) =>
	sendMessage({ command: "register", data: { uid, name, password } });
// 登录
export const login = ({ name, password }) =>
	sendMessage({ command: "login", data: { name, password } });
// 设置本地用户信息
export const setUserInfo = ({ uid, name }) =>
	sendMessage({ command: "setUser", data: { uid, name } });
// 获取用户信息
export const getUserInfo = () => sendMessage({ command: "getUser" });
// 页面更新用户数据
export const updateUserInfo = () => sendMessage({ command: "updateUserInfo" });
// pop清空user数据
export const clearUserInfo = () => sendMessage({ command: "clearUserInfo" });
// 切换登录页面状态
export const setLoginActive = (state) => sendMessage({ command: "setLoginActive", data: state });

// ------------------------------我是分割线-------------------------------------

// 获取大盘数据
export const getFundBaseData = () => sendMessage({ command: "getFundBaseData" });
// 获取大盘状态
export const getMarketStatus = () => sendMessage({ command: "checkMarketOpen" });
// 获取用户所有基金代码
export const getAllFundCodes = (uid) => sendMessage({ command: "allFundCodes", data: { uid } });
// 基金搜索
export const searchFund = (keyword) => sendMessage({ command: "searchFund", data: keyword });
// 添加基金
export const postFund = ({ uid, code }) => sendMessage({ command: "addFund", data: { uid, code } });
// 强制更新列表数据
export const forceUpdate = () => sendMessage({ command: "forceUpdate" });
// 切换基金列表
export const changeListType = (state) => sendMessage({ command: "changeListType", data: state });
// 激活搜索页面
export const setSearchState = ({ state, codes, uid }) =>
	sendMessage({ command: "setSearchState", data: { state, codes, uid } });
// 获取基金实时数据
export const getFundRealTimeData = (codes) =>
	sendMessage({ command: "getFundRealTimeData", data: codes });
// 获取基金总收入
export const getTotalData = () => sendMessage({ command: "getTotalData" });
// 每支基金提交资产信息
export const setTotalData = (data) => sendMessage({ command: "setTotalData", data });
// 重置总资产
export const modifyHold = (uid) => sendMessage({ command: "modifyHold", data: uid });
// 激活设置页面
export const setSettingState = (state) => sendMessage({ command: "setSettingState", data: state });
// 激活排序页面
export const setSortState = (state) => sendMessage({ command: "setSortState", data: state });

// 激活产品详情页
export const setDetailState = (data) => sendMessage({ command: "setDetailState", data });
// 修改基金是否关注
export const setFundFollowState = ({ uid, code, state, cost }) =>
	sendMessage({ command: "setFundFollowState", data: { uid, code, state, cost } });
// 修改基金持有
export const setFundHold = ({ uid, code, cost, unit, state }) =>
	sendMessage({ command: "setFundHold", data: { uid, code, cost, unit, state } });
// 获取基金的详情数据
export const getFundDetailData = (code) =>
	sendMessage({ command: "getFundDetailData", data: code });
// 获取估算净值 实时数据
export const getFundValuation = (code) => sendMessage({ command: "getFundValuation", data: code });
// 激活基金持仓弹窗
export const setHoldState = ({ state, data = {} }) =>
	sendMessage({ command: "setHoldState", data: { state, data } });

// 获取配置
export const getUserLocalSetting = () => sendMessage({ command: "getUserLocalSetting" });
// 设置单个配置
export const setUserLocalSetting = ({ key, value }) =>
	sendMessage({ command: "setUserLocalSetting", data: { key, value } });

// 手动导入数据
export const syncOldData = ({ uid, data }) =>
	sendMessage({ command: "syncOldData", data: { uid, data } });

// 批量删除
export const deleteBatchFund = ({ uid, code }) =>
	sendMessage({ command: "deleteBatchFund", data: { uid, code } });

// 修改排序
export const updateFundSort = ({ uid, code }) =>
	sendMessage({ command: "updateFundSort", data: { uid, code } });

// 设置
// 颜色反转
export const setBodyTheme = (state) => {
	const body = document.querySelector("#root");
	const className = state ? "reserveNormal" : "normal";
	body.classList = "";
	body.classList.add(className);
};
