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
   * 查询频次统计信息
   * https://devyapi.holoalpha.com/project/542/interface/api/12917
   *
   * @param {*} params
   */
  frequencyCountList(params) {
    const isMock = false

    const apiPath = 'frequencyCountList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params)
  },

  /**
   * 获取机构频次信息
   * https://devyapi.holoalpha.com/project/542/interface/api/12922
   *
   * @param {*} params
   */
  pageOrgFrequency(params) {
    const isMock = false

    const apiPath = 'pageOrgFrequency'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params)
  }
}
