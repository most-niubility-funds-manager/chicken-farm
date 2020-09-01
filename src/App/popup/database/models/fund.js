import { INDEX_FUND } from '../constants'
import dbUtils from '../../utils/db'

class FundModel {
  constructor(data) {
    const nowDate = new Date().getTime()

    this.id = data.id
    this.created_time = nowDate
  }
}

const Fund = {
  async insert(data) {
    const table = dbUtils.getTable(INDEX_FUND)
    const model = new FundModel(data)
    const result = await table.insert(model)

    return result
  },

  async batchInsert(data) {
    const table = dbUtils.getTable(INDEX_FUND)
    const result = await table.indexedAdd({ data: data.reduce((_, item) => [..._, new FundModel(item)], []) })

    return result
  },

  async getDataByKeyValue(option) {
    const table = dbUtils.getTable(TABLE.WOLAI_EXPORT_FILE)
    const result = await table.indexedFindSingle(option)

    return result
  },
}

module.exports = Fund
