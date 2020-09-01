/*
 * @Date: 2020-08-11 15:18:45
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-31 23:23:13
 * @Description: 插件的所有通知
 */
import { createNotifiy, clearNotifiy, getURL } from "./base";
import { arrivalRemind } from "../utils";
import { getLocal } from "../App/popup/services/localStorage";
import { fetchAllYearholiday } from "../App/popup/services";
import Constants from "../constants";

const LOGO = getURL("./static/icons/logo128.png");
const checkNotifyOpen = () => {
	const localConfig = getLocal(Constants.LOCAL_CONFIG);
	const isOpen = localConfig && localConfig["notify"];
	return isOpen;
};

// 接口获取节假日
fetchAllYearholiday().then((originData) => {
	const { holiday } = originData[0];
	const weekend = [0, 6]; //	周末的getDay
	let resultData = holiday.reduce((times, { list }) => {
		const subDays = list
			.filter(({ date }) => {
				const dateObject = new Date(date);
				const currDay = dateObject.getDay();
				const isWeekend = weekend.includes(currDay); //	周末休市
				return !isWeekend;
			})
			.map(({ date }) => new Date(date).getTime()); //	输出时间戳

		times.push(...subDays);
		return times;
	}, []);

	resultData = [...new Set(resultData)];

	// 轮询判断
	const polling = () =>
		Promise.all([arrivalRemind(resultData, 14, 55), checkNotifyOpen()]).then(
			([isArrival, notifyOpen]) => {
				isArrival &&
					notifyOpen &&
					createNotifiy(Constants.REMIND_MARKET_CLOSE, {
						type: "basic",
						title: "基金管理助手",
						iconUrl: LOGO,
						message: "还剩5分钟今日交易结束",
						priority: 2,
					}).then((_) => {
						console.log("已通知");
						setTimeout(() => {
							clearNotifiy(Constants.REMIND_MARKET_CLOSE);
							console.log("通知已清除");
						}, 120000);
					});

				setTimeout(() => {
					polling();
				}, 60000);
			}
		);

	polling();
});
