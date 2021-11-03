/**
 * @description: 获取问诊记录列表
 * @param {*} params
 * @return {*}
 */
export function recordList(params) {
  const isMock = false

  const apiPath = 'client/v1/inquiry/recordList'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * @description: 获取单次问诊历史消息
 * @param {*} params
 * @return {*}
 */
export function getOneInquiry(params) {
  const isMock = false

  const apiPath = 'client/v1/Patient/getOneInquiry'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.get(requestApi, { params })
}

export default {
  recordList,
  getOneInquiry
}
