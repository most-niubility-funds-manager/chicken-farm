/*
 * @Date: 2020-10-05 22:43:25
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-10-18 17:57:00
 * @Description: 缓存数据 避免重复请求
 */
const config = {
	fundBaseCodes: ["1.000001", "0.399001", "1.000300", "0.399006"], //	用户配置的大盘代码 最多4个
	fundHistory: {}, //  各基金日增值的历史数据 10天 { code: [{ date, nav, percentage, value }] }
	fundLiveData: {}, //	每日实时数据缓存	{ code: { date, items } }
	holiday: [], //	每年节假日
	currentYear: 2020, //	今年年份
	expired: null, //  每次获取数据记录的时间，若不是同一天，则重新请求
	tableFields: ["valuation", "lastTime", "lastWeek", "afterAdd"], //	配置的列表显示字段	最多四个字段 valuation, lastTime, lastWeek, afterAdd, cost, realTime
	totalCost: {}, //	各基金的金额
	get(key) {
		return this[key];
	},
	set(key, data) {
		if (Array.isArray(data)) {
			this[key] = [...data];
		} else if (Object.keys(data).length) {
			this[key] = { ...data };
		} else {
			this[key] = data;
		}
	},
};

export default config;
