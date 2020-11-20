/*
 * @Date: 2020-10-05 22:43:25
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-11-16 14:30:16
 * @Description: 缓存数据 避免重复请求
 */
const config = {
	fundBaseCodes: ["1.000001", "0.399001", "1.000300", "0.399006"], //	用户配置的大盘代码 最多4个
	holiday: [], //	每年节假日
	currentYear: 2020, //	今年年份
	expired: null, //  每次获取数据记录的时间，若不是同一天，则重新请求
	allCodes: [],	//	用户所有的基金数据
	totalCost: {}, //	各基金的金额
	fundHistory: {}, //  各基金详情基本信息
	tempAddFunds: [],	//	临时保存的基金
	userSetting: {
		wideMode: true,
		reverseColor: false,
		tradeNotice: true,
		marketState: true,
		incomeState: true,
	}, //	用户本地配置
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
