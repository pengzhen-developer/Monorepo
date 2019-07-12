import peace from '@src/library'

/**
 * 获取医生列表
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getDoctorList(params) {
  const getDoctorList = 'client/v1/Doctor/getDoctorList'

  return peace.http.post(getDoctorList, params)
}

/**
 * 获取我的家人
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getMyFamilyList(params) {
  const getMyFamilyList = 'client/v1/Patient/getMyFamilyList'

  return peace.http.post(getMyFamilyList, params)
}

/**
 * 获取病历详情
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getCaseInfo(params) {
  const getCaseInfo = 'client/v1/Patient/getCaseInfo'

  return peace.http.post(getCaseInfo, params)
}

/**
 * 获取处方详情
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getPrescripInfo(params) {
  const getPrescripInfo = 'client/v1/Patient/getPrescripInfo'

  return peace.http.post(getPrescripInfo, params)
}



export default {
  /** 获取医生列表 */
  getDoctorList,
  /** 获取我的家人 */
  getMyFamilyList,
  /** 获取病历详情 */
  getCaseInfo,
  /** 获取处方详情 */
  getPrescripInfo
}
