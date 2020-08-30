/*
 * @Date: 2020-08-11 15:18:45
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-30 10:05:21
 * @Description: 插件的所有通知
 */
import { createNotifiy, clearNotifiy, getURL } from "./base";
import { requestRecursion, arrivalRemind } from "../utils";
import { getLocal } from "../App/popup/services/localStorage";
import Constants from "../constants";

const LOGO = getURL("./static/icons/logo128.png");
const localConfig = getLocal(Constants.LOCAL_CONFIG);
const isOpen = localConfig && localConfig["notify"];

isOpen &&
	requestRecursion({
		fns: arrivalRemind,
		check: () => false,
		time: 60000,
		callback: (isArrival) => {
			isArrival &&
				createNotifiy(Constants.REMIND_MARKET_CLOSE, {
					type: "basic",
					title: "基金管理助手",
					iconUrl: LOGO,
					message: "还剩5分钟今日交易结束",
					priority: 2,
				}).then((_) => {
					setTimeout(() => {
						clearNotifiy(Constants.REMIND_MARKET_CLOSE);
					}, 120000);
				});
		},
	});
