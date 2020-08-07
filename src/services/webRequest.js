/*
 * @Date: 2020-08-03 23:12:21
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-04 10:00:17
 * @Description: 所有需要拦截修改的请求
 */

/**
 * @description: 天天基金的公告请求,url参数需加入自定义参数 chicken-farm
 * @param {Object} details { initiator, methods, type, url, requestHeaders }
 * @return: Headers
 */
const newsRequestCallback = ({ initiator, url, requestHeaders }) => {
	const parseUrl = new URL(url);
	const isFundRequest = !!url.match(/api\.fund\.eastmoney\.com/g);
	const isFromSelf = initiator && /^chrome-extension:\/\//.test(initiator);
	const isParam = parseUrl.searchParams.get("chicken-farm");
	const fundcode = parseUrl.searchParams.get("fundcode");
	const referer = { name: "Referer", value: `http://fundf10.eastmoney.com/jjgg_${fundcode}.html` };

	if (isFundRequest && isFromSelf && isParam !== null) {
		return { requestHeaders: [...requestHeaders, referer] };
	}

	return { requestHeaders };
};

chrome.webRequest.onBeforeSendHeaders.addListener(
	newsRequestCallback,
	{ urls: ["*://api.fund.eastmoney.com/*"] },
	["blocking", "requestHeaders", "extraHeaders"]
);
