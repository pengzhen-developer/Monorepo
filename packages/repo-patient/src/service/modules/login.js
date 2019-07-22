import peace from '@src/library'

/**
 * 发送验证码
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function sendSms(params) {
  const sendSms = 'h5/v1/Account/sendSms'

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
  const login = 'h5/v1/Account/login'

  return peace.http.post(login, params)
}

export default {
  /** 发送验证码 */
  sendSms,
  /** 登录 */
  login
}
