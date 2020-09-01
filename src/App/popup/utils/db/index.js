import TableStore from '../../database/store'

class DbUtils {
  /*
 * @Date: 2020-07-25 12:40:25
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-30 11:15:04
 * @Description: indexdb数据库操作
 */

  constructor() {
    this.clients = {}
  }

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
  createDB({ store, tables, keyPath = "id" }, version = 1) {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(store, version);
      // 更新
      request.onupgradeneeded = ({ target }) => {
        const db = target.result;
        const tableNames = Object.keys(tables); //  展开表字段
        let objectStore;
        tableNames.map((name) => {
          // 判断当前表是否存在
          if (!db.objectStoreNames.contains(name)) {
            // keyPath为id时 自增
            objectStore = db.createObjectStore(name, { keyPath, autoIncrement: keyPath === "id" });
            // 获取表名对应的表结构对象的键值组
            const structure = Object.keys(tables[name]);

            // 创建表中属性对应索引
            structure.forEach((key) => {
              objectStore.createIndex(key, key, { unique: tables[name][key] });
            });
          }
        });
      };

      // 打开
      request.onsuccess = ({ target: { result } }) => {
        resolve(result)

        this.createInstance(instanceName, result)
      }
      //  失败
      request.onerror = reject;
    })
  }



  /**
   * 创建数据库实例
   */

  async createInstance({ store, success, ...configs }) {
    const db = await this.createDB({ store, ...configs })

    if (success) {
      success(db)
    }

    const client = new TableStore({ db })

    await client.sync()
    // TODO: const tableNames = await client.sync() 建索引表

    this.clients[store] = db

    return client
  }

  /**
   * 获取数据库实例
   */

  getInstance(instanceName) {
    if (this.clients[instanceName]) {
      return this.clients[instanceName]
    }

    throw new Error('Invalid database instance name.')
  }

}

export default new DbUtils()