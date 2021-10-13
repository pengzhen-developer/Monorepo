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
  mobile: /^1[3-9]\d{9}$/,

  // telephone 验证,验证电话号码
  telephone: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,

  // idCard 验证,验证身份证号
  idCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,

  // email 验证,验证邮箱
  email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/,

  // 百分数验证，数字在1-99之间，保留一位小数
  percente: /^(((\d|[1-9]\d)(\.\d{1,2})?)|100|100.0|100.00)$/
}

/**
 * 非空验证 正则验证
 *
 * e.g.
 *
 * $peace.validate.isEmpty('http://192.168.0.254/1.json') => false
 * @export
 * @param {*} param
 * @returns
 */
export function isEmpty(param) {
  return param === null || param === undefined || param === ''
}

/**
 * 长度 正则验证
 *
 * e.g.
 *
 * $peace.validate.length('http://192.168.0.254/1.json', 30) => true
 * @export
 * @param {*} param
 * @param {*} length
 * @returns
 */
export function length(param, length) {
  return param.toString().length() <= length
}

/**
 * 长度 正则验证（1个双字节=3个单字节）
 *
 * e.g.
 *
 * $peace.validate.lengthForByte('你好1',4) => false
 * @export
 * @param {*} param
 * @param {*} length
 * @returns
 */
export function lengthForByte(param, length) {
  // 1个中文字符占3个字节，其他字符占1个字节
  /* eslint-disable no-control-regex */
  let len = param.toString().replace(/[^\x00-\xff]/g, 'aaa').length

  if (len > length) {
    return false
  } else {
    return true
  }
}

/**
 * 区间 正则验证
 *
 * e.g.
 *
 * $peace.validate.range('36.5', 1, 100) => false
 * @export
 * @param {*} param
 * @param {*} iMin
 * @param {*} iMax
 * @returns
 */
export function range(param, iMin, iMax) {
  let re = /(\d+)/g

  while (re.exec(param)) {
    let int = parseInt(RegExp.$1)
    if (int < iMin || int > iMax) {
      return false
    }

    return true
  }
}

/**
 * url 正则验证
 *
 * e.g.
 *
 * $peace.validate.url('http://192.168.0.254/1.json') => true
 * @export
 * @param {*} param
 * @returns
 */
export function url(param) {
  return pattern.url.test(param)
}

/**
 * 数字 正则验证（正负整数）
 *
 * e.g.
 *
 * $peace.validate.number(123) => true
 * @export
 * @param {*} param
 * @returns
 */
export function number(param) {
  return pattern.number.test(param)
}

/**
 * 数值 正则验证（包括整数、浮点数、正、负数）
 *
 * e.g.
 *
 * $peace.validate.number(123) => true
 * @export
 * @param {*} param
 * @returns
 */
export function numerical(param) {
  return pattern.numerical.test(param)
}

/**
 * 数值 正则验证（包括整数、浮点数、正数）
 *
 * e.g.
 *
 * $peace.validate.number(123) => true
 * @export
 * @param {*} param
 * @returns
 */
export function pNumerical(param) {
  return pattern.pNumerical.test(param)
}

/**
 * 整数 正则验证
 *
 * e.g.
 *
 * $peace.validate.integer(-123) => true
 * @export
 * @param {*} param
 * @returns
 */
export function interger(param) {
  return pattern.integer.test(param)
}

/**
 * 正整数及0 正则验证
 *
 * e.g.
 *
 * $peace.validate.pInterger(123) => true
 * @export
 * @param {*} param
 * @returns
 */
export function pInterger(param) {
  return pattern.pInteger.test(param)
}

/**
 * 负整数及0 正则验证
 *
 * e.g.
 *
 * $peace.validate.nInterger(-123) => true
 * @export
 * @param {*} param
 * @returns
 */
export function nInterger(param) {
  return pattern.nInterger.test(param)
}

/**
 * 手机号码 正则验证
 *
 * e.g.
 *
 * $peace.validate.mobile('13011111111') => true
 * @export
 * @param {*} param
 * @returns
 */
export function mobile(param) {
  return pattern.mobile.test(param)
}

/**
 * 电话号码 正则验证
 *
 * e.g.
 *
 * $peace.validate.mobile('13011111111') => true
 * @export
 * @param {*} param
 * @returns
 */
export function telephone(param) {
  return pattern.telephone.test(param)
}

/**
 * 身份证 正则验证
 *
 * e.g.
 *
 * $peace.validate.idCard('400210188801011010') => true
 * @export
 * @param {*} code
 * @returns
 */
export function idCard(code) {
  code = code.toUpperCase()
  const city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外 '
  }
  const idCardReg = /^[1-9]\d{5}(19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[X])$/i // 身份证格式正则表达式

  let isPass = true // 身份证验证是否通过（true通过、false未通过）

  // 如果身份证不满足格式正则表达式
  if (!code) {
    isPass = false
  } else if (!code.match(idCardReg)) {
    isPass = false
  } else if (!city[code.substr(0, 2)]) {
    isPass = false
  } else if (code.length === 18) {
    // 18位身份证需要验证最后一位校验位
    code = code.split('')
    // ∑(ai×Wi)(mod 11)
    // 加权因子
    const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    // 校验位
    const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
    let sum = 0
    let ai = 0
    let wi = 0
    for (let i = 0; i < 17; i++) {
      ai = parseInt(code[i])
      wi = factor[i]
      sum += ai * wi // 开始计算并相加
    }
    const last = parity[sum % 11] // 求余
    if (last.toString() !== code[17]) {
      isPass = false
    }
  }
  return isPass
}
/**
 * 邮箱 正则验证
 *
 * e.g.
 *
 * $peace.validate.email('aa@qq.com') => true
 * @export
 * @param {*} param
 * @returns
 */
export function email(param) {
  return pattern.email.test(param)
}

export default {
  pattern,
  isEmpty,
  length,
  lengthForByte,
  range,
  url,
  number,
  numerical,
  pNumerical,
  interger,
  pInterger,
  nInterger,
  mobile,
  telephone,
  idCard,
  email
}
