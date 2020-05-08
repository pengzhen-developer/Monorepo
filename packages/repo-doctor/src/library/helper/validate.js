/*
 * @Author: PengZhen
 * @Description: 验证类
 * @Date: 2018-07-06
 */

// 声明 pattern
export const pattern = {
  // url 验证
  url: /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/,

  // number 验证, 包括正负整数
  number: /^[-+]?[0-9]*$/,

  // numerical 验证, 包括整数、浮点数、正、负数
  numerical: /^[-+]?[0-9]+(\.[0-9]+)?$/,

  // numerical 验证, 包括整数、浮点数、正、负数
  pNumerical: /^[0-9]+(\.[0-9]+)?$/,

  // integer 验证, 验证整数
  interger: /^[0-9]*$/,

  // pInteger 验证, 验证正整数
  pInterger: /^[1-9]\d*$/,

  // nInterger 验证, 验证负整数及0
  nInterger: /^((-\d+)|(0+))$/,

  // mobile 验证, 验证手机号码
  mobile: /^1[34578]\d{9}$/,

  // telephone 验证,验证电话号码
  telephone: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,

  // idCard 验证,验证身份证号
  idCard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,

  // email 验证,验证邮箱
  email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/,

  // 百分数验证，数字在1-99之间，保留一位小数
  percente: /^(((\d|[1-9]\d)(\.\d{1,2})?)|100|100.0|100.00)$/
}

/**
 * 非空验证
 *
 * e.g.
 *
 * isEmpty('http://192.168.0.254/1.json') => false
 * @export
 * @param {*} object
 * @returns
 */
export function isEmpty(object) {
  return object === null || object === undefined || object === ''
}

/**
 * url 正则验证
 *
 * e.g.
 *
 * isUrl('http://192.168.0.254/1.json') => true
 * @export
 * @param {*} param
 * @returns
 */
export function isUrl(param) {
  return pattern.url.test(param)
}

/**
 * 数字 正则验证（正负整数）
 *
 * e.g.
 *
 * isNumber(123) => true
 * @export
 * @param {*} param
 * @returns
 */
export function isNumber(param) {
  return pattern.number.test(param)
}

/**
 * 数值 正则验证（包括整数、浮点数、正、负数）
 *
 * e.g.
 *
 * isNumerical(123) => true
 * @export
 * @param {*} param
 * @returns
 */
export function isNumerical(param) {
  return pattern.numerical.test(param)
}

/**
 * 数值 正则验证（包括整数、浮点数、正数）
 *
 * e.g.
 *
 * isPNumerical(123) => true
 * @export
 * @param {*} param
 * @returns
 */
export function isPNumerical(param) {
  return pattern.pNumerical.test(param)
}

/**
 * 整数 正则验证
 *
 * e.g.
 *
 * isInterger(-123) => true
 * @export
 * @param {*} param
 * @returns
 */
export function isInterger(param) {
  return pattern.integer.test(param)
}

/**
 * 正整数及0 正则验证
 *
 * e.g.
 *
 * isPInterger(123) => true
 * @export
 * @param {*} param
 * @returns
 */
export function isPInterger(param) {
  return pattern.pInteger.test(param)
}

/**
 * 负整数及0 正则验证
 *
 * e.g.
 *
 * isNInterger(-123) => true
 * @export
 * @param {*} param
 * @returns
 */
export function isNInterger(param) {
  return pattern.nInterger.test(param)
}

/**
 * 手机号码 正则验证
 *
 * e.g.
 *
 * isMobile('13011111111') => true
 * @export
 * @param {*} param
 * @returns
 */
export function isMobile(param) {
  return pattern.mobile.test(param)
}

/**
 * 电话号码 正则验证
 *
 * e.g.
 *
 * isTelephone('42901920') => true
 * @export
 * @param {*} param
 * @returns
 */
export function isTelephone(param) {
  return pattern.telephone.test(param)
}

/**
 * 身份证 正则验证
 *
 * e.g.
 *
 * isIDCard('400210188801011010') => true
 * @export
 * @param {*} param
 * @returns
 */
export function isIDCard(param) {
  return pattern.idCard.test(param)
}

/**
 * 邮箱 正则验证
 *
 * e.g.
 *
 * isEmail('aa@qq.com') => true
 * @export
 * @param {*} param
 * @returns
 */
export function isEmail(param) {
  return pattern.email.test(param)
}

/**
 * 区间 正则验证
 *
 * e.g.
 *
 * isRange('36.5', 1, 100) => false
 * @export
 * @param {*} param
 * @param {*} iMin
 * @param {*} iMax
 * @returns
 */
export function isRange(param, iMin, iMax) {
  let re = /(\d+)/g

  while (re.exec(param)) {
    let int = parseInt(RegExp.$1)
    if (int < iMin || int > iMax) {
      return false
    }

    return true
  }
}

export default {
  pattern,

  isEmpty,
  isUrl,
  isNumber,
  isNumerical,
  isPNumerical,
  isInterger,
  isPInterger,
  isNInterger,
  isMobile,
  isTelephone,
  isIDCard,
  isRange
}
