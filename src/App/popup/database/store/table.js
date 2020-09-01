export default class Table {
  /**
  * 设置 TableStore 实例
  * @param {TableStore} store TableStore实例
  */
  setStore(store, tableName) {
    this.store = store
    this.tableName = tableName

    return this
  }

  /**
   * @description: 添加数据
   * @param {Object} { data: 独享数据[] }
   * @return: promise.resolve
   */
  indexedAdd = ({ data }) => {
    const result = this.store.transaction([this.tableName], "readwrite").objectStore(this.tableName);
    //  指定表对应的事务状态 '读写'
    data.forEach((item) => result.add(item));

    return result;
  }

  /**
  * @description: 返回全部数据
  * @return: dataList []
  */
  indexedFindAll = () =>
    new Promise((resolve, reject) => {
      const transaction = this.store.transaction([this.tableName], "readwrite"); //  指定表对应的事务状态 '读写'
      const objectStore = transaction.objectStore(this.tableName);
      const dataList = []; //  查询结果

      objectStore.openCursor().onsuccess = ({ target: { result: cursor } }) => {
        if (cursor) {
          dataList.push(cursor.value);
          cursor.continue();
        } else {
          resolve(dataList);
        }
      };
    });

  /**
  * @description: 查询指定索引 的 限定值 数据 eg: { code: 2020 }的对应数据
  * @param {Object} { key: { k, v } }
  * @return: { code, name, unit, state }
  */
  indexedFindSingle = ({ key: { k, v } }) =>
    new Promise((resolve, reject) => {
      const transaction = this.store.transaction([this.tableName], "readwrite");
      const objectStore = transaction.objectStore(this.tableName);
      const index = objectStore.index(k);
      const request = index.get(v);

      request.onsuccess = () => {
        if (request.result) {
          resolve(request.result);
        } else {
          resolve(null); //	查不到返回null
        }
      };
    });

  /**
  * @description: 修改已有数据 | 插入新数据
  * @param {Object} { data: 单条数据对象(包含主键id) }
  * @return: Promise.resolve
  */
  indexedUpdate = ({ data }) => {
    this.store.transaction([this.tableName], "readwrite").objectStore(this.tableName).put(data);
  }

  /**
  * @description: 删除指定某条数据
  * @param {Object} { key: { 字段：值 } }
  * @return: Promise.resolve
  */
  indexedDelete = ({ key: { k, v } }) =>
    new Promise((resolve, reject) => {
      const request = db.transaction([this.tableName], "readwrite").objectStore(this.tableName).openCursor();

      request.onsuccess = ({ target }) => {
        const { result: cursor } = target;

        if (cursor == null) reject();

        if (cursor.value[k] === v) {
          const result = cursor.delete();
          result.onsuccess = () => resolve();
        } else {
          cursor.continue();
        }
      };
    });

}