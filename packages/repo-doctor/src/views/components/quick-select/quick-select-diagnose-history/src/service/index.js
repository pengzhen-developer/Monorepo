/**
 * @description: 获取诊断
 * @param {*} params
 * @return {*}
 */
export function getDisease(params) {
  const isMock = false

  const apiPath = 'client/v1/Patient/getDiseaseInfo'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

/**
 * @description: 获取常见诊断
 * @param {*} params
 * @return {*}
 */
export function getCommomDiagnose(params) {
  const isMock = false

  const apiPath = 'client/v1/Patient/IllnessList'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params).then((res) => {
    return res
  })
}

export default {
  getDisease,
  getCommomDiagnose
}
