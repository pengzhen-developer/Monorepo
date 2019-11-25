import peace from '@src/library'

/**
 * 获取当前问诊的会诊单列表
 *
 * @export
 * @param {*inquiryNo:	string} params 参数列表
 * @returns
 */
export function getConsultList(params) {
  const getConsultList = 'wap/v1/Consult/lists'

  return peace.http.post(getConsultList, params)
}
/**
 * 获取当前问诊的转诊单列表
 *
 * @export
 * @param {*inquiryNo:	string} params 参数列表
 *
 * @returns
 */
export function getTransferList(params) {
  const getTransferList = 'wap/v1/Referral/lists'

  return peace.http.post(getTransferList, params)
}
/**
 * 获取当前问诊的检查单列表
 *
 * @export
 * @param {*inquiryNo:	string} params 参数列表
 * @returns
 */
export function getInspectList(params) {
  const getInspectList = 'wap/v1/checklist/getOrderList'

  return peace.http.post(getInspectList, params)
}

/**
 * 获取会诊单详情
 *
 * @export
 * @param {*consultNo:	string} params 参数列表
 * @returns
 */
export function getConsultDetail(params) {
  const getConsultDetail = 'wap/v1/Consult/detail'

  return peace.http.post(getConsultDetail, params)
}
/**
 * 获取转诊单详情
 *
 * @export
 * @param {*referralNo:	string} params 参数列表
 * @returns
 */
export function getTransferDetail(params) {
  const getTransferDetail = 'wap/v1/Referral/detail'

  return peace.http.post(getTransferDetail, params)
}
/**
 * 获取检查单详情
 *
 * @export
 * @param {*checkOrderNo:	string} params 参数列表
 * @returns
 */
export function getInspectDetail(params) {
  const getInspectDetail = 'wap/v1/checklist/getOrderDetail'

  return peace.http.post(getInspectDetail, params)
}
/**
 * 发起转诊咨询
 *
 * @export
 * @param {*referralNo:	string,*inquiryNo:	string} params 参数列表
 * @returns
 */
export function applyConsult(params) {
  const applyConsult = 'wap/v1/Referral/consultationDoctor'

  return peace.http.post(applyConsult, params)
}
export default {
  /** 获取当前问诊的会诊单列表 */
  getConsultList,

  /** 获取当前问诊的转诊单列表 */
  getTransferList,

  /** 获取当前问诊的检查单列表 */
  getInspectList,

  /** 获取会诊单详情 */
  getConsultDetail,

  /** 获取转诊单详情 */
  getTransferDetail,

  /** 获取检查单详情 */
  getInspectDetail,

  /** 发起转诊咨询 */
  applyConsult
}
