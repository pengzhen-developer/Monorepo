export default {
  /**
   * 查询当前登录人所属渠道
   * https://devyapi.holoalpha.com/project/542/interface/api/12945
   *
   * @param {*} params
   */
  userSourceInfo(params) {
    const isMock = false

    const apiPath = 'userSourceInfo'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params)
  },

  /**
   * 查询机构疾病统计信息
   * https://devyapi.holoalpha.com/project/542/interface/api/12914
   *
   * @param {*} params
   */
  diseaseCountList(params) {
    const isMock = false

    const apiPath = 'diseaseCount'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params)
  },

  /**
   * 查询机构疾病信息
   * https://devyapi.holoalpha.com/project/542/interface/api/12915
   *
   * @param {*} params
   */
  queryDiseaseList(params) {
    const isMock = false

    const apiPath = 'diseaseList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params)
  }
}
