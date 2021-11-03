/**
 * @description: 获取 【血糖】，【血压】 历史数据
 * @param {*} params
 * @return {*}
 */
export function getOneRecord(params) {
  const isMock = false

  const apiPath = 'client/v1/health/getOneRecord'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * @description: 获取 【血糖】，【血压】 周报列表
 * @param {*} params
 * @return {*}
 */
export function getWeekList(params) {
  const isMock = false

  const apiPath = 'client/v1/health/getWeekList'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * @description: 获取 【血糖】，【血压】 周报详情
 * @param {*} params
 * @return {*}
 */
export function getWeekDetail(params) {
  const isMock = false

  const apiPath = 'client/v1/health/getWeekDetail'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * @description: 获取 【血糖】，【血压】 最近数据
 * @param {*} params
 * @return {*}
 */
export function getOscillogram(params) {
  const isMock = false

  const apiPath = 'client/v1/health/getOscillogram'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

export default {
  getOneRecord,
  getWeekList,
  getWeekDetail,
  getOscillogram
}
