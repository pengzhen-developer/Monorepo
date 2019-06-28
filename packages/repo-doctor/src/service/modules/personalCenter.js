import peace from '@src/library'

/**
 * 获取医生个人信息
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getDoctorInfo(params) {
  const getDoctorInfo = 'client/v1/Personalcenter/getDoctorInfo'

  return peace.http.get(getDoctorInfo, { params })
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

  return peace.http.post(upDoctorInfo, params)
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

  return peace.http.post(upDoctorIntroduce, params)
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

  return peace.http.post(upDoctorWork, params)
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

  return peace.http.post(upConsultationSet, params)
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
  upConsultationSet
}
