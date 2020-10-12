/*
 * @Date: 2020-10-06 18:35:09
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-10-06 19:34:52
 * @Description: 自定间隔，可终止轮询封装
 */
// 间隔
const delay = async (time) => new Promise((resolve) => setTimeout(resolve, time));

class Saga {
	constructor(fns) {
		this.fns = fns;
		this.pause = false;
	}

	start = async (callback, time = 5000) => {
		const isArray = Array.isArray(this.fns);

		while (!this.pause) {
			if (this.pause) break;
			const datas = isArray ? await Promise.all(this.fns.map((fn) => fn())) : await this.fns();
			callback(datas);
			await delay(time);
		}
	};

	stop() {
		this.pause = true;
	}
}

export default Saga;
