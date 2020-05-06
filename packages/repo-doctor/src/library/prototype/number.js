/*
 * @Author: PengZhen
 * @Description: 扩展 number 原型常用方法
 * @Date: 2018-07-06 11:24:25
 * @Last Modified by: PengZhen
 * @Last Modified time: 2018-12-21 18:57:39
 */

/* eslint-disable no-extend-native */

/**
 * 毫秒数转日期
 * @formatStr: 格式化参数, 默认yyyy-MM-dd HH:mm
 * e.g.         1483943989639.toDate()  =>  Mon Jan 09 2017 14:39:49 GMT+0800 (中国标准时间)
 */
Number.prototype.toDate = function() {
  return new Date(this)
}

/**
 * 数值格式化
 * e.g. const number = 10000
 *     number.formatNum(10000) => "10, 000"
 *     number.formatNum(10000, 2) => "10,000.00"
 *     number.formatNum(10000, 2, -) => "10-000.00"
 * @param {number} [precision=2] 精确小数位数
 * @param {*} separator 分隔符
 * @returns
 */
Number.prototype.formatNum = function(precision = 2, separator) {
  let num = this
  if (!isNaN(parseFloat(num)) && isFinite(num)) {
    let parts
    num = Number(num)
    num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString()
    parts = num.split('.')
    parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ', '))
    return parts.join('.')
  } else {
    return '-'
  }
}
/**
 * 数值转换汉字
 * e.g. const number = 1
 *     (1).toCN() => "一"
 *     (11).toCN() => "十一"
 *     (121).toCN() => "一百二十一"
 *
 */
const CN = [{base: 0, cn: '零'}, {base: 1, cn: '一'}, {base: 1, cn: '二'}, {base: 1, cn: '三'}, {base: 1, cn: '四'}, {base: 1, cn: '五'}, {base: 1, cn: '六'}, {base: 1, cn: '七'}, {base: 1, cn: '八'}, {base: 1, cn: '九'}, {base: 10, cn: '十'}, {base: 100, cn: '百'}, {base: 1000, cn: '千'}, {base: 10000, cn: '万'}, {base: 100000000, cn: '亿'}, {base: 10000000000000000, cn: '兆'}]

Number.prototype.toCN = function (i = CN.length - 1, emitLeadingOne = true) {
  // 小数部分处理：
  let deciPos = String(this).indexOf('.')
  if (deciPos >= 0) {
    let decimal = String(this).substring(deciPos + 1).replace(/\d/g, d => parseInt(d).toCN())
    return `${Math.floor(this).toCN()}点${decimal}`
  }

  // 整数部分处理：
  if (this < 10) {
    return CN[this].cn
  }
  let a = Math.floor(this / CN[i].base)
  let b = this % CN[i].base
  let c = b.toCN(i - 1, emitLeadingOne && a == 0)
  if (a > 0) {
    let d = a.toCN()
    if (emitLeadingOne && i == 10 && a == 1) {
      d = ''
    }
    if (b > 0) {
      if (String(CN[i].base).length - String(b).length > 1) {
        return d + CN[i].cn + CN[0].cn + c
      } else {
        return d + CN[i].cn + c
      }
    } else {
      return d + CN[i].cn
    }
  } else {
    return c
  }
}
