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

export default {
  /** 获取病程记录列表信息接口 */
  getDiseaseCourse
}
