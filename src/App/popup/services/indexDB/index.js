/*
 * @Date: 2020-07-25 12:40:25
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-09 15:21:56
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
const createDB = ({ store, tables, keyPath = "id" }, version = 1) =>
	new Promise((resolve, reject) => {
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
				const result = db.transaction([table], "readwrite").objectStore(table);
				//  指定表对应的事务状态 '读写'
				data.forEach((item) => result.add(item));

				resolve();
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
 * @return: { code, name, unit, state }
 */
const indexedFindSingle = ({ store, table, key: { k, v } }) =>
	new Promise((resolve, reject) => {
		openDB(store)
			.then((db) => {
				const transaction = db.transaction([table], "readwrite");
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
			})
			.catch((e) => reject(e));
	});

/**
 * @description: 修改已有数据 | 插入新数据
 * @param {Object} { store, table, data: 单条数据对象(包含主键id) }
 * @return: Promise.resolve
 */
const indexedUpdate = ({ store, table, data }) =>
	new Promise((resolve, reject) => {
		openDB(store)
			.then((db) => {
				const request = db.transaction([table], "readwrite").objectStore(table).put(data);

				request.onsuccess = () => resolve();
			})
			.catch((e) => reject(e));
	});

/**
 * @description: 删除指定某条数据
 * @param {Object} { store, table, key: { 字段：值 } }
 * @return: Promise.resolve
 */
const indexedDelete = ({ store, table, key: { k, v } }) =>
	new Promise((resolve, reject) => {
		openDB(store)
			.then((db) => {
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
			})
			.catch((e) => reject(e));
	});

// 增删改查就完事
export { createDB, indexedAdd, indexedFindAll, indexedFindSingle, indexedUpdate, indexedDelete };
