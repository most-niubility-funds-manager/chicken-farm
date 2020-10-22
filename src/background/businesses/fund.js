import { fundAdd, getUserFunds, updateFollow, updateHold } from "../services/index";
import { sendMessage } from "@lib/chrome";

// 基金数据获取
export const fundCodes = async ({ uid }, sendResponse) => {
	const codes = await getUserFunds(uid);
	sendResponse(codes);
};

// 添加基金
export const addFund = async ({ uid, code }, sendResponse) => {
	const data = await fundAdd({ uid, code });
	sendResponse(data);
};

// 修改基金是否关注的状态
export const setFundFollowState = async ({ uid, code, state, cost }, sendResponse) => {
	const { status } = await updateFollow({ uid, code, state, cost });
	sendMessage({ command: "forceUpdate" });
	sendResponse(status);
};

// 修改基金持有
export const setFundHold = async ({ uid, code, cost, unit }, sendResponse) => {
	const { status } = await updateHold({ uid, code, cost, unit });
	sendResponse(status);
};
