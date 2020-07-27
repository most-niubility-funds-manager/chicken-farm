/*
 * @Date: 2020-07-24 22:06:02
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-07-24 22:09:59
 * @Description: 应用层方法
 */ 

const requestGet = ({ url, params }) => {
	const stringify = params
		? Object.keys(params).reduce((str, curr) => {
				str = str + `${curr}=${params[curr]}&`;
				return str;
		  }, "?")
		: "";

	const link = url + stringify;

	return fetch(link).then((_) => _.json());
};

const fetchData = async (data) => {
  const { method, url, params } = data

  switch (method) {
    case 'get':
      const result = await requestGet({ url, params })
      return result
  }
}

export { fetchData }