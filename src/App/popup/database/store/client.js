/*
 * @Date: 2020-07-25 12:40:25
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-30 11:15:04
 * @Description: indexdb数据库操作
 */

// 数据库名 chicken-farm
// 表名及结构
// holiday 今年所有节假日 | year | data
// funds  用户添加过的基金 | code | name | unit 份额 | state 当前是否在用
// trade  交易记录 | code | name | unit 买卖 | state | time 交易状态
/**
 * @description: 打开/创建数据库
 * @param {Object} { store:数据库名, tables: { name: structure } 表名和表结构, keyPath: 主键(默认id) }
 * @return: 数据库实例
 */

// 重构index db 结构
// client.js 提供数据库连接 数据表以及事务的 crud 操作
export default class Client {
  /**
 * @description: 打开数据库
 * @param {String} store 数据库名
 * @param {Number} version 数据库版本
 * @return: 返回创建成功后的实例
 */

  constructor() {
    this.conn = this.openDB()
  }

  openDB(store, version = 1) {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(store, version);

      request.onsuccess = ({ target: { result } }) => resolve(result);
      request.onerror = reject;
    });
  }
}