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
 * 新增我的家人
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function bindFamily(params) {
  const bindFamily = 'client/v1/Patient/bindFamily'

  return peace.http.post(bindFamily, params)
}

/**
 * 修改我的家人
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function upbindFamily(params) {
  const upbindFamily = 'client/v1/Patient/upbindFamily'

  return peace.http.post(upbindFamily, params)
}

/**
 * 删除我的家人
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function DelFamily(params) {
  const DelFamily = 'client/v1/Patient/DelFamily'

  return peace.http.post(DelFamily, params)
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

/**
 * 获取咨询列表
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function inquiryList(params) {
  const inquiryList = 'client/v1/account/inquiryList'

  return peace.http.post(inquiryList, params)
}

/**
 * 获取处方列表
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getMyPrescripList(params) {
  const getMyPrescripList = 'client/v1/Patient/getMyPrescripList'

  return peace.http.post(getMyPrescripList, params)
}
/**
 * 获取我的医生列表
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getUserDctList() {
  const getUserDctList = 'client/v1/account/getMyDoctor'

  return peace.http.post(getUserDctList)
}

export default {
  /** 获取医生列表 */
  getDoctorList,
  /** 获取我的医生列表 */
  getUserDctList,
  /** 获取我的家人 */
  getMyFamilyList,
  /** 新增我的家人 */
  bindFamily,
  /** 修改我的家人 */
  upbindFamily,
  /** 删除我的家人 */
  DelFamily,
  /** 获取病历详情 */
  getCaseInfo,
  /** 获取处方列表 */
  getMyPrescripList,
  /** 获取处方详情 */
  getPrescripInfo,
  /** 获取咨询列表 */
  inquiryList
}
