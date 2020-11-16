/**
 * 私人医生订单列表
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function privateDoctorOrderList(params) {
  const privateDoctorOrderList = 'client/v1/Privatedoctor/privateDoctorOrderList'

  return Peace.http.post(privateDoctorOrderList, params)
}

/**
 * 私人医生接单记录
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function acceptRecordList(params) {
  const acceptRecordList = 'client/v1/Privatedoctor/acceptRecordList'

  return Peace.http.post(acceptRecordList, params)
}

/**
 * 私人医生订单详情
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function privateDoctorOrderInfo(params) {
  const privateDoctorOrderInfo = 'client/v1/Privatedoctor/privateDoctorOrderInfo'

  return Peace.http.post(privateDoctorOrderInfo, params)
}

/**
 * 私人医生服务详情
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function privateDoctorInfo(params) {
  const privateDoctorInfo = 'client/v1/Privatedoctor/privateDoctorInfo'

  return Peace.http.post(privateDoctorInfo, params)
}

/**
 * 私人医生确认接单
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function confirmReceipt(params) {
  const confirmReceipt = 'client/v1/Privatedoctor/confirmReceipt'

  return Peace.http.post(confirmReceipt, params)
}

export default {
  /** 私人医生订单列表 */
  privateDoctorOrderList,
  /** 私人医生订单详情 */
  privateDoctorOrderInfo,

  /** 私人医生接单记录 */
  acceptRecordList,
  /** 私人医生服务详情 */
  privateDoctorInfo,

  /** 私人医生确认接单 */
  confirmReceipt
}
