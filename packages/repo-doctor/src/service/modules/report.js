/**
 * 获取检验
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getComboList(params) {
  const inspectionDetail = 'client/report/check/getComboList'

  return Peace.http.post(inspectionDetail, params)
}

/**
 * 提交检验
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function submitComboList(params) {
  const inspectionDetail = 'client/report/check/submitCheckCombo'

  return Peace.http.post(inspectionDetail, params)
}

/**
 * 获取检验
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function inspectionDetail(params) {
  const inspectionDetail = 'client/report/v110/check/inspectionDetail'

  return Peace.http.post(inspectionDetail, params)
}

/**
 * 获取影像
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function pacsDetail(params) {
  const pacsDetail = 'client/report/v110/check/pacsDetail'

  return Peace.http.post(pacsDetail, params)
}

export default {
  submitComboList,
  getComboList,

  /**
   * 获取检验
   */
  inspectionDetail,

  /**
   * 获取影像
   */
  pacsDetail
}
