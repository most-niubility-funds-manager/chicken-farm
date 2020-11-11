import {
	fundAdd,
	getUserFunds,
	updateFollow,
	updateHold,
	getDetail,
	updateUserFunds,
} from "../services/index";

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
	await updateUserFunds(uid);
	sendResponse(status);
};

// 修改基金持有
export const setFundHold = async ({ uid, code, cost, unit }, sendResponse) => {
	const { status } = await updateHold({ uid, code, cost, unit });
	sendResponse(status);
};

// 获取详情数
export const getFundDetailData = async (code, sendResponse) => {
	const data = await getDetail(code);

	sendResponse(data);
};
