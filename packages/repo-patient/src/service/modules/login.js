import peace from '@src/library'

/**
 * 发送验证码
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function sendSms(params) {
  const sendSms = 'wap/v1/Account/sendSms'

  return peace.http.post(sendSms, params)
}

/**
 * 请求登录
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function login(params) {
  const login = 'wap/v1/Account/login'

  return peace.http.post(login, params)
}

/**
 * 获取openID 登录授权
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getOPenIdByCode(params) {
  const getOPenIdByCode = '/wap/v1/Account/getOPenIdByCode'

  return peace.http.post(getOPenIdByCode, params)
}

/**
 * 获取系统信息
 *
 * @export
 * @returns
 */
export function getInfo() {
  const getInfo = 'client/base/config/getInfo'

  return peace.http.get(getInfo)
}
/**
 * 获取IMkey
 *
 * @export
 * @returns
 */
export function getImAppKey() {
  const getImAppKey = 'index/config/getImAppKey'

  return peace.http.get(getImAppKey)
}

export default {
  /** 发送验证码 */
  sendSms,
  /** 登录 */
  login,
  /** 获取openID 登录授权 */
  getOPenIdByCode,
  /** 获取系统信息 */
  getInfo,
  /** 获取IMkey */
  getImAppKey
}
