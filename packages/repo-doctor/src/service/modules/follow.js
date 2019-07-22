import peace from '@src/library'

/**
 * 获取病程记录列表信息接口
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getDiseaseCourse(params) {
  const getDiseaseCourse = 'client/v1/followup/getDiseaseCourse'

  return peace.http.post(getDiseaseCourse, params)
}

/**
 * 获取患者随访状态字典
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getFollowStatus(params) {
  const getFollowStatus = 'client/v1/followup/getFollowStatus'

  return peace.http.post(getFollowStatus, params)
}

/**
 * 获取患者随访列表
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function followPatientList(params) {
  const followPatientList = 'client/v1/followup/followPatientList'

  return peace.http.post(followPatientList, params)
}

/**
 * 获取随访患者标签字典
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getTags(params) {
  const getTags = 'client/v1/followup/getTags'

  return peace.http.post(getTags, params)
}

export default {
  /** 获取病程记录列表信息接口 */
  getDiseaseCourse,

  /** 获取患者随访状态字典 */
  getFollowStatus,
  /** 获取随访患者标签字典 */
  getTags,
  /** 获取患者随访列表 */
  followPatientList
}
