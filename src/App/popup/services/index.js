/*
 * @Date: 2020-10-06 19:11:37
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-10-18 17:53:59
 * @Description: 请求background
 */
import { sendMessage } from "@lib/chrome";

// 获取用户信息
export const getUserInfo = () => sendMessage({ command: "getUser" });
// 获取大盘数据
export const getFundBaseData = () => sendMessage({ command: "getFundBaseData" });
// 获取大盘状态
export const getMarketStatus = () => sendMessage({ command: "checkMarketOpen" });
// 获取用户表头配置
export const getUserTableHead = () => sendMessage({ command: "getTableHead" });
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
export const setSearchState = (state) => sendMessage({ command: "setSearchState", data: state });
// 获取基金实时数据
export const getFundRealTimeData = (codes) =>
	sendMessage({ command: "getFundRealTimeData", data: codes });
// 获取基金总收入
export const getTotalData = () => sendMessage({ command: "getTotalData" });
// 每支基金提交资产信息
export const setTotalData = (data) => sendMessage({ command: "setTotalData", data });
