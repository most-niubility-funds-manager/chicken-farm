import Client from './client'
import Table from './table'
import * as TABLE_NAME from '../constants/tables'

export default class TableStore extends Client {
  constructor(options) {
    super(options)

    // 表集合
    this.tables = {}

    // 模型集合
    // this.models = {};

    this.__store = options.db
  }

  /**
   * 同步 tables 数据
   */
  async sync() {
    const tableNames = Object.keys(TABLE_NAME).reduce((_, k), [..._, TABLE_NAME[k]])

    tableNames.forEach(name => this.defineTable(name))

    return tableNames
  }

  /**
   * 定义数据表
   */
  defineTable(tableName, tableOptions) {
    this.tables[tableName] = new Table(tableName, tableOptions).setStore(this.__store, tableName)
  }

  /**
   * 获取指定数据表
   */
  getTable(tableName) {
    return this.tables[tableName]
  }
}