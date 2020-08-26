/*
 * @Date: 2020-08-11 15:18:45
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-26 14:10:41
 * @Description: 插件的所有通知
 */
import { createNotifiy, getURL } from "./base";
import { requestRecursion, arrivalRemind } from "../utils";
import { getLocal } from "../App/popup/services/localStorage";
import Constants from "../constants";

const LOGO = getURL("./static/icons/logo128.png");

requestRecursion({
	fns: arrivalRemind,
	check: () => false,
	time: 60000,
	callback: (isArrival) => {
		const isOpen = getLocal(Constants.LOCAL_CONFIG)["notify"];

		isArrival &&
			isOpen &&
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
