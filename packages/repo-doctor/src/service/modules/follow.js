/**
 * 获取病程管理列表信息接口
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getDiseaseCourse(params) {
  const getDiseaseCourse = 'client/v1/followup/getDiseaseCourse'

  return Peace.http.post(getDiseaseCourse, params)
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

  return Peace.http.post(getFollowStatus, params)
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

  return Peace.http.post(followPatientList, params)
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

  return Peace.http.post(getTags, params)
}

/**
 * 添加病程标签、诊断
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function addTads(params) {
  const addTags = 'client/v1/followup/addEditTag'

  return Peace.http.post(addTags, params)
}

/**
 * 获取病程记录类型接口
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getCourseType(params) {
  const getCourseType = 'client/v1/followup/getCourseType'

  return Peace.http.post(getCourseType, params)
}

/**
 * 编辑新增病情信息接口
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function addEditIllness(params) {
  const addEditIllness = 'client/v1/followup/addEditIllness'

  return Peace.http.post(addEditIllness, params)
}

/**
 * 添加、编辑病程记录接口
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function addEditCourse(params) {
  const addEditCourse = 'client/v1/followup/addEditCourse'

  return Peace.http.post(addEditCourse, params)
}

export default {
  /** 获取病程管理列表信息接口 */
  getDiseaseCourse,

  /** 获取患者随访状态字典 */
  getFollowStatus,
  /** 获取随访患者标签字典 */
  getTags,
  /** 获取患者随访列表 */
  followPatientList,
  /** 添加病程标签、诊断 */
  addTads,
  /** 获取病程记录类型接口 */
  getCourseType,
  /** 获取病程记录类型接口 */
  addEditIllness,
  /** 添加病程记录接口 */
  addEditCourse
}
