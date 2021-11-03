/**
 * @description: 获取病历模板
 * @param {*} params
 * @return {*}
 */
export function getRecordTemplate(params) {
  const isMock = false

  const apiPath = 'client/v1/Prescribeprescrip/getCaseTemplate'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * @description: 发病历
 * @param {*} params
 * @return {*}
 */
export function addCase(params) {
  const isMock = false

  const apiPath = 'client/v1/casehistory/addCase'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

export default {
  getRecordTemplate,
  addCase
}
