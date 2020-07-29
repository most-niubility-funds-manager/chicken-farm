/*
 * @Date: 2020-07-24 22:06:02
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-07-28 17:45:36
 * @Description: 应用层方法
 */ 

const requestGet = ({ url, params, type = 'json' }) => {
	const stringify = params
		? Object.keys(params).reduce((str, curr) => {
				str = str + `${curr}=${params[curr]}&`;
				return str;
		  }, "?")
		: "";

	const link = url + stringify;

	console.log('type', type)
	switch (type) {
		case 'json':
			return fetch(link).then((_) => _.json());
		case 'text':
			return fetch(link).then((_) => _.text());
	}
};

const fetchData = async (data) => {
  const { method, url, params, type } = data

  switch (method) {
    case 'get':
      const result = await requestGet({ url, params, type })
      return result
  }
}

export { fetchData }