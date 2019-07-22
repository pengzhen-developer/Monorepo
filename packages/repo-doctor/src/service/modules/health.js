import peace from '@src/library'

/**
 * 获取患者家人列表
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getFamilyList(params) {
  const getFamilyList = 'client/v1/health/getFamilyList'

  return peace.http.post(getFamilyList, params)
}

/**
 * 获取家人基本健康信息
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getOneHealth(params) {
  const getOneHealth = 'client/v1/health/getOneHealth'

  return peace.http.post(getOneHealth, params)
}

/**
 * 获取健康档案全部数据统计
 *
 * @export
 * @param {*} params
 * @returns
 */
export function allHealthList(params) {
  const allHealthList = 'client/v1/health/allHealthList'

  return peace.http.post(allHealthList, params)
}

/**
 * 获取 【血糖】，【血压】 最近数据
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getOscillogram(params) {
  const getOscillogram = 'client/v1/health/getOscillogram'

  return peace.http.post(getOscillogram, params)
}

/**
 * 获取 【血糖】，【血压】 周报列表
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getWeekList(params) {
  const getWeekList = 'client/v1/health/getWeekList'

  return peace.http.post(getWeekList, params)
}

/**
 * 获取 【血糖】，【血压】 周报详情
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getWeekDetail(params) {
  const getWeekDetail = 'client/v1/health/getWeekDetail'

  return peace.http.post(getWeekDetail, params)
}

/**
 * 获取 【血糖】，【血压】 历史数据
 *
 * @export
 * @param {*} params
 * @returns
 */
export function getOneRecord(params) {
  const getOneRecord = 'client/v1/health/getOneRecord'

  return peace.http.post(getOneRecord, params)
}

export default {
  /** 获取患者家人列表 */
  getFamilyList,
  /** 获取家人基本健康信息 */
  getOneHealth,

  /** 获取健康档案全部数据统计 */
  allHealthList,

  /** 获取 【血糖】，【血压】 最近数据 */
  getOscillogram,
  /** 获取 【血糖】，【血压】 周报列表 */
  getWeekList,
  /** 获取 【血糖】，【血压】 周报详情 */
  getWeekDetail,
  /** 获取 【血糖】，【血压】 历史数据 */
  getOneRecord
}
