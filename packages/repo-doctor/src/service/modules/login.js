/**
 * 发送验证码
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function sendSms(params) {
  const sendSms = 'client/v1/Login/sendSms'

  return Peace.http.post(sendSms, params)
}

/**
 * 请求登录
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function login(params) {
  const login = 'client/v1/Login/login'

  return Peace.http.post(login, params)
}

export default {
  /** 发送验证码 */
  sendSms,
  /** 登录 */
  login
}
