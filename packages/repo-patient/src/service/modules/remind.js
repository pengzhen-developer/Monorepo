import peace from '@src/library'

/**
 * 获取服务提醒列表
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getServiceRemindList(params) {
  return peace.http.post('client/v1/notice/getMsgList', params)
}

/**
 * 获取服务提醒详情
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getServiceRemindDetail(params) {
  return peace.http.post('client/v1/notice/getDetail', params)
}

export default {
  getServiceRemindList,
  getServiceRemindDetail
}
