/*
 * @Date: 2020-07-22 13:50:14
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-07-25 12:35:37
 * @Description: 小工具
 */ 
import Constants from '../constants'
import { getAllYearholiday } from '../App/popup/services'

/**
 * @description: 递归请求，获取到结果后继续请求
 * @param {String || Array} fns 请求方法名,或不同方法列表  single || multi
 * @param {String} check 中断方法 返回布尔值（目前只支持多方法使用一种判断）
 * @param {Number} time 请求时间间隔
 * @param {Function} callback any
 * @return: void
 */
const requestRecursion = async (fns, check, time = 1000, callback) => {
  const isArray = Array.isArray(fns)  //  判断是否是方法列表
  let result
  if (isArray) {
    result = []
    for(const fn of fns) {
      const res = await fn()
      result.push(res)
    }
  } else {
    result = await fns()
  }

  // 先判断是否是未结束的Promise
  if (Object.prototype.toString.call(result) !== "[object Promise]") {
    callback(result)

    if (check()) {
      return
    }
    
    setTimeout(() => {
      return requestRecursion(fns, check, time, callback)
    }, time)
  }
}

/**
 * @description: 获取当前想要的精准时间 时间戳
 * @param {Number} hour
 * @param {Number} minute
 * @param {Number} second
 * @param {Number} microsecond
 * @return: timestamp
 */
const getPreciseTime = (hour = 0, minute = 0, second = 0, micro = 0) => {
  return new Date(new Date().setHours(hour, minute, second, micro)).getTime()
}

/**
 * @description: 判断当前开盘状态
 * @return: boolean
 */
const checkFundOpen = async () => {
  const MORNING_START = getPreciseTime(9, 30)
  const MORNING_END = getPreciseTime(11, 30)
  const AFTERNOON_START = getPreciseTime(13)
  const AFTERNOON_END = getPreciseTime(15)
  const CURRENT_TIME = Date.now()
  const TODAY = getPreciseTime()
  const weekend = [0, 6]; //	周末的getDay

  const holidays = await getAllYearholiday()
  const isHoliday = holidays.includes(TODAY) || weekend.includes(new Date().getDay())

  if (isHoliday || MORNING_START > CURRENT_TIME || CURRENT_TIME > AFTERNOON_END) {
    return Constants.MARKET_CLOSE
  } else if (CURRENT_TIME > MORNING_END && CURRENT_TIME < AFTERNOON_START) {
    return Constants.MARKET_NOON
  }
  return Constants.MARKET_OPEN
}

/**
 * @description: 判断当日是否闭市
 * @return: 返回Boolean
 */
const isMarketOpen = async () => {
  const MORNING_START = getPreciseTime(9, 30)
  const AFTERNOON_END = getPreciseTime(15)
  const TODAY = getPreciseTime()
  const CURRENT_TIME = Date.now()
  const weekend = [0, 6]; //	周末的getDay

  const holidays = await getAllYearholiday()
  const isHoliday = holidays.includes(TODAY) || weekend.includes(new Date().getDay())

  if (isHoliday || CURRENT_TIME < MORNING_START || CURRENT_TIME > AFTERNOON_END) {
    return false
  }
  return true
}

export { requestRecursion, checkFundOpen, isMarketOpen }