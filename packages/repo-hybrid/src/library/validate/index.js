import pattern from './pattern'

import { Validator } from 'jsonschema'

/**
 * Json Schema Validate
 *
 * @export
 * @param {*} source
 * @param {*} schema
 * @returns
 */
export function jsonSchema(source, schema) {
  const jsonSchemaValidator = new Validator()
  const validateResult = jsonSchemaValidator.validate(source, schema)

  if (validateResult.errors.length) {
    console.group('[JSON Schema Error]')
    console.error('schema\n', schema)
    console.error('source\n', JSON.parse(JSON.stringify(source)))
    console.error('error\n', validateResult.toString(), validateResult)
    console.groupEnd()

    return false
  } else {
    return true
  }
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

  jsonSchema,

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
