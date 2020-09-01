export default class Table {
  /**
  * 设置 TableStore 实例
  * @param {TableStore} store TableStore实例
  */
  setStore(store) {
    this.store = store

    return this
  }

  /**
   * @description: 添加数据
   * @param {Object} { store: 数据库名, table: 数据表名, data: 独享数据[] }
   * @return: promise.resolve
   */
  indexedAdd = ({ table, data }) => {
    const result = this.store.transaction([table], "readwrite").objectStore(table);
    //  指定表对应的事务状态 '读写'
    data.forEach((item) => result.add(item));

    return result;
  }

  /**
  * @description: 返回全部数据
  * @param {Object} { store, table }
  * @return: dataList []
  */
  indexedFindAll = ({ table }) =>
    new Promise((resolve, reject) => {
      const transaction = this.store.transaction([table], "readwrite"); //  指定表对应的事务状态 '读写'
      const objectStore = transaction.objectStore(table);
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
  * @param {Object} { store, table, key: { k, v } }
  * @return: { code, name, unit, state }
  */
  indexedFindSingle = ({ table, key: { k, v } }) =>
    new Promise((resolve, reject) => {
      const transaction = this.store.transaction([table], "readwrite");
      const objectStore = transaction.objectStore(table);
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
  * @param {Object} { store, table, data: 单条数据对象(包含主键id) }
  * @return: Promise.resolve
  */
  indexedUpdate = ({ table, data }) => {
    this.store.transaction([table], "readwrite").objectStore(table).put(data);
  }

  /**
  * @description: 删除指定某条数据
  * @param {Object} { store, table, key: { 字段：值 } }
  * @return: Promise.resolve
  */
  indexedDelete = ({ store, table, key: { k, v } }) =>
    new Promise((resolve, reject) => {
      const request = db.transaction([table], "readwrite").objectStore(table).openCursor();

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