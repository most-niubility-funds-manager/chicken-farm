import { fundAdd, getUserFunds } from "../services/index";

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
