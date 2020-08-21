/*
 * @Date: 2020-08-11 15:18:45
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-19 14:25:49
 * @Description: 插件的所有通知
 */
import { createNotifiy, getURL } from "./base";
import { requestRecursion, arrivalRemind } from "../utils";
import Constants from "../constants";

const LOGO = getURL("./static/icons/logo128.png");

requestRecursion({
	fns: arrivalRemind,
	check: () => false,
	time: 50000,
	callback: (isArrival) => {
		isArrival &&
			createNotifiy(Constants.REMIND_MARKET_CLOSE, {
				type: "basic",
				title: "基金管理助手",
				iconUrl: LOGO,
				message: "还剩5分钟今日交易结束",
				priority: 2,
			}).then((_) => {
				console.log("午时已到");
			});
	},
});
