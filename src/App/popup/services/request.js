/*
 * @Date: 2020-07-21 23:03:59
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-07-30 23:29:56
 * @Description: fetch 调用
 */

/**
 * @description: get请求 只是json格式
 * @param {Object} { url, params }
 * @return: response
 */

const requestGet = ({ url, params, type = 'json' }) => {
	const stringify = params
		? Object.keys(params).reduce((str, curr) => {
				str = str + `${curr}=${params[curr]}&`;
				return str;
		  }, "?")
		: "";

	const link = url + stringify;
	
	switch (type) {
		case 'json':
			return fetch(link).then((_) => _.json());
		case 'text':
			return fetch(link).then((_) => _.text());
	}
};

/**
 * @description: fetch转换gbk文本页面
 * @param {String} url
 * @return: html text
 */
const fetchConvertGBK = url => fetch(url).then(res => res.blob()).then(blob => new Promise(resolve => {
	const reader = new FileReader()
	reader.readAsText(blob, "GBK")
	reader.onload = () => {
		const html = reader.result
		resolve(html)
	}
}))


/**
 * @description: 插件想background请求
 * @param {Object} 参数对象，属性随意
 * @return: who knoe?
 */
const sendMessage = data => new Promise(resolve => {
  chrome.runtime.sendMessage(data, resolve)
})

export { requestGet, sendMessage, fetchConvertGBK }
