// utils/util.js

/**
 * 格式化时间
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

/**
 * 数字格式化（补零）
 */
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

/**
 * 获取当前时间戳
 */
const getCurrentTime = () => {
  return new Date().getTime()
}

/**
 * 日期格式化
 */
const formatDate = (date, format = 'YYYY-MM-DD') => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  return format
    .replace('YYYY', year)
    .replace('MM', formatNumber(month))
    .replace('DD', formatNumber(day))
}

/**
 * 防抖函数
 */
const debounce = (func, wait) => {
  let timeout
  return function() {
    const context = this
    const args = arguments
    clearTimeout(timeout)
    timeout = setTimeout(function() {
      func.apply(context, args)
    }, wait)
  }
}

/**
 * 节流函数
 */
const throttle = (func, wait) => {
  let timeout
  return function() {
    const context = this
    const args = arguments
    if (!timeout) {
      timeout = setTimeout(function() {
        timeout = null
        func.apply(context, args)
      }, wait)
    }
  }
}

/**
 * 检查是否为空
 */
const isEmpty = (value) => {
  return value === null || value === undefined || value === ''
}

/**
 * 生成随机字符串
 */
const randomString = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

module.exports = {
  formatTime,
  formatNumber,
  getCurrentTime,
  formatDate,
  debounce,
  throttle,
  isEmpty,
  randomString
}