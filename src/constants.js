/*
 * @Date: 2020-07-22 18:04:39
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-20 15:30:46
 * @Description: 静态常量
 */

export default {
	MARKET_OPEN: "开盘中",
	MARKET_NOON: "午间休市",
	MARKET_CLOSE: "已休市",
	// 背景页通讯请求命令名词
	COMMANDS: {
		REQUEST: "REQUEST",
		SYNC_GET: "SYNC_GET",
		SYNC_SET: "SYNC_SET",
	},
	// 数据库变量
	INDEX_STORE: "chicken-farm",
	INDEX_HOLIDAY: "holiday",
	INDEX_FUND: "funds",
	INDEX_TRADE: "trade",
	INDEX_CONFIG: "config",
	// local config
	LOCAL_CONFIG: "fund-manager-config",
	// sync config
	SYNC_FUNDS: "fund-manager-sync-funds",
	// 通知ID
	REMIND_MARKET_CLOSE: `REMIND_MARKET_CLOSE_${new Date().toDateString()}`,
};
