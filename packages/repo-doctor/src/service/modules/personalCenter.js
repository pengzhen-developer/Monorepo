/**
 * 获取医生个人信息
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getDoctorInfo(params) {
  const getDoctorInfo = 'client/v1/Personalcenter/getDoctorInfo'

  return Peace.http.get(getDoctorInfo, { params })
}

/**
 * 更新医生个人信息
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function upDoctorInfo(params) {
  const upDoctorInfo = 'client/v1/Personalcenter/upDoctorInfo'

  return Peace.http.post(upDoctorInfo, params)
}

/**
 * 更新医生介绍
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function upDoctorIntroduce(params) {
  const upDoctorIntroduce = 'client/v1/Personalcenter/upDoctorIntroduce'

  return Peace.http.post(upDoctorIntroduce, params)
}

/**
 * 更新服务时间
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function upDoctorWork(params) {
  const upDoctorWork = 'client/v1/Personalcenter/upDoctorWork'

  return Peace.http.post(upDoctorWork, params)
}

/**
 * 更新服务设置
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function upConsultationSet(params) {
  const upConsultationSet = 'client/v1/Personalcenter/upConsultationSet'

  return Peace.http.post(upConsultationSet, params)
}

/**
 * 获取通知列表
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getMsgList(params) {
  const getMsgList = 'client/v1/Notice/getMsgList'

  return Peace.http.post(getMsgList, params)
}

/**
 * 获取通知详情
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getDetail(params) {
  const getDetail = 'client/v1/Notice/getDetail'

  return Peace.http.post(getDetail, params)
}

/**
 * 更新医生工作状态
 *
 * @export
 * @param {*} params
 * @returns
 */
export function updateWorkStatus(params) {
  const updateWorkStatus = 'client/v1/Personalcenter/updateWorkStatus'

  return Peace.http.post(updateWorkStatus, params)
}

export default {
  /** 获取医生个人信息 */
  getDoctorInfo,

  /** 更新医生个人信息 */
  upDoctorInfo,

  /** 更新医生介绍 */
  upDoctorIntroduce,

  /** 更新医生服务时间 */
  upDoctorWork,

  /** 更新服务设置 */
  upConsultationSet,

  /** 获取通知列表 */
  getMsgList,

  /** 获取通知列表 */
  getDetail,

  /** 更新医生工作状态 */
  updateWorkStatus
}
