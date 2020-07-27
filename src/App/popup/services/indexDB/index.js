/*
 * @Date: 2020-07-25 12:40:25
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-07-27 00:16:36
 * @Description: indexdb数据库操作
 */

// 数据库名 chicken-farm
// 表名及结构
// holiday 今年所有节假日 | year | data
// funds  用户添加过的基金 | code | name | unit 份额 | state 当前是否在用
// trade  交易记录 | code | name | unit 买卖 | state | time 交易状态
/**
 * @description: 打开/创建数据库
 * @param {Object} { store:数据库名, table: 表名, keyPath: 主键(默认id), keyMap: 表内结构{ key: 是否自增 } }
 * @return: 数据库实例
 */
const createDB = ({ store, table, keyPath = "id", keyMap }, version = 1) =>
	new Promise((resolve, reject) => {
		const request = window.indexedDB.open(store, version);
    // 更新
		request.onupgradeneeded = ({ target }) => {
      const db = target.result;
			const keys = Object.keys(keyMap); //  展开表字段
			let objectStore;
      // 判断当前表是否存在
			if (!db.objectStoreNames.contains(table)) {
				// keyPath为id时 自增
				objectStore = db.createObjectStore(table, { keyPath, autoIncrement: keyPath === "id" });

				// 创建表中属性对应索引
				keys.forEach((key) => {
					objectStore.createIndex(key, key, { unique: keyMap[key] });
				});
			}
		};

		// 打开
		request.onsuccess = ({ target: { result } }) => resolve(result);

		//  失败
		request.onerror = (e) => reject(e);
	});

/**
 * @description: 打开数据库
 * @param {String} store 数据库名
 * @param {Number} version 数据库版本
 * @return: 返回创建成功后的实例
 */
const openDB = (store, version = 1) =>
	new Promise((resolve, reject) => {
		const request = window.indexedDB.open(store, version);

		request.onsuccess = ({ target: { result } }) => resolve(result);

		request.onerror = (e) => reject(e);
	});

/**
 * @description: 添加数据
 * @param {Object} { store: 数据库名, table: 数据表名, data: 独享数据[] }
 * @return: promise.resolve
 */
const indexedAdd = ({ store, table, data }) =>
	new Promise((resolve, reject) => {
		openDB(store)
			.then((db) => {
				const result = db
					.transaction([table], "readwrite")
					.objectStore(table)
        //  指定表对应的事务状态 '读写'
        data.forEach(item => result.add(item))
        
        resolve()
			})
			.catch((e) => reject(e));
	});

/**
 * @description: 返回全部数据
 * @param {Object} { store, table }
 * @return: dataList []
 */
const indexedFindAll = ({ store, table }) =>
	new Promise((resolve, reject) => {
		openDB(store)
			.then((db) => {
				const transaction = db.transaction([table], "readwrite"); //  指定表对应的事务状态 '读写'
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
			})
			.catch((e) => reject(e));
	});

/**
 * @description: 查询指定索引 的 限定值 数据 eg: { code: 2020 }的对应数据
 * @param {Object} { store, table, key: { k, v } }
 * @return: dataList []
 */
const indexedFindSingle = ({ store, table, key: { k, v } }) =>
	new Promise((resolve, reject) => {
		openDB(store)
			.then((db) => {
				const transaction = db.transaction([table], "readwrite");
				const objectStore = transaction.objectStore(table);
				const index = objectStore.index(k);
        const request = index.get(v)

				request.onsuccess = () => {
					if (request.result) {
            resolve(request.result);
					} else {
						reject()
					}
				};
			})
			.catch((e) => reject(e));
	});

/**
 * @description: 修改已有数据 | 插入新数据
 * @param {Object} { store, table, data: 单条数据对象 }
 * @return: Promise.resolve
 */
const indexedUpdate = ({ store, table, data }) =>
	new Promise((resolve, reject) => {
		openDB(store)
			.then((db) => {
				const request = db.transaction([table], "readwrite").objectStore(table).put(data);

				request.onsuccess = (e) => resolve(e);
			})
			.catch((e) => reject(e));
	});

const indexedDelete = ({ store, table, key: { k, v } }) =>
	new Promise((resolve, reject) => {
		openDB(store)
			.then((db) => {
				const request = db.transaction([table], "readwrite").objectStore(table).index(k).delete(v);

				request.onsuccess = (e) => resolve(e);
			})
			.catch((e) => reject(e));
	});

// 增删改查就完事
export { createDB, indexedAdd, indexedFindAll, indexedFindSingle, indexedUpdate, indexedDelete };
