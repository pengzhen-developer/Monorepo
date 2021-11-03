/**
 * @description: 获取过敏史
 * @param {*} params
 * @return {*}
 */
export function getAllergenList(params) {
  const isMock = false

  const apiPath = 'client/v1/Patient/allergenList'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * @description: 获取常见过敏史
 * @param {*} params
 * @return {*}
 */
export function getCommomAllergens(params) {
  const isMock = false

  const apiPath = 'client/v1/Patient/allergens'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

export default {
  getAllergenList,
  getCommomAllergens
}
