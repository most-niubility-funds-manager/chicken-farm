/**
 * @description: fetch基础封装
 * @function (get) url, params
 * @function (post) url, params
 * @return {json}
 */
import qs from "qs";

export default class Http {
	static get(url, params = {}) {
		const link =
			url +
			Object.keys(params).reduce((str, key, idx) => {
				const sign = !idx ? "?" : "&";
				str += `${sign}${key}=${params[key]}`;
				return str;
			}, "");

		return fetch(link).then((_) => _.json());
	}

	static post(url, params) {
		return fetch(url, {
			method: "post",
			body: qs.stringify(params),
			headers: {
				"content-type": "application/x-www-form-urlencoded",
			},
		}).then((_) => _.json());
	}
}
