/**
 * @description: 获取检验列表
 * @param {*} params
 * @return {*}
 */
export function getInspectionList(params) {
  const isMock = false

  const apiPath = 'client/report/check/getComboList'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * @description: 发检验
 * @param {*} params
 * @return {*}
 */
export function submitInspectionList(params) {
  const isMock = false

  const apiPath = 'client/report/check/submitCheckCombo'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

export default {
  getInspectionList,
  submitInspectionList
}
