import peace from '@src/library'

/**
 * 获取医院通知列表
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getNoticeList(params) {
  const getNoticeList = 'client/v1/advert/getNoticeList'

  return peace.http.post(getNoticeList, params)
}

/**
 * 获取医院通知详情
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getNoticeDetail(params) {
  const getNoticeDetail = 'client/v1/advert/getNoticeDetail'

  return peace.http.post(getNoticeDetail, params)
}

export default {
  /** 获取医院通知列表 */
  getNoticeList,

  /** 获取医院通知详情 */
  getNoticeDetail
}
