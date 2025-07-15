// utils/util.js

/**
 * 格式化时间
 * @param {Date} date 日期对象
 * @param {String} format 格式化字符串
 * @returns {String} 格式化后的时间字符串
 */
function formatTime(date, format = 'YYYY-MM-DD HH:mm:ss') {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const formatNumber = (n) => {
    return n.toString().padStart(2, '0')
  }

  return format
    .replace('YYYY', year)
    .replace('MM', formatNumber(month))
    .replace('DD', formatNumber(day))
    .replace('HH', formatNumber(hour))
    .replace('mm', formatNumber(minute))
    .replace('ss', formatNumber(second))
}

/**
 * 防抖函数
 * @param {Function} func 需要防抖的函数
 * @param {Number} delay 延迟时间（毫秒）
 * @returns {Function} 防抖后的函数
 */
function debounce(func, delay) {
  let timeoutId
  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  }
}

/**
 * 节流函数
 * @param {Function} func 需要节流的函数
 * @param {Number} delay 延迟时间（毫秒）
 * @returns {Function} 节流后的函数
 */
function throttle(func, delay) {
  let timeoutId
  let lastExecTime = 0
  return function (...args) {
    const currentTime = Date.now()
    if (currentTime - lastExecTime > delay) {
      func.apply(this, args)
      lastExecTime = currentTime
    } else {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func.apply(this, args)
        lastExecTime = Date.now()
      }, delay - (currentTime - lastExecTime))
    }
  }
}

/**
 * 深拷贝对象
 * @param {Object} obj 需要拷贝的对象
 * @returns {Object} 拷贝后的对象
 */
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime())
  if (obj instanceof Array) return obj.map(item => deepClone(item))
  if (typeof obj === 'object') {
    const clonedObj = {}
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
}

/**
 * 验证手机号
 * @param {String} phone 手机号
 * @returns {Boolean} 是否为有效手机号
 */
function isValidPhone(phone) {
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(phone)
}

/**
 * 验证邮箱
 * @param {String} email 邮箱地址
 * @returns {Boolean} 是否为有效邮箱
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * 生成随机字符串
 * @param {Number} length 字符串长度
 * @returns {String} 随机字符串
 */
function generateRandomString(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * 金额格式化
 * @param {Number} amount 金额
 * @param {Number} decimals 小数位数
 * @returns {String} 格式化后的金额字符串
 */
function formatMoney(amount, decimals = 2) {
  return Number(amount).toFixed(decimals)
}

module.exports = {
  formatTime,
  debounce,
  throttle,
  deepClone,
  isValidPhone,
  isValidEmail,
  generateRandomString,
  formatMoney
}