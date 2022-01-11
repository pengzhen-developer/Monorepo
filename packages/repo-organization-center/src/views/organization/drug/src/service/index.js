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

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 查询机构药品字典统计信息
   * http://devyapi.holoalpha.com/project/542/interface/api/12916
   *
   * @param {*} params
   */
  drugCountList(params) {
    const isMock = false

    const apiPath = 'drugCountList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 查询机构药品字典列表信息
   * http://devyapi.holoalpha.com/project/542/interface/api/12933
   *
   * @param {*} params
   */
  queryDrugList(params) {
    const isMock = false

    const apiPath = 'queryDrugList'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  },

  /**
   * 查询机构药品字典详情信息
   * http://devyapi.holoalpha.com/project/542/interface/api/12932
   *
   * @param {*} params
   */
  queryDrugDetails(params) {
    const isMock = false

    const apiPath = 'queryDrugDetails'
    const mockPath = process.env.VUE_APP_API_MOCK + apiPath
    const serverPath = process.env.VUE_APP_API_BASE + apiPath

    const requestApi = isMock ? mockPath : serverPath

    return Peace.http.post(requestApi, params).then((res) => {
      return res
    })
  }
}
