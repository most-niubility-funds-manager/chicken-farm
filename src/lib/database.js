/*
 * @Date: 2020-11-02 22:11:23
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-11-10 15:26:00
 * @Description: indexedDB操作 主要为同步旧版本数据
 */

const openDB = (store, version = 1) =>
	new Promise((resolve, reject) => {
		const request = window.indexedDB.open(store, version);

		request.onsuccess = ({ target: { result } }) => resolve(result);

    request.onerror = (e) => reject(e);
	});

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

export const getIndexedFunds = async () => {
  let result = []
  try {
    const funds = await indexedFindAll({ store: 'chicken-farm', table: 'funds' });
    result = funds.filter(({ state }) => state).map(({ code, unit }) => ({code, unit}));
  } catch (error) {
    console.log(error)
  }
	return result;
};
