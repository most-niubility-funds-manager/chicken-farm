/*
 * @Date: 2020-10-05 22:43:25
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-10-11 22:34:56
 * @Description: 缓存数据 避免重复请求
 */
const config = {
	fundBaseCodes: ["SH000001", "SH000300", "SZ399001", "SZ399006", "SH000016"], //	用户配置的大盘代码 最多5个
	fundHistory: [], //  各基金日增值的历史数据 10天
	holiday: [], //	每年节假日
	currentYear: 2020, //	今年年份
	expired: null, //  每次获取数据记录的时间，若不是同一天，则重新请求
	tableFields: ['valuation', 'lastTime', 'lastWeek', 'afterAdd'], //	配置的列表显示字段	最多四个字段 valuation, lastTime, lastWeek, afterAdd, cost, realTime
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
