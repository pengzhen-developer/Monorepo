import peace from '@src/library'

/**
 * 获取检验
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function inspectionDetail(params) {
  const inspectionDetail = 'client/report/v110/check/inspectionDetail'

  return peace.http.post(inspectionDetail, params)
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

  return peace.http.post(pacsDetail, params)
}

export default {
  /**
   * 获取检验
   */
  inspectionDetail,

  /**
   * 获取影像
   */
  pacsDetail
}
