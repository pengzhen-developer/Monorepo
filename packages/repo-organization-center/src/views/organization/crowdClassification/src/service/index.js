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
   * 查询人群分类统计信息
   * https://devyapi.holoalpha.com/project/542/interface/api/12913
   *
   * @param {*} params
   */
  crowdClassificationCountList(params) {
    const isMock = false

    const apiPath = 'crowdClassificationCountList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params)
  },

  /**
   * 获取人群分类信息
   * https://devyapi.holoalpha.com/project/542/interface/api/12921
   *
   * @param {*} params
   */
  pageOrgCrowdClassification(params) {
    const isMock = false

    const apiPath = 'pageOrgCrowdClassification'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params)
  }
}
