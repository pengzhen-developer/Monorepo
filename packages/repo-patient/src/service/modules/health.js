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

/**
 * 健康档案添加血氧数据
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function addBloodOxygendata(params) {
  const addBloodOxygendata = 'wap/v1/health/addBloodOxygendata'
  return peace.http.post(addBloodOxygendata, params)
}

/**
 * 健康档案添加血氧数据
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function addBodyFatData(params) {
  const addBodyFatData = 'wap/v1/health/addBodyFatData'
  return peace.http.post(addBodyFatData, params)
}

/**
 * 健康档案获取家人信息
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function familyInfo(params) {
  const familyInfo = 'wap/v1/health/familyInfo'

  return peace.http.post(familyInfo, params)
}

/**
 * 健康档案获取家人基本病情信息
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function getBaseInfo(params) {
  const getBaseInfo = 'wap/v1/health/getBaseInfo'

  return peace.http.post(getBaseInfo, params)
}

/**
 * 健康档案新增家人基本病情信息
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function addBaseInfo(params) {
  const addBaseInfo = 'wap/v1/health/addBaseInfo'

  return peace.http.post(addBaseInfo, params)
}

/**
 * 健康档案获取字典
 *
 * @export
 * @param {*} params 参数列表
 * @returns
 */
export function lists(params) {
  const lists = 'health/v1/UserDic/lists'

  return peace.http.post(lists, params)
}

/**
 * 健康档案获取字典
 *
 * @export
 * @param {*} 类型 3:手术或外伤 4:家族病史 7:个人习惯
 * @returns
 */
export function getPersonInfo(params) {
  const getPersonInfo = 'client/v1/inquiry/getPersonInfo'

  return peace.http.post(getPersonInfo, params)
}

/**
 * 健康档案添加
 *
 * @export
 * @param {*} 类型 3:手术或外伤 4:家族病史 7:个人习惯
 * @returns
 */
export function addPersonInfo(params) {
  const addPersonInfo = 'client/v1/inquiry/addPersonInfo'

  return peace.http.post(addPersonInfo, params)
}

/**
 * 查询检验检查
 *
 * @export
 * @param {*} 类型
 * @returns
 */
export function getRecordList(params) {
  const getRecordList = 'client/report/v110/check/getList'

  return peace.http.post(getRecordList, params)
}

export default {
  getHealthCase,
  familyLists,
  allHealthList,
  getOscillogram,
  historyLists,
  getReportList,

  familyInfo,
  lists,
  getBaseInfo,
  addBaseInfo,

  addBloodPressure,
  addBloodSugar,
  addBloodOxygendata,
  addBodyFatData,
  getPersonInfo,
  addPersonInfo,

  getRecordList,
}
