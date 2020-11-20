/*
 * @Date: 2020-09-24 15:54:43
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-11-16 13:35:45
 * @Description: 用户账户登录、注册、退出
 */
import Http from "@lib/fetch";
import Saga from "@lib/saga";
import { sendMessage } from "@lib/chrome";
import { LOGIN, REGISTER, CHECKID, CHECKNAME } from "../api";
import { fetchEachFundDetail } from './danjuan'
import { oldFundAddBatch } from '../services/index'
import { getIndexedFunds } from '@lib/database'

// 登录
export const login = async ({ name, password }, sendResponse) => {
	const data = await Http.post(LOGIN, { name, password });
	sendResponse(data);

	await fetchEachFundDetail()
};

// 随机id
const randomUid = () => {
	const letter = [
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
		"G",
		"H",
		"I",
		"J",
		"K",
		"L",
		"M",
		"N",
		"O",
		"P",
		"Q",
		"R",
		"S",
		"T",
		"U",
		"V",
		"W",
		"X",
		"Y",
		"Z",
	];
	const head = [...Array(4)].reduce((str) => {
		const idx = Math.floor(Math.random() * letter.length);
		str += letter[idx];
		return str;
	}, "");
	const tail = Date.now();

	return `${head}-${tail}`;
};

// 生成一个随机uid传给前端
export const createUid = async (sendResponse) => {
	const uid = randomUid();
	const saga = new Saga(() => Http.get(CHECKID, { uid }));

	saga.start(({ success, status = false }) => {
		if (status) {
			saga.stop();
			sendResponse({ success, uid });
		}
	}, 200);
};

// 注册
export const register = async ({ uid, name, password }, sendResponse) => {
	const localSign = localStorage.getItem("already-sync-oldData")
	const data = await Http.post(REGISTER, { uid, name, password });
	const localCodes = await getIndexedFunds()

	if (!localSign)
		localStorage.setItem("already-sync-oldData", Date.now())
		localCodes.length && await oldFundAddBatch({ uid, codes: localCodes })
		
	sendResponse(data);

	await fetchEachFundDetail()
};

// 检测name
export const checkName = async ({ uid, name }, sendResponse) => {
	const data = await Http.get(CHECKNAME, { uid, name });
	sendResponse(data);
};

// 获取本地用户信息 fund-manager-user: { uid, name }
export const getLocalUser = (sendResponse) => {
	const info = localStorage.getItem("fund-manager-user");
	const result = info ? JSON.parse(info) : null;

	typeof sendResponse === "function" && sendResponse(result);

	return result;
};

// 保存本地用户信息
export const setLocalUser = ({ uid, name }, sendResponse) => {
	getLocalUser((info) => {
		let user = JSON.stringify({ uid, name });
		if (info) {
			user = JSON.stringify({ ...JSON.parse(info), uid, name });
		}
		localStorage.setItem("fund-manager-user", user);
		sendResponse("设置完毕");
	});
};

// 清除local userinfo
export const clearUser = async () => {
	localStorage.removeItem("fund-manager-user");
};

// 通知popup或options 登录
export const forceLogin = async () => {
	sendMessage({ command: "forceLogin" });
};

// 让options跳转首页
export const jumpIndex = async () => {
	sendMessage({ command: "jumpIndex" });
};

// popup更新userinfo数据
export const updateUserInfo = async () => {
	const info = localStorage.getItem("fund-manager-user");
	sendMessage({ command: "updateUserInfo", data: info ? JSON.parse(info) : null });
};

// 清空popup数据并更新页面
export const clearUserInfo = async () => {
	clearUser();
	sendMessage({ command: "updateUserInfo", data: null });
};
