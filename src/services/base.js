/*
 * @Date: 2020-07-24 21:58:11
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-07-24 22:05:45
 * @Description: 封装原生chrome api
 */ 

/**
 * @description: 插件想background请求
 * @param {Object} 参数对象，属性随意
 * @return: who knoe?
 */
const sendMessage = data => new Promise(resolve => {
  chrome.runtime.sendMessage(data, resolve)
})

export { sendMessage }