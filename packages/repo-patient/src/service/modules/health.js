import peace from '@src/library'

/**
 * 健康档案获取家人列表接口
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function familyLists(params) {
  const familyLists = 'wap/v1/health/familyLists'

  return peace.http.post(familyLists, params)
}

/**
 * 健康档案获取日常检测数据
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function allHealthList(params) {
  const allHealthList = 'wap/v1/health/allHealthList'

  return peace.http.post(allHealthList, params)
}

/**
 * 健康档案获取检测项详情
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getOscillogram(params) {
  const getOscillogram = 'wap/v1/health/getOscillogram'

  return peace.http.post(getOscillogram, params)
}

/**
 * 健康档案获取病历/处方/检查检验详情
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getHealthCase(params) {
  const getHealthCase = 'wap/v1/health/getHealthCase'

  return peace.http.post(getHealthCase, params)
}

/**
 * 健康档案获取历史检测数据
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function historyLists(params) {
  const historyLists = 'wap/v1/health/historyLists'

  return peace.http.post(historyLists, params)
}

/**
 * 健康档案获取 【周报】/【日报】列表
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getReportList(params) {
  const getReportList = '/health/v1/data/getReportList'

  return peace.http.post(getReportList, params)
}

/**
 * 健康档案添加血压数据
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function addBloodPressure(params) {
  const addBloodPressure = 'wap/v1/health/addBloodPressure'

  return peace.http.post(addBloodPressure, params)
}

/**
 * 健康档案添加血糖数据
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function addBloodSugar(params) {
  const addBloodSugar = 'wap/v1/health/addBloodsugardata'
  return peace.http.post(addBloodSugar, params)
}


export default {
  getHealthCase,
  familyLists,
  allHealthList,
  getOscillogram,
  historyLists,
  getReportList,

  addBloodPressure,

  addBloodSugar
}
