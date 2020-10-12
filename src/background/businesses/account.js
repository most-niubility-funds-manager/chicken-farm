/*
 * @Date: 2020-09-24 15:54:43
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-10-07 11:10:14
 * @Description: 用户账户登录、注册、退出
 */
import Http from "@lib/fetch";
import Saga from "@lib/saga";
import { tabSendMessage, queryCurrentTab } from "@lib/chrome";
import { LOGIN, REGISTER, CHECKID, CHECKNAME } from "../api";

// 登录
export const login = async ({ name, password }, sendResponse) => {
	const data = await Http.post(LOGIN, { name, password });
	sendResponse(data);
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
	const data = await Http.post(REGISTER, { uid, name, password });
	sendResponse(data);
};

// 检测name
export const checkName = async ({ uid, name }, sendResponse) => {
	const data = await Http.get(CHECKNAME, { uid, name });
	sendResponse(data);
};

// 获取本地用户信息 fund-manager-user: { uid, name }
export const getLocalUser = (sendResponse) => {
	const info = localStorage.getItem("fund-manager-user");
	sendResponse(JSON.parse(info));
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
	const tabs = await queryCurrentTab();
	tabSendMessage(tabs, { command: "forceLogin" });
};

// 让options跳转首页
export const jumpIndex = async () => {
	const tabs = await queryCurrentTab();
	tabSendMessage(tabs, { command: "jumpIndex" });
};
