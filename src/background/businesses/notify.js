/*
 * @Date: 2020-11-02 22:39:34
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-11-04 09:54:47
 * @Description: 消息通知
 */
import { arrivalRemind } from "@utils";
import { createNotifiy, clearNotifiy, getURL } from "@lib/chrome";
import store from "../model/store";

const LOGO = getURL("./static/icons/logo128.png");

const getNotifyStatus = async () => store.get("userSetting")["tradeNotice"];

const getHoliday = () => store.get("holiday")

// 轮询判断
const tradeNotifyPolling = () =>
	Promise.all([arrivalRemind(getHoliday(), 14, 55), getNotifyStatus()]).then(
		([isArrival, notifyOpen]) => {
			isArrival &&
				notifyOpen &&
				createNotifiy(`REMIND_MARKET_CLOSE_${new Date().toDateString()}`, {
					type: "basic",
					title: "基金管理助手提醒你",
					iconUrl: LOGO,
					message: "还剩5分钟今日交易结束",
					priority: 2,
				}).then((_) => {
					setTimeout(() => {
						clearNotifiy(`REMIND_MARKET_CLOSE_${new Date().toDateString()}`);
						console.log("通知已清除");
					}, 120000);
				});

			setTimeout(() => {
				tradeNotifyPolling();
			}, 60000);
		}
	);

tradeNotifyPolling();
