import peace from '@src/library'

/**
 * 获取首页接口
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getMenu(params) {
  const url = 'client/v1/index/page'

  return peace.http.post(url, params)
}

/**
 * 获取微信登录状态
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function pay(params) {
  const pay = 'wap/v1/Wx/pay'

  return peace.http.post(pay, params)
}

/**
 * 获取订单时间
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getOrderInfo(params) {
  const getOrderInfo = '/wap/v1/Wx/getOrderInfo'

  return peace.http.post(getOrderInfo, params)
}

export default {
  /** 获取首页接口 */
  getMenu,
  /** 获取支付 */
  pay,
  /** 获取订单时间 **/
  getOrderInfo
}
