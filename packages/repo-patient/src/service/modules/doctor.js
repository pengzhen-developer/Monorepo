import peace from '@src/library'

/**
 * 医生主页信息
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getDoctorInfo(params) {
  const getDoctorInfo = 'client/v1/Doctor/getDoctorInfo'

  return peace.http.post(getDoctorInfo, params)
}

export default {
  /** 医生主页信息 */
  getDoctorInfo
}
